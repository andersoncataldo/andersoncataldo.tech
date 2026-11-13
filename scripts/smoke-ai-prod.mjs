#!/usr/bin/env node
/**
 * Smoke test E2E contra a API de produção (/api/chat).
 * Verifica se a IA generativa (Gemini + fallback) e o modo direto estão saudáveis.
 */

const BASE_URL = (process.env.PROD_URL || 'https://andersoncataldotech.vercel.app').replace(/\/+$/, '');

async function parseSseChat(query, language = 'pt') {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: query }],
      language,
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ao consultar /api/chat para "${query}"`);
  }

  const raw = await res.text();
  const lines = raw.split('\n').filter((l) => l.startsWith('data: '));
  let mode = null;
  let reason = null;
  let model = null;
  let traceId = null;
  let text = '';
  const actions = [];

  for (const line of lines) {
    const payloadStr = line.slice(6).trim();
    if (payloadStr === '[DONE]') continue;
    try {
      const parsed = JSON.parse(payloadStr);
      if (parsed.mode && !mode) mode = parsed.mode;
      if (parsed.reason && !reason) reason = parsed.reason;
      if (parsed.model && !model) model = parsed.model;
      if (parsed.traceId && !traceId) traceId = parsed.traceId;
      if (parsed.text) text += parsed.text;
      if (parsed.action) actions.push(parsed.action);
    } catch {
      // ignora linha parcial
    }
  }

  return { mode, reason, model, traceId, text, actions };
}

async function main() {
  console.log(`🔎 Executando smoke test em ${BASE_URL}/api/chat...`);

  const directRes = await parseSseChat('Oi');
  if (directRes.mode !== 'direct' || !directRes.traceId) {
    throw new Error(`Esperado mode="direct" para saudação, recebido: ${JSON.stringify(directRes)}`);
  }
  console.log(`✅ Direct mode OK (${directRes.reason}, traceId=${directRes.traceId})`);

  const geminiRes = await parseSseChat('Quais automacoes RPA voce desenvolveu na 3coracoes?');
  if (geminiRes.mode !== 'gemini' || !geminiRes.text.trim() || !geminiRes.traceId) {
    throw new Error(
      `Esperado mode="gemini" com texto não vazio, recebido: ${JSON.stringify({
        mode: geminiRes.mode,
        reason: geminiRes.reason,
        model: geminiRes.model,
        traceId: geminiRes.traceId,
        textLen: geminiRes.text.length,
      })}`,
    );
  }
  console.log(
    `✅ Gemini stream OK (model=${geminiRes.model || 'cached'}, traceId=${geminiRes.traceId}, chars=${geminiRes.text.length})`,
  );
}

main().catch((err) => {
  console.error('❌ Smoke test de produção falhou:', err);
  process.exit(1);
});
