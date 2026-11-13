import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function loadTs(relativePath) {
  const fullPath = path.resolve(ROOT_DIR, relativePath);
  const result = await esbuild.build({
    entryPoints: [fullPath],
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

async function main() {
  const [chatApi, feedbackApi, leadApi, contactValidation] = await Promise.all([
    loadTs('api/chat.ts'),
    loadTs('api/feedback.ts'),
    loadTs('api/lead.ts'),
    loadTs('src/lib/contactValidation.ts'),
  ]);

  // 1. Validação compartilhada de canal de contato
  assert.equal(contactValidation.isValidContactChannel('recruiter@company.com'), true);
  assert.equal(contactValidation.isValidContactChannel('+55 85 99225-8794'), true);
  assert.equal(contactValidation.isValidContactChannel('https://www.linkedin.com/in/andersonnviana'), true);
  assert.equal(contactValidation.isValidContactChannel('invalido'), false);
  assert.equal(contactValidation.isValidContactChannel('12345'), false);

  // 2. /api/chat: GET 405, JSON inválido 400, POST SSE 200 com traceId
  const chatGet = await chatApi.default(new Request('http://localhost/api/chat', { method: 'GET' }));
  assert.equal(chatGet.status, 405);

  const chatBadJson = await chatApi.default(
    new Request('http://localhost/api/chat', { method: 'POST', body: '{bad' }),
  );
  assert.equal(chatBadJson.status, 400);

  const chatOk = await chatApi.default(
    new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'contract-chat' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Qual foi o primeiro emprego do Anderson?' }],
        lang: 'pt',
      }),
    }),
  );
  assert.equal(chatOk.status, 200);
  const sseBody = await chatOk.text();
  assert.ok(sseBody.includes('trc_'), 'SSE deve emitir traceId');
  assert.ok(sseBody.includes('3cora'), 'SSE deve retornar o Grupo 3corações');

  // 3. /api/feedback: GET 405, payload inválido 400, payload válido 200
  const fbGet = await feedbackApi.default(new Request('http://localhost/api/feedback', { method: 'GET' }));
  assert.equal(fbGet.status, 405);

  const fbBad = await feedbackApi.default(
    new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ traceId: 'short', helpful: true }),
    }),
  );
  assert.equal(fbBad.status, 400);

  const fbOk = await feedbackApi.default(
    new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'contract-fb' },
      body: JSON.stringify({ traceId: 'trc_contract_12345678', helpful: true }),
    }),
  );
  assert.equal(fbOk.status, 200);

  // 4. /api/lead: GET 405, canal inválido 400, sem consentimento LGPD 400, honeypot 200 silencioso
  const leadGet = await leadApi.default(new Request('http://localhost/api/lead', { method: 'GET' }));
  assert.equal(leadGet.status, 405);

  const leadBadContact = await leadApi.default(
    new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'contract-lead-1' },
      body: JSON.stringify({
        recruiterName: 'Maria Silva',
        contactChannel: 'nao-e-contato',
        message: 'Temos uma vaga de backend Python.',
        consent: true,
        elapsedMs: 5000,
      }),
    }),
  );
  assert.equal(leadBadContact.status, 400);

  const leadNoConsent = await leadApi.default(
    new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'contract-lead-2' },
      body: JSON.stringify({
        recruiterName: 'Maria Silva',
        contactChannel: 'maria@empresa.com',
        message: 'Temos uma vaga de backend Python.',
        consent: false,
        elapsedMs: 5000,
      }),
    }),
  );
  assert.equal(leadNoConsent.status, 400);

  const leadHoneypot = await leadApi.default(
    new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'contract-lead-3' },
      body: JSON.stringify({
        recruiterName: 'Bot',
        contactChannel: 'bot@spam.com',
        message: 'Spam message here',
        website: 'https://spam.example',
        consent: true,
        elapsedMs: 5000,
      }),
    }),
  );
  assert.equal(leadHoneypot.status, 200);

  console.log('✅ Todos os contratos de API (/api/chat, /api/feedback, /api/lead) passaram!');
}

main().catch((err) => {
  console.error('❌ Falha nos contratos de API:', err);
  process.exit(1);
});
