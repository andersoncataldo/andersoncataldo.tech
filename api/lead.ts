import { validateInputGuardrails, type SupportedLanguage } from '../src/lib/ai';
import { isValidContactChannel } from '../src/lib/contactValidation';
import { submitRecruiterLead, type RecruiterLeadInput } from '../src/lib/supabase/restClient';

export const config = {
  runtime: 'edge',
};

declare const process: { env?: Record<string, string | undefined> } | undefined;

interface LeadPayload {
  traceId?: unknown;
  recruiterName?: unknown;
  company?: unknown;
  contactChannel?: unknown;
  roleTitle?: unknown;
  message?: unknown;
  lang?: unknown;
  consent?: unknown;
  /** Honeypot: campo invisível que humanos nunca preenchem */
  website?: unknown;
  /** Tempo (ms) que o formulário ficou aberto antes do envio */
  elapsedMs?: unknown;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MIN_FILL_TIME_MS = 2_500;
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

function problem(status: number, title: string, detail: string, extraHeaders?: Record<string, string>) {
  return new Response(
    JSON.stringify({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title,
      status,
      detail,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/problem+json', ...(extraHeaders || {}) },
    },
  );
}

/**
 * Avisa o Anderson em tempo real via webhook gratuito (Discord, Slack, ntfy.sh etc.).
 * Opcional: só dispara se LEAD_WEBHOOK_URL estiver configurada. Nunca bloqueia nem quebra o fluxo.
 */
async function notifyLeadWebhook(lead: RecruiterLeadInput): Promise<void> {
  const url = typeof process !== 'undefined' ? process?.env?.LEAD_WEBHOOK_URL : undefined;
  if (!url || !/^https:\/\//i.test(url)) return;

  const text = [
    '📩 Novo contato de recrutador no portfólio',
    `Nome: ${lead.recruiterName}${lead.company ? ` (${lead.company})` : ''}`,
    `Contato: ${lead.contactChannel}`,
    lead.roleTitle ? `Vaga: ${lead.roleTitle}` : '',
    `Mensagem: ${lead.message.slice(0, 500)}`,
  ]
    .filter(Boolean)
    .join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // `content` (Discord) e `text` (Slack/genérico)
      body: JSON.stringify({ content: text, text }),
      signal: controller.signal,
    });
  } catch {
    // Notificação é best-effort
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return problem(405, 'Method Not Allowed', 'Apenas requisições POST são suportadas neste endpoint.');
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
  if (!checkRateLimit(clientIp)) {
    return problem(
      429,
      'Too Many Requests',
      'Limite de envios excedido. Aguarde um minuto antes de tentar novamente.',
      { 'Retry-After': '60' },
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return problem(400, 'Bad Request', 'Corpo JSON inválido.');
  }

  // Anti-bot silencioso: honeypot preenchido ou envio rápido demais => finge sucesso sem gravar
  const honeypotFilled = typeof payload.website === 'string' && payload.website.trim().length > 0;
  const elapsedMs = typeof payload.elapsedMs === 'number' ? payload.elapsedMs : 0;
  if (honeypotFilled || elapsedMs < MIN_FILL_TIME_MS) {
    return new Response(JSON.stringify({ ok: true, saved: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const recruiterName = typeof payload.recruiterName === 'string' ? payload.recruiterName.trim() : '';
  const company = typeof payload.company === 'string' ? payload.company.trim() : undefined;
  const contactChannel = typeof payload.contactChannel === 'string' ? payload.contactChannel.trim() : '';
  const roleTitle = typeof payload.roleTitle === 'string' ? payload.roleTitle.trim() : undefined;
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const traceId = typeof payload.traceId === 'string' ? payload.traceId.trim() : undefined;
  const locale: SupportedLanguage = payload.lang === 'en' ? 'en' : 'pt';
  const consent = payload.consent === true;

  if (recruiterName.length < 2 || message.length < 5) {
    return problem(400, 'Bad Request', 'Preencha seu nome e os detalhes da oportunidade.');
  }
  if (!isValidContactChannel(contactChannel)) {
    return problem(
      400,
      'Bad Request',
      'Informe um e-mail, telefone/WhatsApp (com DDD) ou link do LinkedIn válido para contato.',
    );
  }
  if (!consent) {
    return problem(400, 'Bad Request', 'É necessário autorizar o uso dos dados para contato (LGPD).');
  }

  const guardCheck = validateInputGuardrails(`${recruiterName} ${company || ''} ${message}`.slice(0, 500));
  if (!guardCheck.allowed && guardCheck.reason === 'prompt_injection') {
    return problem(422, 'Unprocessable Input', 'Conteúdo bloqueado pelas políticas de segurança.');
  }

  const lead: RecruiterLeadInput = {
    traceId,
    recruiterName,
    company,
    contactChannel,
    roleTitle,
    message,
    locale,
    consent,
  };
  const status = await submitRecruiterLead(lead);

  if (status === 'rate_limited') {
    return problem(
      429,
      'Too Many Requests',
      'Muitos envios recentes para este contato. Tente novamente mais tarde.',
      { 'Retry-After': '3600' },
    );
  }
  if (status === 'invalid') {
    return problem(400, 'Bad Request', 'Dados do contato inválidos.');
  }
  if (status !== 'ok') {
    return problem(
      503,
      'Service Unavailable',
      'Não foi possível registrar o contato agora. Tente por e-mail ou LinkedIn.',
    );
  }

  await notifyLeadWebhook(lead);

  return new Response(JSON.stringify({ ok: true, saved: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
