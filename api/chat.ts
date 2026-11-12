import {
  buildGroundedLLMRequest,
  normalizeText,
  synthesizeConversationalResponse,
  validateInputGuardrails,
  verifyOutputMetrics,
  type ChatMessageItem,
  type SupportedLanguage,
} from '../src/lib/ai';

export const config = {
  runtime: 'edge',
};

declare const process: { env?: Record<string, string | undefined> } | undefined;

interface RequestPayload {
  messages: unknown;
  lang?: unknown;
}

/**
 * Rate limiter best-effort em memória por isolate Edge (15 req / 60s por IP).
 * Limitação conhecida do Edge sem banco de dados: o estado é local à instância V8 Isolate ativa.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 15;
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

/**
 * Cache Semântico LRU em memória por instância Edge (máx. 60 entradas, TTL 10 min)
 */
const SEMANTIC_CACHE_MAX = 60;
const SEMANTIC_CACHE_TTL_MS = 10 * 60_000;
const semanticCache = new Map<string, { reply: string; mode: 'gemini' | 'offline'; expiresAt: number }>();

function getCacheKey(lang: SupportedLanguage, resolvedQuery: string): string {
  return `${lang}:${normalizeText(resolvedQuery)}`;
}

function getCachedReply(key: string): { reply: string; mode: 'gemini' | 'offline' } | null {
  const entry = semanticCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    semanticCache.delete(key);
    return null;
  }
  return { reply: entry.reply, mode: entry.mode };
}

function setCachedReply(key: string, reply: string, mode: 'gemini' | 'offline'): void {
  if (semanticCache.size >= SEMANTIC_CACHE_MAX) {
    const oldestKey = semanticCache.keys().next().value;
    if (oldestKey) semanticCache.delete(oldestKey);
  }
  semanticCache.set(key, {
    reply,
    mode,
    expiresAt: Date.now() + SEMANTIC_CACHE_TTL_MS,
  });
}

/**
 * Fetch com timeout e retry com backoff exponencial para resiliência no Edge
 */
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  options = { retries: 1, timeoutMs: 6500 },
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= options.retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(timer);
      if (res.ok || res.status < 500) {
        return res;
      }
      lastError = new Error(`Upstream HTTP ${res.status}`);
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
    }
    if (attempt < options.retries) {
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
    }
  }
  throw lastError;
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
        detail: 'Limite de requisições excedido. Aguarde um minuto antes de tentar novamente.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/problem+json',
          'Retry-After': '60',
        },
      },
    );
  }

  let payload: RequestPayload;
  try {
    payload = (await req.json()) as RequestPayload;
  } catch {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Corpo da requisição deve ser um JSON válido.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'O campo "messages" deve ser um array não vazio.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  const lang: SupportedLanguage = payload.lang === 'en' ? 'en' : 'pt';

  const sanitizedMessages: ChatMessageItem[] = payload.messages
    .slice(-6)
    .filter(
      (item): item is { role: unknown; content: unknown } =>
        Boolean(item) && typeof item === 'object',
    )
    .map((item) => ({
      role: (item.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: typeof item.content === 'string' ? item.content.slice(0, 500).trim() : '',
    }))
    .filter((item) => item.content.length > 0);

  if (sanitizedMessages.length === 0) {
    return new Response(
      JSON.stringify({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Nenhuma mensagem de texto válida encontrada.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
    );
  }

  const lastUserMessage =
    [...sanitizedMessages].reverse().find((m) => m.role === 'user')?.content || '';
  const historyBeforeLast = sanitizedMessages.slice(0, -1);

  // 1. Guardrails determinísticos de entrada
  const guardIn = validateInputGuardrails(lastUserMessage);
  if (!guardIn.allowed) {
    const localResult = synthesizeConversationalResponse(lastUserMessage, lang, historyBeforeLast);
    return createStreamResponse(localResult.reply, 'offline', 'input_guardrail');
  }

  // 2. Classificação de intenção e recuperação híbrida (BM25 + Cosine Similarity + RRF + MMR)
  const { systemInstruction, retrievedContextBlock, intent, retrieval } = buildGroundedLLMRequest(
    guardIn.sanitizedQuery,
    lang,
    historyBeforeLast,
  );

  // 3. Intenções que não precisam gastar chamada ao LLM (injecao, fora_de_escopo, smalltalk, tecnologia não listada)
  if (
    intent.intent === 'injecao' ||
    intent.intent === 'fora_de_escopo' ||
    intent.intent === 'smalltalk' ||
    intent.detectedUnlistedTech.length > 0
  ) {
    const direct = synthesizeConversationalResponse(guardIn.sanitizedQuery, lang, historyBeforeLast);
    return createStreamResponse(direct.reply, 'offline', `direct_intent_${intent.intent}`);
  }

  // 4. Consulta ao Cache Semântico LRU
  const cacheKey = getCacheKey(lang, retrieval.resolvedQuery);
  const cached = getCachedReply(cacheKey);
  if (cached) {
    return createStreamResponse(cached.reply, cached.mode, 'semantic_cache_hit');
  }

  const apiKey = typeof process !== 'undefined' ? process?.env?.GEMINI_API_KEY : undefined;

  // 5. Modo Independente / Sem API Key: usa o Compositor NLG Dinâmico sobre o índice Híbrido
  if (!apiKey) {
    const synthesized = synthesizeConversationalResponse(
      guardIn.sanitizedQuery,
      lang,
      historyBeforeLast,
    );
    setCachedReply(cacheKey, synthesized.reply, 'offline');
    return createStreamResponse(synthesized.reply, 'offline', 'hybrid_ml_local');
  }

  // 6. Geração Fundamentada com Google Gemini 2.5 Flash recebendo apenas os top-k chunks recuperados
  try {
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `${systemInstruction}\n\n${retrievedContextBlock}`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text:
              lang === 'en'
                ? 'Understood. I will answer accurately based strictly on the retrieved chunks and canonical metrics, citing portfolio section anchors.'
                : 'Entendido. Responderei com precisão estritamente com base nos chunks recuperados e nas métricas canônicas, citando as âncoras das seções.',
          },
        ],
      },
      ...sanitizedMessages.slice(-6).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: `<user_query>${m.content}</user_query>` }],
      })),
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

    const geminiRes = await fetchWithRetry(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 450,
        },
      }),
    });

    if (!geminiRes.ok || !geminiRes.body) {
      const fallback = synthesizeConversationalResponse(
        guardIn.sanitizedQuery,
        lang,
        historyBeforeLast,
      );
      return createStreamResponse(fallback.reply, 'offline', 'fallback_upstream_error');
    }

    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();
    const encoder = new TextEncoder();
    const reader = geminiRes.body.getReader();
    const decoder = new TextDecoder();

    (async () => {
      let buffer = '';
      let fullAccumulated = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const textPart = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (typeof textPart === 'string' && textPart.length > 0) {
                  fullAccumulated += textPart;
                  const checkedPart = verifyOutputMetrics(textPart, lang).sanitizedText;
                  await writer.write(
                    encoder.encode(`data: ${JSON.stringify({ text: checkedPart, mode: 'gemini' })}\n\n`),
                  );
                }
              } catch {
                // Fragmento parcial ignorado
              }
            }
          }
        }

        if (!fullAccumulated.trim()) {
          const fallback = synthesizeConversationalResponse(
            guardIn.sanitizedQuery,
            lang,
            historyBeforeLast,
          );
          await writer.write(
            encoder.encode(`data: ${JSON.stringify({ text: fallback.reply, mode: 'offline' })}\n\n`),
          );
        } else {
          const verifiedFull = verifyOutputMetrics(fullAccumulated, lang).sanitizedText;
          setCachedReply(cacheKey, verifiedFull, 'gemini');
        }
      } catch {
        // Em caso de interrupção de stream, encerra graciosamente sem expor stacktrace ou logar dados pessoais
      } finally {
        try {
          await writer.write(encoder.encode('data: [DONE]\n\n'));
          await writer.close();
        } catch {
          // Stream já encerrado
        }
      }
    })();

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch {
    const fallback = synthesizeConversationalResponse(
      guardIn.sanitizedQuery,
      lang,
      historyBeforeLast,
    );
    return createStreamResponse(fallback.reply, 'offline', 'fallback_exception');
  }
}

function createStreamResponse(
  text: string,
  mode: 'gemini' | 'offline',
  reason: string,
): Response {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ mode, reason })}\n\n`));

      const words = text.split(' ');
      for (let i = 0; i < words.length; i += 4) {
        const chunk = words.slice(i, i + 4).join(' ') + (i + 4 < words.length ? ' ' : '');
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk, mode })}\n\n`));
      }

      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
