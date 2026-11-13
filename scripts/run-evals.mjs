import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function loadTsModule(relativePath) {
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
  const dataUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return import(dataUrl);
}

function percentile(sortedArr, p) {
  if (sortedArr.length === 0) return 0;
  const idx = Math.min(sortedArr.length - 1, Math.floor((p / 100) * sortedArr.length));
  return sortedArr[idx];
}

function estimateTokens(text) {
  // Estimativa padrão (~4 caracteres por token / ~1.3 tokens por palavra)
  return Math.ceil(String(text || '').length / 4);
}

async function readSseResponseText(response) {
  const raw = await response.text();
  let accumulated = '';
  for (const line of raw.split('\n')) {
    if (line.startsWith('data: ')) {
      const payload = line.slice(6).trim();
      if (payload === '[DONE]') continue;
      try {
        const parsed = JSON.parse(payload);
        if (parsed.text) accumulated += parsed.text;
      } catch {
        // ignore
      }
    }
  }
  return accumulated;
}

async function main() {
  const isLiveMode = process.argv.includes('--live') && Boolean(process.env.GEMINI_API_KEY);

  const [aiLib, chatApi] = await Promise.all([
    loadTsModule('src/lib/ai/index.ts'),
    loadTsModule('api/chat.ts'),
  ]);

  const readDataset = (file, suite) =>
    JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, file), 'utf-8')).map((c) => ({ ...c, suite }));
  const coreCases = readDataset('evals/dataset.json', 'core');
  const hardCases = readDataset('evals/dataset-hard.json', 'hard');
  /** @type {Array<import('../src/lib/ai/types').EvalCase & { suite: 'core' | 'hard' }>} */
  const dataset = [...coreCases, ...hardCases];
  const baselinePath = path.resolve(ROOT_DIR, 'evals/hard-baseline.json');
  const knownHardFailures = new Set(
    fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf-8')).knownFailures : [],
  );

  console.log(
    `\n🧪 [run-evals] Iniciando avaliação de ${dataset.length} casos (${coreCases.length} núcleo + ${hardCases.length} difíceis) (Modo: ${
      isLiveMode ? 'LIVE GEMINI API + HYBRID RAG' : 'HYBRID ML ENGINE DETERMINÍSTICO / CI'
    })...\n`,
  );

  const latenciesMs = [];
  const tokenCounts = [];
  let totalPassed = 0;
  let factualTotal = 0;
  let factualPassed = 0;
  let refusalTotal = 0;
  let refusalPassed = 0;
  let injectionTotal = 0;
  let injectionPassed = 0;
  let clarificationTotal = 0;
  let clarificationPassed = 0;
  let hallucinationCount = 0;
  const failures = [];

  for (const testCase of dataset) {
    const t0 = performance.now();

    let reply = '';
    const intentPred = aiLib.classifyIntent(testCase.query, testCase.history);

    if (isLiveMode) {
      const req = new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `eval-ip-${testCase.id}`,
        },
        body: JSON.stringify({
          messages: [...(testCase.history || []), { role: 'user', content: testCase.query }],
          lang: testCase.lang,
        }),
      });
      const res = await chatApi.default(req);
      reply = await readSseResponseText(res);
    } else {
      const res = aiLib.synthesizeConversationalResponse(
        testCase.query,
        testCase.lang,
        testCase.history,
      );
      reply = res.reply;
    }

    const elapsedMs = Number((performance.now() - t0).toFixed(2));
    latenciesMs.push(elapsedMs);
    tokenCounts.push(estimateTokens(reply));

    const replyLower = reply.toLowerCase();

    // Checar palavras esperadas
    const missingKeywords = testCase.expectedKeywords.filter(
      (kw) => !replyLower.includes(kw.toLowerCase()),
    );

    // Checar palavras proibidas (alucinação / quebra de escopo)
    const triggeredForbidden = testCase.forbiddenKeywords.filter((kw) =>
      replyLower.includes(kw.toLowerCase()),
    );

    // Checar âncora esperada quando aplicável
    const missingAnchor =
      testCase.expectedAnchor && !reply.includes(testCase.expectedAnchor)
        ? testCase.expectedAnchor
        : null;

    // Checar verificador determinístico de métricas na saída
    const metricVerification = aiLib.verifyOutputMetrics(reply, testCase.lang);
    const hasHallucination = triggeredForbidden.length > 0 || !metricVerification.valid;
    if (hasHallucination) {
      hallucinationCount += 1;
    }

    const passed =
      missingKeywords.length === 0 &&
      triggeredForbidden.length === 0 &&
      !missingAnchor &&
      metricVerification.valid;

    if (passed) {
      totalPassed += 1;
    } else {
      failures.push({
        suite: testCase.suite,
        id: testCase.id,
        query: testCase.query,
        detectedIntent: intentPred.intent,
        missingKeywords,
        triggeredForbidden,
        missingAnchor,
        replySnippet: reply.slice(0, 220),
      });
    }

    if (
      testCase.category === 'factual' ||
      testCase.category === 'multi_topic' ||
      testCase.category === 'follow_up'
    ) {
      factualTotal += 1;
      if (passed) factualPassed += 1;
    } else if (testCase.category === 'out_of_scope' || testCase.category === 'unknown_fact') {
      refusalTotal += 1;
      if (passed) refusalPassed += 1;
    } else if (
      testCase.category === 'prompt_injection' ||
      testCase.category === 'system_prompt_leak'
    ) {
      injectionTotal += 1;
      if (passed) injectionPassed += 1;
    } else if (testCase.category === 'ambiguous') {
      clarificationTotal += 1;
      if (passed) clarificationPassed += 1;
    }
  }

  // Teste adicional de contrato HTTP do endpoint Edge (/api/chat)
  const edgeGetRes = await chatApi.default(new Request('http://localhost/api/chat', { method: 'GET' }));
  const edgePostRes = await chatApi.default(
    new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'edge-test-ip' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Como funciona o FTP_SYNC?' }],
        lang: 'pt',
      }),
    }),
  );
  const edgeStreamText = await readSseResponseText(edgePostRes);
  const edgeContractOk =
    edgeGetRes.status === 405 &&
    edgePostRes.status === 200 &&
    edgeStreamText.includes('-99%');

  const sortedLat = [...latenciesMs].sort((a, b) => a - b);
  const p50 = percentile(sortedLat, 50);
  const p95 = percentile(sortedLat, 95);
  const avgTokens = Math.round(tokenCounts.reduce((a, b) => a + b, 0) / (tokenCounts.length || 1));

  const accuracyPct = ((totalPassed / dataset.length) * 100).toFixed(1);
  const factualPct = ((factualPassed / (factualTotal || 1)) * 100).toFixed(1);
  const refusalPct = ((refusalPassed / (refusalTotal || 1)) * 100).toFixed(1);
  const injectionPct = ((injectionPassed / (injectionTotal || 1)) * 100).toFixed(1);
  const clarificationPct = ((clarificationPassed / (clarificationTotal || 1)) * 100).toFixed(1);
  const hallucinationPct = ((hallucinationCount / dataset.length) * 100).toFixed(1);

  console.log('==============================================================');
  console.log(`📊 RELATÓRIO DE AVALIAÇÃO — ANDERSON AI (${dataset.length} EVALS PT/EN)`);
  console.log('==============================================================');
  console.log(`• Casos Avaliados:               ${totalPassed}/${dataset.length} (${accuracyPct}%)`);
  console.log(`• Taxa de Respostas Ancoradas:   ${factualPassed}/${factualTotal} (${factualPct}%)`);
  console.log(`• Taxa de Recusa/Honestidade:    ${refusalPassed}/${refusalTotal} (${refusalPct}%)`);
  console.log(`• Esclarecimento em Ambíguas:    ${clarificationPassed}/${clarificationTotal} (${clarificationPct}%)`);
  console.log(`• Resistência a Injection/Leak:  ${injectionPassed}/${injectionTotal} (${injectionPct}%)`);
  console.log(`• Taxa de Alucinação Factual:    ${hallucinationCount}/${dataset.length} (${hallucinationPct}%)`);
  console.log(`• Latência de Inferência:        p50 = ${p50} ms | p95 = ${p95} ms`);
  console.log(`• Média de Tokens por Resposta:  ~${avgTokens} tokens`);
  console.log(`• Contrato Edge SSE (/api/chat): ${edgeContractOk ? 'PASS (200 SSE & 405 Guard)' : 'FAIL'}`);
  const coreFailures = failures.filter((f) => f.suite === 'core');
  const hardFailures = failures.filter((f) => f.suite === 'hard');
  const newHardRegressions = hardFailures.filter((f) => !knownHardFailures.has(f.id));
  const fixedHard = [...knownHardFailures].filter((id) => !hardFailures.some((f) => f.id === id));
  console.log(`• Suíte núcleo:                  ${coreCases.length - coreFailures.length}/${coreCases.length} (gate: 100%)`);
  console.log(
    `• Suíte difícil:                 ${hardCases.length - hardFailures.length}/${hardCases.length} (falhas conhecidas: ${knownHardFailures.size}, novas regressões: ${newHardRegressions.length})`,
  );
  console.log('==============================================================\n');

  if (hardFailures.length > 0) {
    console.log('⚠️ Falhas na suíte difícil:');
    for (const f of hardFailures) {
      console.log(
        `  - ${f.id}${knownHardFailures.has(f.id) ? ' (conhecida)' : ' (NOVA)'} | faltando: [${f.missingKeywords.join(', ')}] | proibidas: [${f.triggeredForbidden.join(', ')}]${f.missingAnchor ? ` | âncora: ${f.missingAnchor}` : ''}`,
      );
    }
  }
  if (fixedHard.length > 0) {
    console.log(`🎉 Casos difíceis corrigidos (remova de evals/hard-baseline.json): ${fixedHard.join(', ')}`);
  }

  if (coreFailures.length > 0 || newHardRegressions.length > 0 || !edgeContractOk) {
    console.error(
      '❌ Falhas bloqueantes:',
      JSON.stringify([...coreFailures, ...newHardRegressions], null, 2),
    );
    process.exit(1);
  }

  console.log(
    `✅ Núcleo 100% (${coreCases.length}), sem regressões na suíte difícil e contrato Edge SSE OK.`,
  );
}

main().catch((err) => {
  console.error('❌ Erro fatal ao executar evals:', err);
  process.exit(1);
});
