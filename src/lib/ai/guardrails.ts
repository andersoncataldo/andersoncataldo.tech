import knowledgeData from '../../data/knowledgeIndex.json';
import type { GuardrailInputResult, GuardrailOutputResult, KnowledgeIndexFile, SupportedLanguage } from './types';

const index = knowledgeData as unknown as KnowledgeIndexFile;

export function normalizeText(input: string): string {
  return String(input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s%-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'e',
  'ou', 'mas', 'que', 'se', 'como', 'qual', 'quais', 'quanto', 'quantos', 'quantas',
  'foi', 'era', 'sao', 'ser', 'esta', 'estao', 'tem', 'ter', 'fez', 'fazer', 'ele',
  'dele', 'nele', 'voce', 'seu', 'sua', 'seus', 'suas', 'me', 'te', 'lhe', 'nos',
  'the', 'a', 'an', 'of', 'to', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'he', 'his', 'him', 'you', 'your', 'what', 'which', 'how', 'many', 'much',
  'and', 'or', 'but', 'if', 'about', 'tell', 'can', 'could', 'would', 'please',
]);

/**
 * Stemmer leve bilíngue (PT/EN) para aproximar radicais morfológicos sem dependências externas
 */
export function stemToken(token: string): string {
  if (token.length <= 3) return token;
  return token
    .replace(/(acoes|acao|oes|ao|amentos|amento|imentos|imento|adoras|adores|adora|ador)$/, '')
    .replace(/(ando|endo|indo|aram|eram|iram|ava|iam|ou|ei)$/, '')
    .replace(/(mente|idades|idade|icos|icas|ico|ica)$/, '')
    .replace(/(ings|ing|ed|ers|er|ations|ation|ments|ment|ies)$/, '')
    .replace(/s$/, '');
}

export function tokenize(input: string, removeStopwords = true): string[] {
  const norm = normalizeText(input);
  if (!norm) return [];
  const rawTokens = norm.split(' ').filter((t) => t.length > 1 || /\d/.test(t));
  const filtered = removeStopwords ? rawTokens.filter((t) => !STOPWORDS.has(t)) : rawTokens;
  return filtered.map(stemToken);
}

/**
 * Extrai n-gramas de caracteres (trigramas) para tolerância a erros de digitação e similaridade sub-palavra
 */
export function extractCharNgrams(input: string, n = 3): Map<string, number> {
  const clean = normalizeText(input).replace(/\s+/g, '_');
  const counts = new Map<string, number>();
  if (clean.length < n) {
    if (clean.length > 0) counts.set(clean, 1);
    return counts;
  }
  for (let i = 0; i <= clean.length - n; i += 1) {
    const gram = clean.slice(i, i + n);
    counts.set(gram, (counts.get(gram) || 0) + 1);
  }
  return counts;
}

export function isPromptInjectionAttempt(rawQuery: string): boolean {
  const q = normalizeText(rawQuery);
  if (!q) return false;

  const exactPatterns = [
    'ignore todas as instrucoes',
    'ignore as instrucoes anteriores',
    'ignore previous instructions',
    'ignore all instructions',
    'ignore system prompt',
    'esqueca as instrucoes',
    'esqueca tudo que foi dito',
    'disregard previous',
    'forget previous instructions',
    'system prompt',
    'prompt de sistema',
    'reveal your prompt',
    'show your prompt',
    'print your instructions',
    'mostre seu prompt',
    'revele seu prompt',
    'qual e o seu prompt',
    'repita suas instrucoes',
    'api key',
    'api_key',
    'gemini_api_key',
    'openai_api_key',
    'chave da api',
    'chave secreta',
    'process env',
    'jailbreak',
    'dan mode',
    'developer mode',
    'modo desenvolvedor',
    'aja como um',
    'act as a',
    'pretend you are',
    'finja que voce e',
    'voce agora e um',
    'you are now a',
    'bypass',
    'override instructions',
  ];

  if (exactPatterns.some((pattern) => q.includes(pattern))) {
    return true;
  }

  const regexPatterns = [
    /\b(ignore|esqueca|disregard|forget|bypass)\b.*\b(instruc\w*|prompt\w*|regras|rules|guardrails|system)\b/,
    /\b(mostre|revele|exiba|imprima|reveal|show|print|output|dump)\b.*\b(system prompt|prompt|instruc\w*|api key|chave|segredo|secret)\b/,
  ];

  return regexPatterns.some((rx) => rx.test(q));
}

export function validateInputGuardrails(rawQuery: string): GuardrailInputResult {
  const trimmed = String(rawQuery || '').trim();
  if (!trimmed) {
    return { allowed: false, reason: 'empty_query', sanitizedQuery: '' };
  }

  const sanitizedQuery = trimmed
    .replace(/<\/?(?:user_query|system_prompt|retrieved_context|canonical_metrics)[^>]*>/gi, '')
    .slice(0, 500)
    .trim();

  if (isPromptInjectionAttempt(sanitizedQuery)) {
    return {
      allowed: false,
      reason: 'prompt_injection',
      sanitizedQuery,
    };
  }

  return {
    allowed: true,
    sanitizedQuery,
  };
}

/**
 * Guardrail Determinístico de Saída (Fact-Checker):
 * Verifica se números críticos ou certificações citadas na resposta batem com as métricas canônicas do repositório.
 */
export function verifyOutputMetrics(outputText: string, lang: SupportedLanguage): GuardrailOutputResult {
  let sanitizedText = outputText;
  const violations: string[] = [];

  // 1. Prevenir vazamento acidental de tags internas do prompt
  if (/<\/?(?:retrieved_context|canonical_metrics|user_query)>/i.test(sanitizedText)) {
    sanitizedText = sanitizedText.replace(/<\/?(?:retrieved_context|canonical_metrics|user_query)>/gi, '');
    violations.push('stripped_internal_xml_tags');
  }

  // 2. Verificar distorção da métrica de redução do FTP_SYNC (deve ser -99% / 99%, nunca outro percentual associado ao FTP_SYNC)
  const ftpPercentMatch = sanitizedText.match(/FTP_SYNC[^.\n]{0,40}?(-?\d{1,2}(?:[.,]\d+)?%)/i);
  if (ftpPercentMatch) {
    const val = ftpPercentMatch[1].replace(',', '.');
    if (!val.includes('99')) {
      sanitizedText = sanitizedText.replace(ftpPercentMatch[1], index.canonicalMetrics.ftpSyncReduction);
      violations.push(`corrected_ftp_sync_percentage:${ftpPercentMatch[1]}->-99%`);
    }
  }

  // 3. Verificar distorção no número total de agentes do squad (deve ser 9 agentes)
  const agentMatch = sanitizedText.match(/\b(\d+)\s+(?:agentes\s+de\s+IA|AI\s+agents|agentes\s+no\s+modelo\s+maker)/i);
  if (agentMatch && agentMatch[1] !== '9' && agentMatch[1] !== '12') {
    sanitizedText = sanitizedText.replace(agentMatch[0], agentMatch[0].replace(agentMatch[1], '9'));
    violations.push(`corrected_agent_count:${agentMatch[1]}->9`);
  }

  // 4. Verificar certificações falsas caso um LLM tente alucinar posse de certificação AWS/Azure/GCP
  const falseCertRegex = /\b(possui|holds|certified in|certificado)\b[^.\n]{0,30}\b(AWS Certified|Azure Administrator|CKA|Google Cloud Professional)\b/i;
  if (falseCertRegex.test(sanitizedText)) {
    violations.push('blocked_hallucinated_certification');
    sanitizedText =
      lang === 'en'
        ? 'Anderson holds the international **Huawei Certified ICT Associate - Storage V5.0 (HCIA-Storage)** certification (Jun/2026) and is in the **6th semester of Computer Science at UNIFOR**. He does not claim AWS, Azure, or CKA certifications in his portfolio.'
        : 'Anderson possui a certificação internacional **Huawei Certified ICT Associate - Storage V5.0 (HCIA-Storage)** (Jun/2026) e cursa o **6º semestre de Ciência da Computação na UNIFOR**. Ele não declara certificações AWS, Azure ou CKA como possuídas no portfólio.';
  }

  return {
    valid: violations.length === 0,
    sanitizedText,
    violations,
  };
}

export function getPromptInjectionResponse(lang: SupportedLanguage): string {
  if (lang === 'en') {
    return `### 🛡️ Security & Scope Guardrail Active
As the official technical assistant for **Anderson Cataldo**, I operate under strict governance rules: I cannot ignore system instructions, adopt external personas, or expose internal prompts and API credentials.

How can I help you evaluate Anderson's **projects**, **enterprise automations (FTP_SYNC -99%)**, **9-agent AI squad**, or **academic background** today?`;
  }

  return `### 🛡️ Guardrail de Segurança e Escopo Ativo
Como assistente técnico oficial de **Anderson Cataldo**, opero sob diretrizes estritas de governança: não posso ignorar instruções de sistema, assumir outras personas ou expor prompts internos e chaves de API.

Como posso ajudá-lo a conhecer os **projetos**, **automações corporativas (FTP_SYNC -99%)**, o **squad de 9 agentes de IA** ou a **formação acadêmica** de Anderson hoje?`;
}

export function getOutOfScopeResponse(lang: SupportedLanguage): string {
  if (lang === 'en') {
    return `### 🔒 Scope Restricted to Anderson's Portfolio
I am **Anderson AI**, the official assistant strictly dedicated to **Anderson Cataldo's** professional portfolio. By governance rules, I only answer questions related to his software engineering career, work and study duration, projects, tech stack, certifications, or hiring contact.

You can ask me, for example:
- **Work & Study Duration:** How long he has worked in production and his Computer Science degree at UNIFOR ([Experience Section](#experiencia)).
- **Automation & RPA:** How he reduced **FTP_SYNC** from 6 hours to under 10 seconds (-99%) ([Automation Section](#rpa)).
- **Projects & AI:** How **Central Grupo Mais** or the **9-agent Maker-Checker AI squad** work ([Projects Section](#projetos)).`;
  }

  return `### 🔒 Escopo Restrito ao Portfólio Profissional
Sou o **Anderson AI**, assistente oficial dedicado exclusivamente ao portfólio de **Anderson Cataldo**. Por regra de governança, respondo apenas sobre sua trajetória profissional, tempo de trabalho e estudo, projetos, stack tecnológica, certificações e contato para oportunidades.

Você pode me perguntar, por exemplo:
- **Experiência e Estudo:** Quanto tempo de experiência ele possui e detalhes da graduação na UNIFOR ([Seção Experiência](#experiencia)).
- **Automação & RPA:** Como ele reduziu o **FTP_SYNC** de 6 horas para menos de 10 segundos (-99%) ([Seção Automação & RPA](#rpa)).
- **Projetos e IA:** Como funcionam a **Central Grupo Mais** ou o **squad de 9 agentes de IA** ([Seção Projetos](#projetos)).`;
}
