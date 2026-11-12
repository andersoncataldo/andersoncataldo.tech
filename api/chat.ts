import { AI_SYSTEM_PROMPT, queryOfflineKnowledge } from '../src/data/aiKnowledge';

export const config = {
  runtime: 'edge',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestPayload {
  messages: ChatMessage[];
  lang?: 'pt' | 'en';
}

export default async function handler(req: Request) {
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

  let payload: RequestPayload;
  try {
    payload = await req.json();
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

  const { messages, lang = 'pt' } = payload;
  if (!Array.isArray(messages) || messages.length === 0) {
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

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  // Se não houver chave no ambiente da Vercel, acionar motor de contingência determinístico
  if (!apiKey) {
    const fallbackResponse = queryOfflineKnowledge(lastUserMessage, lang);
    return createStreamResponse(fallbackResponse, 'offline_heuristic');
  }

  try {
    // Montagem do histórico para o Google Gemini REST API
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${AI_SYSTEM_PROMPT}\n\n[IMPORTANTE: Responda no idioma: ${lang === 'en' ? 'Inglês' : 'Português'}]` }],
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido. Sou o Anderson AI e responderei estritamente baseado nos fatos oficiais de carreira de Anderson Cataldo com concisão e precisão.' }],
      },
      ...messages.slice(-6).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!geminiRes.ok || !geminiRes.body) {
      // Degradação elegante sob erro upstream (ex: 429 quota esgotada)
      const fallbackResponse = queryOfflineKnowledge(lastUserMessage, lang);
      return createStreamResponse(fallbackResponse, 'fallback_quota_exceeded');
    }

    // Criar stream de transformação para repassar o texto limpo ao cliente via SSE
    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();
    const encoder = new TextEncoder();
    const reader = geminiRes.body.getReader();
    const decoder = new TextDecoder();

    (async () => {
      let buffer = '';
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
                if (textPart) {
                  await writer.write(encoder.encode(`data: ${JSON.stringify({ text: textPart })}\n\n`));
                }
              } catch {
                // Fragmento JSON parcial
              }
            }
          }
        }
      } catch (err) {
        console.error('Erro no processamento do stream Gemini:', err);
      } finally {
        await writer.write(encoder.encode('data: [DONE]\n\n'));
        await writer.close();
      }
    })();

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Falha geral no proxy de chat:', error);
    const fallbackResponse = queryOfflineKnowledge(lastUserMessage, lang);
    return createStreamResponse(fallbackResponse, 'fallback_offline_exception');
  }
}

/**
 * Cria uma resposta Server-Sent Events simulada para o motor heurístico de contingência
 */
function createStreamResponse(text: string, mode: string): Response {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      // Envia evento de metadados
      controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify({ mode })}\n\n`));

      // Emite o texto em pequenas frações para simular digitação natural
      const words = text.split(' ');
      for (let i = 0; i < words.length; i += 3) {
        const chunk = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '');
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
      }

      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
