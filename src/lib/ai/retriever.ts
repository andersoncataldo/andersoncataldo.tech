import knowledgeData from '../../data/knowledgeIndex.json';
import { extractCharNgrams, normalizeText, tokenize } from './guardrails';
import type {
  ChatMessageItem,
  KnowledgeChunk,
  KnowledgeIndexFile,
  RetrievalResult,
  ScoredChunk,
  SupportedLanguage,
} from './types';

const index = knowledgeData as unknown as KnowledgeIndexFile;

interface IndexedChunkDoc {
  chunk: KnowledgeChunk;
  tokens: string[];
  tokenFreq: Map<string, number>;
  charNgrams: Map<string, number>;
  charNgramNorm: number;
  length: number;
}

const SYNONYM_GROUPS: string[][] = [
  ['ftp_sync', 'ftpsync', 'ftp', 'sftp', 'paramiko', '6 horas', '10 segundos', '99%', '-99%', '15 minutos'],
  ['winthor', 'totvs', 'oracle', 'erp', 'edi', 'pharma link', 'eurofarma', 'smartped', 'momenta'],
  ['3coracoes', 'tres coracoes', 'sefaz', 'xml', 'nfe', 'cte', 'cnd', 'fiscal', '15000', '15.000', '99.85%'],
  ['9 agentes', 'maker-checker', 'maker checker', 'squad', 'claude code', 'mcp', 'orquestrador', 'openspec'],
  ['pytest', 'playwright', '58', '35', 'qa', 'testes', 'qualidade', 'e2e', 'auditoria'],
  ['central grupo mais', 'monorepo', 'sso', 'jwt', '4 sistemas', 'portal central'],
  ['chamados', 'helpdesk', 'service desk', 'ticket', 'rbac', 'sla', 'mttr', 'recharts'],
  ['devolucao', 'devolucoes', 'returns', 'logistica reversa', 'pareto', 'modo tv', 'anomalias'],
  ['ativos', 'inventario', 'patrimonio', 'custodia', 'sha-256', 'sha256', 'termos'],
  ['unifor', 'faculdade', 'universidade', 'ciencia da computacao', 'computer science', '6 semestre', 'estudo', 'graduacao'],
  ['huawei', 'hcia', 'hcia-storage', 'v5.0', 'certificacao', 'certificado', 'storage', 'san', 'nas', 'raid', 'disaster recovery'],
  ['banco de dados', 'database', 'db', 'sgbd', 'postgresql', 'postgres', 'supabase', 'rls', 'oracle', 'sql'],
  ['contato', 'email', 'linkedin', 'github', 'whatsapp', 'telefone', 'contratar', 'vaga', 'remoto', 'hibrido', 'fortaleza', 'curriculo', 'cv'],
  ['experiencia', 'trabalho', 'carreira', 'empresas', 'mais saude', 'janeiro de 2025', '2 anos'],
];

function expandQueryTokens(rawQuery: string): string[] {
  const qNorm = normalizeText(rawQuery);
  const baseTokens = tokenize(rawQuery, true);
  const expanded = new Set<string>(baseTokens);

  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some((term) => qNorm.includes(normalizeText(term)));
    if (matchesGroup) {
      for (const term of group) {
        for (const t of tokenize(term, true)) {
          expanded.add(t);
        }
      }
    }
  }

  return Array.from(expanded);
}

// Pré-indexação em memória para BM25 e Similaridade de Cosseno (executada 1x por isolate/sessão)
const DOCS: IndexedChunkDoc[] = index.chunks.map((chunk) => {
  const combinedText = [
    chunk.id,
    chunk.title.pt,
    chunk.title.en,
    chunk.shortAnswer.pt,
    chunk.shortAnswer.en,
    chunk.content.pt,
    chunk.content.en,
    chunk.keywords.join(' '),
    chunk.entities.join(' '),
    (chunk.metrics || []).join(' '),
  ].join(' ');

  // Damos peso maior ao título, keywords e shortAnswer repetindo seus tokens
  const weightedText = `${chunk.title.pt} ${chunk.title.en} ${chunk.keywords.join(' ')} ${chunk.entities.join(' ')} ${combinedText}`;
  const tokens = tokenize(weightedText, true);
  const tokenFreq = new Map<string, number>();
  for (const t of tokens) {
    tokenFreq.set(t, (tokenFreq.get(t) || 0) + 1);
  }

  const charNgrams = extractCharNgrams(`${chunk.title.pt} ${chunk.title.en} ${chunk.keywords.join(' ')}`, 3);
  const charNgramNorm =
    Math.sqrt(Array.from(charNgrams.values()).reduce((acc, v) => acc + v * v, 0)) || 1;

  return {
    chunk,
    tokens,
    tokenFreq,
    charNgrams,
    charNgramNorm,
    length: tokens.length,
  };
});

const TOTAL_DOCS = DOCS.length;
const AVG_DOC_LENGTH = DOCS.reduce((acc, d) => acc + d.length, 0) / (TOTAL_DOCS || 1);

const IDF_MAP = new Map<string, number>();
const docFreqMap = new Map<string, number>();
for (const doc of DOCS) {
  const uniqueTokens = new Set(doc.tokens);
  for (const token of uniqueTokens) {
    docFreqMap.set(token, (docFreqMap.get(token) || 0) + 1);
  }
}
for (const [token, df] of docFreqMap.entries()) {
  const idf = Math.log(1 + (TOTAL_DOCS - df + 0.5) / (df + 0.5));
  IDF_MAP.set(token, idf);
}

function computeBm25(queryTokens: string[], doc: IndexedChunkDoc, rawQueryNorm: string): number {
  const k1 = 1.5;
  const b = 0.75;
  let score = 0;

  for (const qToken of queryTokens) {
    const tf = doc.tokenFreq.get(qToken) || 0;
    if (tf === 0) continue;
    const idf = IDF_MAP.get(qToken) || 0.5;
    const numerator = tf * (k1 + 1);
    const denominator = tf + k1 * (1 - b + b * (doc.length / AVG_DOC_LENGTH));
    score += idf * (numerator / denominator);
  }

  // Boost exato para match direto de keywords e entidades do chunk
  for (const kw of doc.chunk.keywords) {
    const kwNorm = normalizeText(kw);
    if (kwNorm.length >= 3 && rawQueryNorm.includes(kwNorm)) {
      score += 2.2;
    }
  }

  return score;
}

function computeDenseCosine(a: number[], b: number[]): number {
  if (!a || !b || a.length === 0 || a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom > 0 ? dot / denom : 0;
}

function computeSemanticCosine(
  expandedTokens: string[],
  queryCharNgrams: Map<string, number>,
  queryCharNorm: number,
  doc: IndexedChunkDoc,
  lang: SupportedLanguage,
  queryEmbedding?: number[],
): number {
  // 1. Similaridade TF-IDF ponderada no espaço de tokens expandidos por sinônimos
  const qWeights = new Map<string, number>();
  for (const t of expandedTokens) {
    const idf = IDF_MAP.get(t) || 1.0;
    qWeights.set(t, (qWeights.get(t) || 0) + idf);
  }
  const qNorm = Math.sqrt(Array.from(qWeights.values()).reduce((acc, v) => acc + v * v, 0)) || 1;

  let docNormSq = 0;
  for (const [t, tf] of doc.tokenFreq.entries()) {
    const idf = IDF_MAP.get(t) || 0.5;
    const w = Math.log(1 + tf) * idf;
    docNormSq += w * w;
  }
  const docNorm = Math.sqrt(docNormSq) || 1;

  let tfidfDot = 0;
  for (const [t, qW] of qWeights.entries()) {
    const tf = doc.tokenFreq.get(t) || 0;
    if (tf > 0) {
      const idf = IDF_MAP.get(t) || 0.5;
      const dW = Math.log(1 + tf) * idf;
      tfidfDot += (qW / qNorm) * (dW / docNorm);
    }
  }

  // 2. Similaridade de Cosseno de Trigramas de Caracteres (captura variações de grafia e sub-palavras)
  let charDot = 0;
  if (queryCharNorm > 0) {
    for (const [gram, count] of queryCharNgrams.entries()) {
      const dCount = doc.charNgrams.get(gram);
      if (dCount) {
        charDot += (count / queryCharNorm) * (dCount / doc.charNgramNorm);
      }
    }
  }

  const localSemanticScore = 0.72 * tfidfDot + 0.28 * charDot;

  // 3. Se houver embedding denso da pergunta e do chunk, funde o score neural com o semântico local
  const chunkDense = doc.chunk.embedding?.[lang];
  if (queryEmbedding && chunkDense && queryEmbedding.length === chunkDense.length) {
    const denseScore = Math.max(0, computeDenseCosine(queryEmbedding, chunkDense));
    return 0.65 * denseScore + 0.35 * localSemanticScore;
  }

  return localSemanticScore;
}

function chunkSimilarity(a: KnowledgeChunk, b: KnowledgeChunk): number {
  if (a.id === b.id) return 1;
  const setA = new Set([...a.entities, ...a.keywords]);
  const setB = new Set([...b.entities, ...b.keywords]);
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  const jaccard = union > 0 ? intersection / union : 0;
  const sameCategoryPenalty = a.category === b.category ? 0.15 : 0;
  return Math.min(1, jaccard + sameCategoryPenalty);
}

/**
 * Resolve correferência pronominal usando as últimas mensagens do histórico
 */
export function resolveQueryWithHistory(rawQuery: string, history?: ChatMessageItem[]): {
  resolvedQuery: string;
  activeEntities: string[];
} {
  const qNorm = normalizeText(rawQuery);
  const activeEntities: string[] = [];

  if (!history || history.length === 0) {
    return { resolvedQuery: rawQuery, activeEntities };
  }

  const recentTurns = history
    .slice(-4)
    .map((m) => normalizeText(m.content))
    .join(' ');

  for (const doc of DOCS) {
    for (const entity of doc.chunk.entities) {
      const entitySpaced = normalizeText(entity.replace(/_/g, ' '));
      const entityRaw = normalizeText(entity);
      if (
        (entitySpaced.length >= 3 && recentTurns.includes(entitySpaced)) ||
        (entityRaw.length >= 3 && recentTurns.includes(entityRaw))
      ) {
        if (!activeEntities.includes(entity)) {
          activeEntities.push(entity);
        }
      }
    }
  }

  const needsContextResolution =
    /\b(nele|nela|nisso|nesse|nessa|deles|delas|isso|la|it|that|this|there|e qual|e quais|e como|e quanto|e de quanto|and what|and how|and which)\b/i.test(
      qNorm,
    ) || qNorm.split(' ').length <= 6;

  if (needsContextResolution && activeEntities.length > 0) {
    // Priorizar entidades específicas (ex: ftp_sync, sistema_ativos_ti) antes de nomes genéricos de empresa
    const prioritized = [...activeEntities].sort((a, b) => {
      const generic = ['anderson_cataldo', 'mais_saude', '3coracoes'];
      return (generic.includes(a) ? 1 : 0) - (generic.includes(b) ? 1 : 0);
    });
    const contextTerms = prioritized
      .slice(0, 4)
      .map((e) => `${e} ${e.replace(/_/g, ' ')}`)
      .join(' ');
    return {
      resolvedQuery: `${rawQuery} ${contextTerms}`,
      activeEntities: prioritized,
    };
  }

  return { resolvedQuery: rawQuery, activeEntities };
}

/**
 * Detecta se a pergunta pede dados privados/inexistentes no repositório (ex: CPF, salário exato, RG, endereço residencial)
 */
export function asksPrivateOrUnknowableFact(rawQuery: string): boolean {
  const q = normalizeText(rawQuery);
  return /\b(cpf|rg|cnh|passaporte|endereco residencial|rua onde mora|cep|numero da casa|estado civil|casado|solteiro|namorada|esposa|filhos|religiao|tipo sanguineo|altura|peso|data de nascimento exata|signo|salario atual|quanto ele ganha|pretensao salarial exata|expected salary|exact salary|social security|home address|marital status)\b/.test(
    q,
  );
}

/**
 * Executa Recuperação Híbrida (BM25 + Cosine Similarity + RRF + MMR)
 */
export function retrieveKnowledge(
  rawQuery: string,
  lang: SupportedLanguage,
  options?: {
    topK?: number;
    history?: ChatMessageItem[];
    queryEmbedding?: number[];
  },
): RetrievalResult {
  const topK = options?.topK ?? 4;
  const { resolvedQuery, activeEntities } = resolveQueryWithHistory(rawQuery, options?.history);
  const rawQueryNorm = normalizeText(resolvedQuery);
  const baseTokens = tokenize(resolvedQuery, true);
  const expandedTokens = expandQueryTokens(resolvedQuery);
  const queryCharNgrams = extractCharNgrams(resolvedQuery, 3);
  const queryCharNorm =
    Math.sqrt(Array.from(queryCharNgrams.values()).reduce((acc, v) => acc + v * v, 0)) || 1;

  const initialScores = DOCS.map((doc) => {
    const bm25Score = computeBm25(baseTokens, doc, rawQueryNorm);
    const cosineScore = computeSemanticCosine(
      expandedTokens,
      queryCharNgrams,
      queryCharNorm,
      doc,
      lang,
      options?.queryEmbedding,
    );
    return {
      chunk: doc.chunk,
      bm25Score,
      cosineScore,
      rrfScore: 0,
      finalScore: 0,
    };
  });

  // Ordenar por BM25 e por Cosine para calcular o Reciprocal Rank Fusion (RRF)
  const byBm25 = [...initialScores].sort((a, b) => b.bm25Score - a.bm25Score);
  const byCosine = [...initialScores].sort((a, b) => b.cosineScore - a.cosineScore);

  const bm25Rank = new Map<string, number>();
  const cosineRank = new Map<string, number>();

  byBm25.forEach((item, idx) => bm25Rank.set(item.chunk.id, idx + 1));
  byCosine.forEach((item, idx) => cosineRank.set(item.chunk.id, idx + 1));

  const RRF_K = 20;
  for (const item of initialScores) {
    const rB = bm25Rank.get(item.chunk.id) || TOTAL_DOCS;
    const rC = cosineRank.get(item.chunk.id) || TOTAL_DOCS;
    const rrf = 1 / (RRF_K + rB) + 1 / (RRF_K + rC);

    // Normalizar combinação de RRF + intensidade direta de sinal
    const signalStrength = Math.min(1, item.bm25Score / 8) * 0.55 + Math.min(1, item.cosineScore * 1.8) * 0.45;
    item.rrfScore = rrf;
    item.finalScore = Number((rrf * 8 + signalStrength * 0.6).toFixed(4));
  }

  // Filtrar candidatos com algum sinal positivo e ordenar
  const candidates = initialScores
    .filter((item) => item.bm25Score > 0 || item.cosineScore > 0.05)
    .sort((a, b) => b.finalScore - a.finalScore);

  // Aplicar Maximal Marginal Relevance (MMR, lambda = 0.78) para evitar redundância e cobrir perguntas multi-tópico
  const lambda = 0.78;
  const selected: ScoredChunk[] = [];
  const pool = [...candidates.slice(0, 12)];

  while (selected.length < topK && pool.length > 0) {
    if (selected.length === 0) {
      selected.push(pool.shift()!);
      continue;
    }

    let bestIdx = 0;
    let bestMmr = -Infinity;

    for (let i = 0; i < pool.length; i += 1) {
      const candidate = pool[i];
      const maxSimToSelected = Math.max(
        ...selected.map((s) => chunkSimilarity(candidate.chunk, s.chunk)),
      );
      const mmrScore = lambda * candidate.finalScore - (1 - lambda) * maxSimToSelected;
      if (mmrScore > bestMmr) {
        bestMmr = mmrScore;
        bestIdx = i;
      }
    }

    selected.push(pool.splice(bestIdx, 1)[0]);
  }

  const maxConfidence = selected.length > 0 ? selected[0].finalScore : 0;
  const asksPrivate = asksPrivateOrUnknowableFact(rawQuery);
  const belowThreshold = asksPrivate || selected.length === 0 || (selected[0].bm25Score === 0 && selected[0].cosineScore < 0.08);

  return {
    topChunks: selected,
    maxConfidence,
    belowThreshold,
    resolvedQuery,
    activeEntities,
  };
}
