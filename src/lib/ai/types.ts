export type SupportedLanguage = 'pt' | 'en';

export type ChunkCategory =
  | 'profile'
  | 'experience'
  | 'education'
  | 'certification'
  | 'project'
  | 'rpa'
  | 'ai_agents'
  | 'skill'
  | 'metric'
  | 'contact';

export type IntentLabel =
  | 'smalltalk'
  | 'recrutador'
  | 'tecnica_projeto'
  | 'faq_portfolio'
  | 'contato'
  | 'fora_de_escopo'
  | 'injecao';

export interface BilingualText {
  pt: string;
  en: string;
}

export interface KnowledgeChunk {
  id: string;
  category: ChunkCategory;
  sectionAnchor: string;
  sectionLabel: BilingualText;
  title: BilingualText;
  /** Resposta curta, direta e natural focada exclusivamente neste micro-fato */
  shortAnswer: BilingualText;
  /** Detalhamento completo para aprofundamento técnico ou contexto do LLM */
  content: BilingualText;
  /** Palavras-chave e sinônimos bilíngues para busca lexical BM25 e vetorial */
  keywords: string[];
  /** Entidades canônicas associadas (ex.: 'ftp_sync', 'winthor', 'unifor', 'hcia') */
  entities: string[];
  /** Métricas oficiais contidas neste chunk para verificação de saída */
  metrics?: string[];
  /** Embedding denso opcional pré-calculado no build (quantizado L2) */
  embedding?: {
    pt?: number[];
    en?: number[];
  };
}

export interface KnowledgeIndexFile {
  version: string;
  generatedAt: string;
  embeddingModel: string;
  totalChunks: number;
  canonicalMetrics: {
    shippedRobots: string;
    maisSaudeRobots: string;
    tresCoracoesRobots: string;
    ftpSyncReduction: string;
    ftpSyncBefore: string;
    ftpSyncAfter: string;
    ftpSyncInterval: string;
    monthlyXmls: string;
    sefazAccuracy: string;
    hoursSaved: string;
    aiAgentsCount: string;
    pytestCount: string;
    playwrightCount: string;
    unifiedSystemsCount: string;
    semester: string;
    studyDurationYears: string;
    studyPeriod: string;
    workDurationYears: string;
    workStart: string;
    tresCoracoesDuration: string;
    certificationName: string;
  };
  knownTechnologies: string[];
  unlistedCommonTechnologies: string[];
  chunks: KnowledgeChunk[];
}

export interface ChatMessageItem {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface IntentPrediction {
  intent: IntentLabel;
  confidence: number;
  scores: Record<IntentLabel, number>;
  isFollowUp: boolean;
  detectedUnlistedTech: string[];
}

export interface ScoredChunk {
  chunk: KnowledgeChunk;
  bm25Score: number;
  cosineScore: number;
  rrfScore: number;
  finalScore: number;
}

export interface RetrievalResult {
  topChunks: ScoredChunk[];
  maxConfidence: number;
  belowThreshold: boolean;
  resolvedQuery: string;
  activeEntities: string[];
}

export interface GuardrailInputResult {
  allowed: boolean;
  reason?: 'prompt_injection' | 'empty_query' | 'too_long';
  sanitizedQuery: string;
}

export interface GuardrailOutputResult {
  valid: boolean;
  sanitizedText: string;
  violations: string[];
}

export interface EvalCase {
  id: string;
  lang: SupportedLanguage;
  category:
    | 'factual'
    | 'multi_topic'
    | 'follow_up'
    | 'unknown_fact'
    | 'smalltalk'
    | 'out_of_scope'
    | 'prompt_injection'
    | 'system_prompt_leak';
  query: string;
  history?: ChatMessageItem[];
  expectedIntent: IntentLabel;
  expectedKeywords: string[];
  forbiddenKeywords: string[];
  expectedAnchor?: string;
  description: string;
}
