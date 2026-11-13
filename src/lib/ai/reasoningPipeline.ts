import { detectQuestionAspect } from './intentClassifier';
import { normalizeText } from './guardrails';
import { asksPrivateOrUnknowableFact, retrieveKnowledge } from './retriever';
import type {
  ChatMessageItem,
  QuestionAspect,
  RetrievalResult,
  ScoredChunk,
  SupportedLanguage,
} from './types';

export type CragSufficiencyStatus = 'sufficient' | 'partial' | 'insufficient';

export interface SubQueryPlan {
  query: string;
  aspect: QuestionAspect;
}

export interface ReasoningPlanResult {
  /** Etapa 1: Pergunta reescrita de forma autônoma com resolução de pronomes e contraste */
  rewrittenQuery: string;
  /** Etapa 1: Indica se a pergunta é ambígua (sem contexto no histórico) e exige esclarecimento */
  isAmbiguous: boolean;
  /** Etapa 1: Pergunta única e objetiva de esclarecimento quando isAmbiguous === true */
  clarificationReply?: string;
  /** Etapa 2: Subperguntas decompostas para recuperação multi-query */
  subQueries: SubQueryPlan[];
  /** Etapa 2: Indica se é uma pergunta comparativa (ex.: Mais Saúde vs 3corações) */
  isComparative: boolean;
  /** Etapa 3: Status do avaliador Corrective RAG (CRAG) */
  cragStatus: CragSufficiencyStatus;
  /** Etapa 3: Certificações não listadas detectadas na pergunta (ex.: AWS, Azure, GCP) */
  unlistedCertifications: string[];
  /** Etapa 3: Chunks combinados e aprovados após multi-query retrieval */
  mergedRetrieval: RetrievalResult;
  /** Etapa 3: Par (subQuery, topChunk) para garantir cobertura completa em perguntas multi-partes */
  subQueryMatches: { subQuery: SubQueryPlan; topScored: ScoredChunk }[];
  /** Orçamento recomendado de thinking tokens para o Gemini API (0 para simples, 256 para complexas) */
  recommendedThinkingBudget: number;
}

const SPECIFIC_PROJECT_OR_ENTITY_RX =
  /\b(central|grupo mais|mais saude|3coracoes|tres coracoes|chamado|chamados|helpdesk|service desk|devolucao|devolucoes|returns|ativo|ativos|sha-256|sha256|ftp|sync|ftp_sync|winthor|totvs|oracle|edi|pharma|eurofarma|smartped|momenta|sefaz|xml|cnd|carlo acutis|paroquia|unifor|huawei|hcia|streamlit|tkinter|google sheets|9 agentes|maker-checker|portifolio|portfolio|sudo hire|command palette|calculadora)\b/;

/**
 * Etapa 1A: Reescrita autônoma da pergunta com contexto da conversa (incluindo correferência contrastiva: "e na outra empresa?")
 */
export function rewriteQueryWithContext(rawQuery: string, history?: ChatMessageItem[]): string {
  if (!history || history.length === 0) return rawQuery;
  const qNorm = normalizeText(rawQuery);

  const recentText = normalizeText(
    history
      .slice(-4)
      .map((m) => m.content)
      .join(' '),
  );

  // Correferência contrastiva entre as duas empresas ("e na outra empresa?", "e no outro emprego?", "what about the other company?")
  const asksOtherCompany =
    /\b(outra empresa|outro emprego|outro trabalho|empresa anterior|emprego anterior|other company|other job|previous company)\b/.test(
      qNorm,
    );

  if (asksOtherCompany) {
    const lastTurnText = normalizeText(
      history
        .slice(-2)
        .map((m) => m.content)
        .join(' '),
    );
    if (
      /\b(3coracoes|tres coracoes|setor fiscal|aprendiz)\b/.test(lastTurnText) &&
      !/\b(mais saude)\b/.test(qNorm)
    ) {
      return `${rawQuery} (referindo-se à Distribuidora Mais Saúde, emprego atual, Central Grupo Mais e WinThor)`;
    }
    if (
      /\b(mais saude|winthor|central grupo mais)\b/.test(lastTurnText) &&
      !/\b(3coracoes|tres coracoes)\b/.test(qNorm)
    ) {
      return `${rawQuery} (referindo-se ao Grupo 3corações, primeiro emprego no Setor Fiscal com 15.000+ XMLs SEFAZ e CNDs)`;
    }
  }

  // Se a pergunta já cita uma entidade específica, mantém como está
  if (SPECIFIC_PROJECT_OR_ENTITY_RX.test(qNorm)) {
    return rawQuery;
  }

  // Resolução de referências demonstrativas ("esse projeto", "esse sistema", "esse robô", "nele") usando o histórico
  const hasDemonstrativeOrPronoun =
    /\b(esse projeto|este projeto|desse projeto|esse sistema|este sistema|desse sistema|esse robo|este robo|desse robo|that project|this project|that system|this system|that robot|this robot|nele|nela|nisso|la|there)\b/.test(
      qNorm,
    );

  if (hasDemonstrativeOrPronoun || qNorm.split(' ').length <= 6) {
    const trackedEntities = [
      'ftp_sync',
      'central grupo mais',
      'sistema de chamados',
      'sistema de devolucao',
      'sistema de ativos',
      'portal carlo acutis',
      'winthor',
      '3coracoes',
      'mais saude',
      'unifor',
      'huawei hcia',
      '9 agentes',
    ];
    const found = trackedEntities.filter((e) => recentText.includes(e));
    if (found.length > 0) {
      return `${rawQuery} (contexto: ${found.slice(0, 2).join(' ')})`;
    }
  }

  return rawQuery;
}

/**
 * Etapa 1B: Detecção de perguntas ambíguas sem contexto prévio (quando perguntar de volta em vez de adivinhar)
 */
export function detectQueryAmbiguity(
  rawQuery: string,
  lang: SupportedLanguage,
  history?: ChatMessageItem[],
): { isAmbiguous: boolean; clarificationReply?: string } {
  const qNorm = normalizeText(rawQuery);
  const hasHistoryContext = Boolean(history && history.length > 0);

  // Se já há histórico de conversa ou se o visitante especificou qual projeto/sistema/robô/empresa, NÃO é ambígua
  if (hasHistoryContext || SPECIFIC_PROJECT_OR_ENTITY_RX.test(qNorm)) {
    return { isAmbiguous: false };
  }

  // Não marcar como ambígua se o visitante pede todos os projetos ou uma lista geral
  if (/\b(todos|quais|quantos|lista|catalogo|all|which|how many|list)\b/.test(qNorm) && /\b(projetos|sistemas|robos|projects|systems|robots)\b/.test(qNorm)) {
    return { isAmbiguous: false };
  }

  const asksAmbiguousProject =
    /\b(esse projeto|este projeto|aquele projeto|desse projeto|deste projeto|no projeto|do projeto|o projeto|this project|that project|the project)\b/.test(
      qNorm,
    );
  const asksAmbiguousSystem =
    /\b(esse sistema|este sistema|aquele sistema|desse sistema|deste sistema|no sistema|do sistema|o sistema|this system|that system|the system)\b/.test(
      qNorm,
    );
  const asksAmbiguousRobot =
    /\b(esse robo|este robo|aquele robo|desse robo|deste robo|no robo|do robo|o robo|this robot|that robot|the robot)\b/.test(
      qNorm,
    );

  if (asksAmbiguousProject || asksAmbiguousSystem) {
    const clarificationReply =
      lang === 'en'
        ? `### 🤔 Which project or system would you like to explore?\nAnderson's portfolio features **9 production systems and pipelines**. Which one are you referring to?\n- **Central Grupo Mais & Corporate SSO** (Monorepo unifying 4 internal systems with JWT & Supabase RLS)\n- **Corporate Service Desk System** (4-tier RBAC ticketing, SLA/MTTR & Recharts BI)\n- **AI-Powered Returns System** (LLM root-cause diagnostics, Pareto curve & TV Mode)\n- **IT Asset Management & SHA-256 Terms** (Hardware/license custody with cryptographic integrity)\n- **FTP_SYNC & WinThor EDI Engine** (SFTP bridge reducing sync from 6h to < 10s, -99%)\n\n📍 Just reply with the project name (or browse the [Projects Section](#projetos)) and I'll detail its challenge, architecture, and results!`
        : `### 🤔 Qual projeto ou sistema você gostaria de explorar?\nO portfólio do Anderson conta com **9 sistemas e pipelines em produção**. A qual deles você está se referindo?\n- **Central Grupo Mais & SSO Corporativo** (Monorepo unificando 4 sistemas internos com JWT e Supabase RLS)\n- **Sistema de Chamados Corporativo** (Helpdesk multinível em 4 níveis RBAC, SLA/MTTR e BI com Recharts)\n- **Sistema de Devolução com Diagnóstico de IA** (Logística reversa com LLM, Curva de Pareto e Modo TV)\n- **Gestão de Ativos de TI & Termos SHA-256** (Inventário e cautela digital com hash criptográfico SHA-256)\n- **FTP_SYNC & Motor EDI WinThor** (Ponte SFTP autônoma que reduziu 6h para < 10s, -99%)\n\n📍 Basta me dizer o nome de um deles (ou conferir a [Seção Projetos](#projetos)) que eu detalho o desafio, a arquitetura e os resultados exatos!`;
    return { isAmbiguous: true, clarificationReply };
  }

  if (asksAmbiguousRobot) {
    const clarificationReply =
      lang === 'en'
        ? `### 🤔 Which RPA robot would you like to know more about?\nAnderson has built **15 corporate RPA robots in Python**. Which one would you like me to detail?\n- **FTP_SYNC (Mais Saúde):** Autonomous SFTP bridge reducing file sync from **6 hours to < 10 seconds (-99%)** every 15 minutes.\n- **EDI Pharma Link Suite (Mais Saúde):** 4 robots integrating **Eurofarma, Eurofarma Generic, Smartped, and Momenta** with **TOTVS WinThor (Oracle)**.\n- **Tax & SEFAZ Extraction Suite (Grupo 3corações):** 5 robots processing **15,000+ monthly XMLs (NF-e/CT-e)** with **99.85% SEFAZ accuracy** and automated **CNDs**.\n\n📍 Tell me which robot group interests you (or visit the [Automation & RPA Section](#rpa))!`
        : `### 🤔 Sobre qual robô RPA você gostaria de saber mais?\nO Anderson desenvolveu **15 robôs corporativos em Python**. Qual deles você quer que eu detalhe?\n- **FTP_SYNC (Mais Saúde):** Ponte autônoma SFTP que reduziu a sincronização de **6 horas para menos de 10 segundos (-99%)** a cada 15 minutos.\n- **Suíte EDI Pharma Link (Mais Saúde):** 4 robôs integrando **Eurofarma, Eurofarma Genérico, Smartped e Momenta** ao **ERP TOTVS WinThor (Oracle)**.\n- **Suíte Fiscal & SEFAZ (Grupo 3corações):** 5 robôs processando **15.000+ XMLs/mês (NF-e/CT-e)** com **99,85% de precisão SEFAZ** e renovação de **CNDs**.\n\n📍 Me diga qual deles você prefere aprofundar (ou veja a [Seção Automação & RPA](#rpa))!`;
    return { isAmbiguous: true, clarificationReply };
  }

  return { isAmbiguous: false };
}

/**
 * Etapa 2: Planejamento e Decomposição de Perguntas Multi-Partes ou Comparativas (Multi-Query Decomposition)
 */
export function planAndDecomposeQuery(rewrittenQuery: string): {
  subQueries: SubQueryPlan[];
  isComparative: boolean;
} {
  const qNorm = normalizeText(rewrittenQuery);

  // Caso 1: Pergunta comparativa entre os robôs/experiências da Mais Saúde e do Grupo 3corações
  const isComparative =
    /\b(diferenca|diferencas|compar\w*|versus|vs)\b/.test(qNorm) &&
    /\b(mais saude)\b/.test(qNorm) &&
    /\b(3coracoes|tres coracoes)\b/.test(qNorm);

  if (isComparative) {
    return {
      isComparative: true,
      subQueries: [
        {
          query: 'Onde trabalha atualmente na Distribuidora Mais Saúde Estagiário de T.I. 10 robôs WinThor',
          aspect: 'current_job',
        },
        {
          query: 'Primeiro emprego no Grupo 3corações 5 robôs RPA Python 15.000+ XMLs SEFAZ CNDs',
          aspect: 'first_job',
        },
      ],
    };
  }

  // Caso 2: Decomposição de perguntas compostas separadas por vírgula, " e " / " and " ou múltiplos "?"
  // Exemplo: "Qual foi o primeiro emprego do Anderson, onde ele trabalha atualmente e em qual semestre da faculdade ele está?"
  const rawParts = rewrittenQuery
    .split(/(?:\?\s+|\s*,\s*(?=(?:onde|qual|quais|como|quando|em qual|quantos|what|where|how|when|which)\b)|\s+(?:e tambem|alem de|e qual|e quais|e onde|e como|e em qual|e quando|and what|and where|and how|and which)\s+)/i)
    .map((p) => p.trim())
    .filter((p) => p.length >= 6);

  // Se ainda houver um " e " conectando duas cláusulas interrogativas longas (ex.: "Como funciona o FTP_SYNC e qual é o e-mail de contato?")
  const expandedParts: string[] = [];
  for (const part of rawParts) {
    const subSplit = part.split(/\s+(?:e|and)\s+(?=(?:em qual|por que|para que|qual|quais|onde|como|quando|quantos|quantas|fala|possui|tem|what|where|how|when|which)\b)/i);
    for (const s of subSplit) {
      if (s.trim().length >= 5) {
        expandedParts.push(s.trim());
      }
    }
  }

  if (expandedParts.length <= 1) {
    return {
      isComparative: false,
      subQueries: [
        {
          query: rewrittenQuery,
          aspect: detectQuestionAspect(rewrittenQuery),
        },
      ],
    };
  }

  const subQueries: SubQueryPlan[] = expandedParts.slice(0, 3).map((sub) => ({
    query: sub,
    aspect: detectQuestionAspect(sub),
  }));

  return {
    isComparative: false,
    subQueries,
  };
}

/**
 * Detecta menções a certificações que o Anderson NÃO possui (ex.: AWS, Azure, Google Cloud, CKA, PMP)
 */
export function detectUnlistedCertifications(rawQuery: string): string[] {
  const q = normalizeText(rawQuery);
  if (!/\b(certificacao|certificacoes|certificado|certification|certified|exame|exam|tirou)\b/.test(q)) {
    return [];
  }
  const unlistedCerts: { pattern: RegExp; label: string }[] = [
    { pattern: /\b(aws|amazon web services)\b/, label: 'AWS' },
    { pattern: /\b(azure|microsoft certified)\b/, label: 'Microsoft Azure' },
    { pattern: /\b(gcp|google cloud)\b/, label: 'Google Cloud (GCP)' },
    { pattern: /\b(cka|ckad|kubernetes)\b/, label: 'Kubernetes (CKA/CKAD)' },
    { pattern: /\b(ccna|ccnp|cisco)\b/, label: 'Cisco (CCNA)' },
    { pattern: /\b(pmp|scrum master|csm|itil)\b/, label: 'PMP / Scrum Master / ITIL' },
  ];

  return unlistedCerts.filter((c) => c.pattern.test(q)).map((c) => c.label);
}

/**
 * Executa as Etapas 1, 2 e 3 do Pipeline de Raciocínio (Entender -> Planejar -> Recuperar e Avaliar com CRAG)
 */
export function runReasoningPipeline(
  rawQuery: string,
  lang: SupportedLanguage,
  history?: ChatMessageItem[],
  detectedUnlistedTech: string[] = [],
): ReasoningPlanResult {
  // Etapa 1: Entender (Reescrita com contexto + Detecção de Ambiguidade)
  const rewrittenQuery = rewriteQueryWithContext(rawQuery, history);
  const ambiguity = detectQueryAmbiguity(rawQuery, lang, history);

  // Etapa 2: Planejar (Decomposição em subperguntas)
  const { subQueries, isComparative } = planAndDecomposeQuery(rewrittenQuery);

  // Etapa 3: Recuperar (Multi-Query Hybrid Retrieval) e Avaliar Suficiência (CRAG)
  const baseRetrieval = retrieveKnowledge(rewrittenQuery, lang, { topK: 4, history });
  const subQueryMatches: { subQuery: SubQueryPlan; topScored: ScoredChunk }[] = [];
  const mergedMap = new Map<string, ScoredChunk>();

  for (const sq of subQueries) {
    const subRet = retrieveKnowledge(sq.query, lang, { topK: 3, history });
    if (subRet.topChunks.length > 0 && !subRet.belowThreshold) {
      // Escolher o primeiro chunk ainda não usado pelas subperguntas anteriores (ou o top 1)
      const chosen =
        subRet.topChunks.find((c) => !mergedMap.has(c.chunk.id)) || subRet.topChunks[0];
      subQueryMatches.push({ subQuery: sq, topScored: chosen });
      if (!mergedMap.has(chosen.chunk.id)) {
        mergedMap.set(chosen.chunk.id, chosen);
      }
    }
  }

  for (const item of baseRetrieval.topChunks) {
    if (!mergedMap.has(item.chunk.id) && mergedMap.size < 5) {
      mergedMap.set(item.chunk.id, item);
    }
  }

  const mergedTopChunks = Array.from(mergedMap.values());
  const unlistedCertifications = detectUnlistedCertifications(rawQuery);
  const asksPrivate = asksPrivateOrUnknowableFact(rawQuery);

  let cragStatus: CragSufficiencyStatus = 'sufficient';
  if (asksPrivate || (mergedTopChunks.length === 0 && unlistedCertifications.length === 0 && detectedUnlistedTech.length === 0)) {
    cragStatus = 'insufficient';
  } else if (detectedUnlistedTech.length > 0 || unlistedCertifications.length > 0) {
    cragStatus = 'partial';
  } else if (baseRetrieval.belowThreshold && subQueryMatches.length === 0) {
    cragStatus = 'insufficient';
  }

  const mergedRetrieval: RetrievalResult = {
    topChunks: mergedTopChunks,
    maxConfidence: mergedTopChunks[0]?.finalScore ?? 0,
    belowThreshold: cragStatus === 'insufficient',
    resolvedQuery: rewrittenQuery,
    activeEntities: baseRetrieval.activeEntities,
  };

  // Orçamento adaptativo de raciocínio (thinkingBudget):
  // 0 para perguntas diretas de 1 tópico (rápido e barato), 256 para multi-partes/comparativas/CRAG parcial
  const recommendedThinkingBudget =
    subQueries.length > 1 || isComparative || cragStatus === 'partial' ? 256 : 0;

  return {
    rewrittenQuery,
    isAmbiguous: ambiguity.isAmbiguous,
    clarificationReply: ambiguity.clarificationReply,
    subQueries,
    isComparative,
    cragStatus,
    unlistedCertifications,
    mergedRetrieval,
    subQueryMatches,
    recommendedThinkingBudget,
  };
}
