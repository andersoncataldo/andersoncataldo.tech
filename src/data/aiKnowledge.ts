import {
  classifyIntent,
  getOutOfScopeResponse,
  isPromptInjectionAttempt,
  synthesizeConversationalResponse,
  type ChatMessageItem,
  type SupportedLanguage,
} from '../lib/ai';

export interface QuickPrompt {
  id: string;
  label: { pt: string; en: string };
  query: { pt: string; en: string };
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'experience-study-time',
    label: {
      pt: '💼 Experiência, tempo de trabalho e estudo',
      en: '💼 Experience, work & study time',
    },
    query: {
      pt: 'Qual é a experiência profissional do Anderson, seu tempo de trabalho e seu tempo de estudo?',
      en: "What is Anderson's professional experience, total work duration, and study duration?",
    },
  },
  {
    id: 'ftp-sync',
    label: {
      pt: '⚡ Como otimizou o FTP_SYNC em >99,9%?',
      en: '⚡ How did you optimize FTP_SYNC by >99.9%?',
    },
    query: {
      pt: 'Como você reduziu o tempo do pipeline FTP_SYNC de 6 horas para menos de 10 segundos?',
      en: 'How did you reduce the FTP_SYNC pipeline execution time from 6 hours to under 10 seconds?',
    },
  },
  {
    id: 'ai-agents',
    label: {
      pt: '🤖 Como funciona o squad de 9 agentes?',
      en: '🤖 How does the 9-agent squad work?',
    },
    query: {
      pt: 'Como foi implementado o ecossistema com 9 agentes de IA sob governança Maker-Checker?',
      en: 'How was the 9-agent AI ecosystem implemented under Maker-Checker governance?',
    },
  },
  {
    id: 'central-mais',
    label: {
      pt: '🏢 O que é a Central Grupo Mais?',
      en: '🏢 What is Central Grupo Mais?',
    },
    query: {
      pt: 'Quais são os 4 sistemas da Central Grupo Mais e quais tecnologias foram utilizadas?',
      en: 'What are the 4 systems in Central Grupo Mais and what technologies were used?',
    },
  },
  {
    id: 'certifications',
    label: {
      pt: '📜 Quais suas certificações e formação?',
      en: '📜 What are your certifications & degree?',
    },
    query: {
      pt: 'Quais certificações oficiais e formação acadêmica você possui?',
      en: 'What official certifications and academic background do you hold?',
    },
  },
];

export { isPromptInjectionAttempt, getOutOfScopeResponse };

export function isOutOfPortfolioScope(rawQuery: string, history?: ChatMessageItem[]): boolean {
  const prediction = classifyIntent(rawQuery, history);
  return prediction.intent === 'fora_de_escopo';
}

/**
 * Executa o pipeline completo de Machine Learning Híbrido (Classificador de Intenção + BM25 + Similaridade de Cosseno + RRF + MMR + Síntese NLG)
 */
export function queryOfflineKnowledge(
  rawQuery: string,
  lang: SupportedLanguage,
  history?: ChatMessageItem[],
): string {
  const { reply } = synthesizeConversationalResponse(rawQuery, lang, history);
  return reply;
}
