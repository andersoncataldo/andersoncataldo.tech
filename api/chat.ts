import {
  buildGroundedLLMRequest,
  normalizeText,
  synthesizeConversationalResponse,
  validateInputGuardrails,
  verifyOutputMetrics,
  type ChatMessageItem,
  type SupportedLanguage,
} from '../src/lib/ai';
import {
  computeQueryHash,
  generateTraceId,
  logAiTelemetryNonBlocking,
  lookupAnswerCacheL2,
  upsertAnswerCacheL2,
} from '../src/lib/supabase/restClient';

export const config = {
  runtime: 'edge',
};

declare const process: { env?: Record<string, string | undefined> } | undefined;

interface RequestPayload {
  messages: unknown;
  lang?: unknown;
  sessionId?: unknown;
}

/**
 * Rate limiter best-effort em memória por isolate Edge (15 req / 60s por IP).
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
 * Cache de Respostas L1 LRU em memória por instância Edge (máx. 60 entradas, TTL 10 min)
 */
const ANSWER_CACHE_MAX = 60;
const ANSWER_CACHE_TTL_MS = 10 * 60_000;
const answerCache = new Map<string, { reply: string; mode: 'gemini' | 'offline'; expiresAt: number }>();

function getCacheKey(lang: SupportedLanguage, aspect: string, resolvedQuery: string): string {
  return `${lang}:${aspect}:${normalizeText(resolvedQuery)}`;
}

function getCachedReply(key: string): { reply: string; mode: 'gemini' | 'offline' } | null {
  const entry = answerCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    answerCache.delete(key);
    return null;
  }
  return { reply: entry.reply, mode: entry.mode };
}

function setCachedReply(key: string, reply: string, mode: 'gemini' | 'offline'): void {
  if (answerCache.size >= ANSWER_CACHE_MAX) {
    const oldestKey = answerCache.keys().next().value;
    if (oldestKey) answerCache.delete(oldestKey);
  }
  answerCache.set(key, {
    reply,
    mode,
    expiresAt: Date.now() + ANSWER_CACHE_TTL_MS,
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
  const startedAt = Date.now();
  const traceId = generateTraceId();

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
  const sessionId =
    typeof payload.sessionId === 'string' && payload.sessionId.trim().length > 0
      ? payload.sessionId.trim().slice(0, 80)
      : 'anonymous';

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
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: lastUserMessage,
      rewrittenQuery: guardIn.sanitizedQuery || lastUserMessage,
      intent: localResult.intent.intent,
      aspect: localResult.intent.aspect,
      cragStatus: 'insufficient',
      confidence: localResult.intent.confidence,
      isMultiPart: false,
      needsClarification: false,
      usedLlm: false,
      cacheHit: false,
      coveRepaired: false,
      topChunkIds: [],
      citations: [],
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(localResult.reply, 'direct', 'input_guardrail', traceId);
  }

  // 2. Classificação de intenção e pipeline de raciocínio em 5 etapas (Rewrite + Ambiguity + Decompose + Hybrid CRAG)
  const { systemInstruction, retrievedContextBlock, intent, retrieval, plan } = buildGroundedLLMRequest(
    guardIn.sanitizedQuery,
    lang,
    historyBeforeLast,
  );
  const topChunkIds = retrieval.topChunks.map((c) => c.chunk.id);

  // 3. Intenções ou estados CRAG determinísticos (injecao, fora_de_escopo, smalltalk, ambígua, CRAG parcial/insuficiente)
  if (
    intent.intent === 'injecao' ||
    intent.intent === 'fora_de_escopo' ||
    intent.intent === 'smalltalk' ||
    plan.isAmbiguous ||
    plan.cragStatus === 'partial' ||
    plan.cragStatus === 'insufficient' ||
    intent.detectedUnlistedTech.length > 0
  ) {
    const direct = synthesizeConversationalResponse(guardIn.sanitizedQuery, lang, historyBeforeLast);
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: guardIn.sanitizedQuery,
      rewrittenQuery: plan.rewrittenQuery,
      intent: intent.intent,
      aspect: intent.aspect,
      cragStatus: plan.cragStatus,
      confidence: retrieval.maxConfidence,
      isMultiPart: plan.isMultiPart,
      needsClarification: plan.isAmbiguous,
      usedLlm: false,
      cacheHit: false,
      coveRepaired: direct.coveRepaired,
      topChunkIds,
      citations: direct.citations,
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(direct.reply, 'direct', `direct_intent_${intent.intent}`, traceId);
  }

  // 4. Consulta ao Cache de Respostas L1 (em memória) e L2 (Supabase PostgreSQL com timeout de 350ms)
  const cacheKey = getCacheKey(lang, intent.aspect, retrieval.resolvedQuery);
  const queryHash = computeQueryHash(lang, intent.aspect, normalizeText(retrieval.resolvedQuery));
  const recentAssistantTexts = historyBeforeLast
    .filter((m) => m.role === 'assistant')
    .slice(-2)
    .map((m) => m.content)
    .join('\n');

  const cachedL1 = getCachedReply(cacheKey);
  if (cachedL1 && (!recentAssistantTexts || !recentAssistantTexts.includes(cachedL1.reply.slice(0, 60)))) {
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: guardIn.sanitizedQuery,
      rewrittenQuery: plan.rewrittenQuery,
      intent: intent.intent,
      aspect: intent.aspect,
      cragStatus: plan.cragStatus,
      confidence: retrieval.maxConfidence,
      isMultiPart: plan.isMultiPart,
      needsClarification: false,
      usedLlm: cachedL1.mode === 'gemini',
      cacheHit: true,
      coveRepaired: false,
      topChunkIds,
      citations: [],
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(cachedL1.reply, cachedL1.mode, 'answer_cache_l1_hit', traceId);
  }

  const cachedL2 = await lookupAnswerCacheL2(queryHash, lang, 350);
  if (
    cachedL2 &&
    (!recentAssistantTexts || !recentAssistantTexts.includes(cachedL2.responseText.slice(0, 60)))
  ) {
    setCachedReply(cacheKey, cachedL2.responseText, 'gemini');
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: guardIn.sanitizedQuery,
      rewrittenQuery: plan.rewrittenQuery,
      intent: intent.intent,
      aspect: intent.aspect,
      cragStatus: plan.cragStatus,
      confidence: retrieval.maxConfidence,
      isMultiPart: plan.isMultiPart,
      needsClarification: false,
      usedLlm: true,
      cacheHit: true,
      coveRepaired: false,
      topChunkIds,
      citations: cachedL2.citations,
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(cachedL2.responseText, 'gemini', 'answer_cache_l2_hit', traceId);
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
    if (plan.cragStatus === 'sufficient') {
      void upsertAnswerCacheL2({
        queryHash,
        locale: lang,
        normalizedQuery: normalizeText(retrieval.resolvedQuery),
        intent: intent.intent,
        aspect: intent.aspect,
        cragStatus: 'sufficient',
        responseText: synthesized.reply,
        citations: synthesized.citations,
      });
    }
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: guardIn.sanitizedQuery,
      rewrittenQuery: plan.rewrittenQuery,
      intent: intent.intent,
      aspect: intent.aspect,
      cragStatus: plan.cragStatus,
      confidence: retrieval.maxConfidence,
      isMultiPart: plan.isMultiPart,
      needsClarification: false,
      usedLlm: false,
      cacheHit: false,
      coveRepaired: synthesized.coveRepaired,
      topChunkIds,
      citations: synthesized.citations,
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(synthesized.reply, 'offline', 'hybrid_ml_local', traceId);
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

    const geminiModels = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'] as const;
    let geminiRes: Response | null = null;
    let usedModel: (typeof geminiModels)[number] = 'gemini-3.8-flash';

    for (const modelName of geminiModels) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${apiKey}&alt=sse`;
      try {
        const candidateRes = await fetchWithRetry(
          geminiUrl,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: plan.recommendedThinkingBudget > 0 ? 800 : 450,
                ...(modelName === 'gemini-3.8-flash'
                  ? {
                      thinkingConfig: {
                        thinkingBudget: plan.recommendedThinkingBudget,
                        includeThoughts: false,
                      },
                    }
                  : {}),
              },
            }),
          },
          modelName === 'gemini-3.8-flash'
            ? { retries: 0, timeoutMs: 4500 }
            : { retries: 1, timeoutMs: 6500 },
        );
        if (candidateRes.ok && candidateRes.body) {
          geminiRes = candidateRes;
          usedModel = modelName;
          break;
        }
        geminiRes = candidateRes;
      } catch {
        // Falha/timeout no modelo primário: tenta o próximo modelo de fallback
        continue;
      }
    }

    if (!geminiRes || !geminiRes.ok || !geminiRes.body) {
      const fallback = synthesizeConversationalResponse(
        guardIn.sanitizedQuery,
        lang,
        historyBeforeLast,
      );
      void logAiTelemetryNonBlocking({
        traceId,
        sessionId,
        locale: lang,
        originalQuery: guardIn.sanitizedQuery,
        rewrittenQuery: plan.rewrittenQuery,
        intent: intent.intent,
        aspect: intent.aspect,
        cragStatus: plan.cragStatus,
        confidence: retrieval.maxConfidence,
        isMultiPart: plan.isMultiPart,
        needsClarification: false,
        usedLlm: false,
        cacheHit: false,
        coveRepaired: false,
        topChunkIds,
        citations: fallback.citations,
        latencyMs: Date.now() - startedAt,
      });
      return createStreamResponse(fallback.reply, 'offline', 'fallback_upstream_error', traceId);
    }

    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();
    const encoder = new TextEncoder();
    const reader = geminiRes.body.getReader();
    const decoder = new TextDecoder();

    (async () => {
      let buffer = '';
      let fullAccumulated = '';
      let anyCoveRepair = false;
      try {
        const effectiveThinkingBudget =
          usedModel === 'gemini-3.8-flash' ? plan.recommendedThinkingBudget : 0;
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({
              mode: 'gemini',
              reason: 'gemini_stream',
              traceId,
              model: usedModel,
              thinkingBudget: effectiveThinkingBudget,
            })}\n\n`,
          ),
        );

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
                const parts: Array<{ text?: string; thought?: boolean }> =
                  parsed.candidates?.[0]?.content?.parts || [];
                const textPart = parts
                  .filter((p) => !p.thought && typeof p.text === 'string')
                  .map((p) => p.text)
                  .join('');
                if (textPart.length > 0) {
                  fullAccumulated += textPart;
                  const metricCheck = verifyOutputMetrics(textPart, lang);
                  if (!metricCheck.valid) anyCoveRepair = true;
                  await writer.write(
                    encoder.encode(
                      `data: ${JSON.stringify({ text: metricCheck.sanitizedText, mode: 'gemini', traceId })}\n\n`,
                    ),
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
            encoder.encode(
              `data: ${JSON.stringify({ text: fallback.reply, mode: 'offline', traceId })}\n\n`,
            ),
          );
          void logAiTelemetryNonBlocking({
            traceId,
            sessionId,
            locale: lang,
            originalQuery: guardIn.sanitizedQuery,
            rewrittenQuery: plan.rewrittenQuery,
            intent: intent.intent,
            aspect: intent.aspect,
            cragStatus: plan.cragStatus,
            confidence: retrieval.maxConfidence,
            isMultiPart: plan.isMultiPart,
            needsClarification: false,
            usedLlm: false,
            cacheHit: false,
            coveRepaired: false,
            topChunkIds,
            citations: fallback.citations,
            latencyMs: Date.now() - startedAt,
          });
          await writer.write(encoder.encode('data: [DONE]\n\n'));
        } else {
          const fullCheck = verifyOutputMetrics(fullAccumulated, lang);
          if (!fullCheck.valid) anyCoveRepair = true;
          const verifiedFull = fullCheck.sanitizedText;
          setCachedReply(cacheKey, verifiedFull, 'gemini');
          const bgTasks: Promise<unknown>[] = [];
          if (plan.cragStatus === 'sufficient') {
            bgTasks.push(
              upsertAnswerCacheL2({
                queryHash,
                locale: lang,
                normalizedQuery: normalizeText(retrieval.resolvedQuery),
                intent: intent.intent,
                aspect: intent.aspect,
                cragStatus: 'sufficient',
                responseText: verifiedFull,
                citations: Array.from(new Set(retrieval.topChunks.map((c) => c.chunk.sectionAnchor))),
              }),
            );
          }
          bgTasks.push(
            logAiTelemetryNonBlocking({
              traceId,
              sessionId,
              locale: lang,
              originalQuery: guardIn.sanitizedQuery,
              rewrittenQuery: plan.rewrittenQuery,
              intent: intent.intent,
              aspect: intent.aspect,
              cragStatus: plan.cragStatus,
              confidence: retrieval.maxConfidence,
              isMultiPart: plan.isMultiPart,
              needsClarification: false,
              usedLlm: true,
              cacheHit: false,
              coveRepaired: anyCoveRepair,
              topChunkIds,
              citations: Array.from(new Set(retrieval.topChunks.map((c) => c.chunk.sectionAnchor))),
              latencyMs: Date.now() - startedAt,
            }),
          );
          await writer.write(encoder.encode('data: [DONE]\n\n'));
          // Aguarda gravações no Supabase antes de fechar o stream no Edge Runtime
          await Promise.race([
            Promise.allSettled(bgTasks),
            new Promise((r) => setTimeout(r, 1500)),
          ]);
        }
      } catch {
        // Em caso de interrupção de stream, encerra graciosamente sem expor stacktrace
      } finally {
        try {
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
    void logAiTelemetryNonBlocking({
      traceId,
      sessionId,
      locale: lang,
      originalQuery: guardIn.sanitizedQuery,
      rewrittenQuery: plan.rewrittenQuery,
      intent: intent.intent,
      aspect: intent.aspect,
      cragStatus: plan.cragStatus,
      confidence: retrieval.maxConfidence,
      isMultiPart: plan.isMultiPart,
      needsClarification: false,
      usedLlm: false,
      cacheHit: false,
      coveRepaired: false,
      topChunkIds,
      citations: fallback.citations,
      latencyMs: Date.now() - startedAt,
    });
    return createStreamResponse(fallback.reply, 'offline', 'fallback_exception', traceId);
  }
}

function createStreamResponse(
  text: string,
  mode: 'gemini' | 'direct' | 'offline',
  reason: string,
  traceId: string,
): Response {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ mode, reason, traceId })}\n\n`));

      const words = text.split(' ');
      for (let i = 0; i < words.length; i += 4) {
        const chunk = words.slice(i, i + 4).join(' ') + (i + 4 < words.length ? ' ' : '');
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk, mode, traceId })}\n\n`));
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
