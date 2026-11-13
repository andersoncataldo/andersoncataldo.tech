import type { IntentLabel, QuestionAspect, SupportedLanguage } from '../ai/types';
import type { CragSufficiencyStatus } from '../ai/reasoningPipeline';

declare const process: { env?: Record<string, string | undefined> } | undefined;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  /** Segredo de escrita (somente servidor/Edge). Sem ele, todas as gravações ficam desativadas. */
  writeSecret: string;
  enabled: boolean;
  canWrite: boolean;
}

/**
 * Lê a configuração exclusivamente de variáveis de ambiente (nada fica no código-fonte).
 * - SUPABASE_URL / SUPABASE_ANON_KEY: leitura pública protegida por RLS (base de conhecimento e cache).
 * - AI_WRITE_SECRET: autoriza gravações (telemetria, feedback, leads, cache) via RPCs SECURITY DEFINER.
 */
export function getSupabaseConfig(): SupabaseConfig {
  const env = typeof process !== 'undefined' ? process?.env : undefined;
  if (env?.SUPABASE_DISABLED === 'true') {
    return { url: '', anonKey: '', writeSecret: '', enabled: false, canWrite: false };
  }

  const url = (env?.SUPABASE_URL || '').replace(/\/+$/, '');
  const anonKey = env?.SUPABASE_ANON_KEY || '';
  const writeSecret = env?.AI_WRITE_SECRET || '';
  const enabled = Boolean(url && anonKey);

  return {
    url,
    anonKey,
    writeSecret,
    enabled,
    canWrite: enabled && writeSecret.length >= 32,
  };
}

/**
 * Gera um identificador único compacto (trace_id) compatível com Edge, Browser e Node
 */
export function generateTraceId(): string {
  const ts = Date.now().toString(36);
  const randA = Math.random().toString(36).slice(2, 8);
  const randB = Math.random().toString(36).slice(2, 8);
  return `trc_${ts}_${randA}${randB}`;
}

/**
 * Remove dados pessoais óbvios (e-mail, telefone, CPF, CNPJ, URLs de perfil) de textos antes de
 * persisti-los na telemetria (minimização de dados — LGPD art. 6º, III).
 */
export function redactPii(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, '[email]')
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[cpf]')
    .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, '[cnpj]')
    .replace(/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2}\)?[\s.-]?)?\d{4,5}[\s.-]?\d{4}\b/g, '[telefone]')
    .replace(/https?:\/\/\S+/gi, '[url]');
}

/**
 * Hash determinístico rápido (FNV-1a duplo 32-bit em base16) sem dependência de node:crypto.
 * Chave de correspondência EXATA da consulta normalizada — não é similaridade semântica.
 */
export function computeQueryHash(
  locale: SupportedLanguage,
  aspect: string,
  normalizedQuery: string,
): string {
  const input = `${locale}|${aspect}|${normalizedQuery.trim().toLowerCase()}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i += 1) {
    const ch = input.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch ^ (i & 0xff);
    h2 = Math.imul(h2, 0x811c9dc5);
  }
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return `qh_${locale}_${hex1}${hex2}`;
}

async function supabaseFetchWithTimeout(
  path: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response | null> {
  const cfg = getSupabaseConfig();
  if (!cfg.enabled) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = {
      apikey: cfg.anonKey,
      Authorization: `Bearer ${cfg.anonKey}`,
      'Content-Type': 'application/json',
      ...((init.headers as Record<string, string>) || {}),
    };

    const response = await fetch(`${cfg.url}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return response;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/** Chama um RPC de escrita autenticado pelo segredo do servidor. Retorna o JSON ou null. */
async function callWriteRpc(
  fn: string,
  args: Record<string, unknown>,
  timeoutMs: number,
): Promise<unknown | null> {
  const cfg = getSupabaseConfig();
  if (!cfg.canWrite) return null;

  const res = await supabaseFetchWithTimeout(
    `/rest/v1/rpc/${fn}`,
    { method: 'POST', body: JSON.stringify({ p_secret: cfg.writeSecret, ...args }) },
    timeoutMs,
  );
  if (!res || !res.ok) return null;

  try {
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

export interface AnswerCacheHit {
  responseText: string;
  citations: string[];
}

/**
 * Consulta o Cache de Respostas L2 (correspondência exata por hash) com timeout estrito
 * (default 350ms) para nunca degradar a latência do /api/chat.
 */
export async function lookupAnswerCacheL2(
  queryHash: string,
  locale: SupportedLanguage,
  timeoutMs = 350,
): Promise<AnswerCacheHit | null> {
  if (!queryHash || queryHash.length < 8) return null;

  const encodedHash = encodeURIComponent(queryHash);
  const encodedLocale = encodeURIComponent(locale);
  const res = await supabaseFetchWithTimeout(
    `/rest/v1/ai_answer_cache?query_hash=eq.${encodedHash}&locale=eq.${encodedLocale}&select=response_text,citations&limit=1`,
    { method: 'GET' },
    timeoutMs,
  );

  if (!res || !res.ok) return null;

  try {
    const rows = (await res.json()) as Array<{
      response_text?: string;
      citations?: string[];
    }>;
    const first = rows?.[0];
    if (!first || typeof first.response_text !== 'string' || !first.response_text.trim()) {
      return null;
    }
    return {
      responseText: first.response_text,
      citations: Array.isArray(first.citations) ? first.citations : [],
    };
  } catch {
    return null;
  }
}

export interface AnswerCacheUpsertInput {
  queryHash: string;
  locale: SupportedLanguage;
  normalizedQuery: string;
  intent: IntentLabel;
  aspect: QuestionAspect;
  cragStatus: 'sufficient' | 'partial';
  responseText: string;
  citations: string[];
}

/**
 * Salva/atualiza resposta validada no Cache de Respostas L2 (exige AI_WRITE_SECRET no servidor)
 */
export async function upsertAnswerCacheL2(
  input: AnswerCacheUpsertInput,
  timeoutMs = 1200,
): Promise<boolean> {
  const result = await callWriteRpc(
    'ai_upsert_answer_cache',
    {
      p_query_hash: input.queryHash,
      p_locale: input.locale,
      p_normalized_query: input.normalizedQuery.slice(0, 500),
      p_intent: input.intent,
      p_aspect: input.aspect,
      p_crag_status: input.cragStatus,
      p_response_text: input.responseText.slice(0, 6000),
      p_citations: input.citations,
    },
    timeoutMs,
  );
  return result === true;
}

export interface AiTelemetryLogInput {
  traceId: string;
  sessionId?: string;
  locale: SupportedLanguage;
  originalQuery: string;
  rewrittenQuery: string;
  intent: IntentLabel;
  aspect: QuestionAspect;
  cragStatus: CragSufficiencyStatus;
  confidence: number;
  isMultiPart: boolean;
  needsClarification: boolean;
  usedLlm: boolean;
  cacheHit: boolean;
  coveRepaired: boolean;
  topChunkIds: string[];
  citations: string[];
  latencyMs: number;
}

/**
 * Registra evento de telemetria LLMOps no Supabase de forma assíncrona e resiliente.
 * Textos digitados pelo visitante passam por redação de PII antes de serem gravados.
 */
export async function logAiTelemetryNonBlocking(
  input: AiTelemetryLogInput,
  timeoutMs = 1200,
): Promise<boolean> {
  if (!input.originalQuery.trim() || !input.traceId) return false;

  const result = await callWriteRpc(
    'ai_log_telemetry',
    {
      p_payload: {
        trace_id: input.traceId.slice(0, 80),
        session_id: (input.sessionId || 'anonymous').slice(0, 80),
        locale: input.locale,
        original_query: redactPii(input.originalQuery).slice(0, 600),
        rewritten_query: redactPii(input.rewrittenQuery).slice(0, 800),
        intent: input.intent,
        aspect: input.aspect,
        crag_status: input.cragStatus,
        confidence: Number(Math.max(0, Math.min(1, input.confidence)).toFixed(4)),
        is_multi_part: Boolean(input.isMultiPart),
        needs_clarification: Boolean(input.needsClarification),
        used_llm: Boolean(input.usedLlm),
        cache_hit: Boolean(input.cacheHit),
        cove_repaired: Boolean(input.coveRepaired),
        top_chunk_ids: input.topChunkIds.slice(0, 8),
        citations: input.citations.slice(0, 8),
        latency_ms: Math.max(0, Math.min(60000, Math.round(input.latencyMs))),
      },
    },
    timeoutMs,
  );
  return result === true;
}

export interface SubmitAiFeedbackInput {
  traceId: string;
  helpful: boolean;
  comment?: string;
}

/**
 * Registra avaliação 👍 / 👎 do visitante vinculada ao trace_id da resposta via RPC autenticado
 */
export async function submitAiFeedback(
  input: SubmitAiFeedbackInput,
  timeoutMs = 1800,
): Promise<boolean> {
  if (!input.traceId || input.traceId.length < 8 || input.traceId.length > 80) {
    return false;
  }

  const result = await callWriteRpc(
    'ai_submit_feedback',
    {
      p_trace_id: input.traceId,
      p_helpful: Boolean(input.helpful),
      p_comment: input.comment ? redactPii(input.comment.trim()).slice(0, 500) : null,
    },
    timeoutMs,
  );
  return result === true;
}

export interface RecruiterLeadInput {
  traceId?: string;
  recruiterName: string;
  company?: string;
  contactChannel: string;
  roleTitle?: string;
  message: string;
  locale: SupportedLanguage;
  /** Consentimento explícito (LGPD) para uso dos dados no contato */
  consent: boolean;
}

export type LeadSubmitStatus = 'ok' | 'invalid' | 'rate_limited' | 'unavailable';

/**
 * Persiste uma oportunidade / contato de recrutador via RPC autenticado (com limites de taxa no banco)
 */
export async function submitRecruiterLead(
  input: RecruiterLeadInput,
  timeoutMs = 2500,
): Promise<LeadSubmitStatus> {
  const name = input.recruiterName.trim();
  const contact = input.contactChannel.trim();
  const msg = input.message.trim();

  if (name.length < 2 || contact.length < 3 || msg.length < 5 || !input.consent) {
    return 'invalid';
  }

  const result = await callWriteRpc(
    'ai_submit_lead',
    {
      p_payload: {
        trace_id: input.traceId ? input.traceId.slice(0, 80) : null,
        recruiter_name: name.slice(0, 120),
        company: input.company ? input.company.trim().slice(0, 120) : null,
        contact_channel: contact.slice(0, 180),
        role_title: input.roleTitle ? input.roleTitle.trim().slice(0, 160) : null,
        message: msg.slice(0, 1500),
        locale: input.locale === 'en' ? 'en' : 'pt',
        consent: true,
      },
    },
    timeoutMs,
  );

  if (result === 'ok') return 'ok';
  if (result === 'rate_limited') return 'rate_limited';
  if (result === 'invalid') return 'invalid';
  return 'unavailable';
}
