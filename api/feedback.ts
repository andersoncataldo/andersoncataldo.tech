import { submitAiFeedback } from '../src/lib/supabase/restClient';

export const config = {
  runtime: 'edge',
};

interface FeedbackPayload {
  traceId?: unknown;
  helpful?: unknown;
  comment?: unknown;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.5',
        title: 'Method Not Allowed',
        status: 405,
        detail: 'Apenas requisições POST são suportadas neste endpoint.',
      }),
      { status: 405, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc6585#section-4',
        title: 'Too Many Requests',
        status: 429,
        detail: 'Limite de avaliações por minuto excedido.',
      }),
      { status: 429, headers: { 'Content-Type': 'application/problem+json', 'Retry-After': '60' } },
    );
  }

  let payload: FeedbackPayload;
  try {
    payload = (await req.json()) as FeedbackPayload;
  } catch {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Corpo JSON inválido.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  const traceId = typeof payload.traceId === 'string' ? payload.traceId.trim() : '';
  const helpful = typeof payload.helpful === 'boolean' ? payload.helpful : null;
  const comment = typeof payload.comment === 'string' ? payload.comment.trim().slice(0, 500) : undefined;

  if (!traceId || traceId.length < 8 || traceId.length > 80 || helpful === null) {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Os campos "traceId" (8..80 chars) e "helpful" (boolean) são obrigatórios.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  const recorded = await submitAiFeedback({ traceId, helpful, comment });

  return new Response(
    JSON.stringify({
      ok: true,
      recorded,
      cacheInvalidated: recorded && helpful === false,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  );
}
