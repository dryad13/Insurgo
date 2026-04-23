/**
 * /api/chat — server-side proxy to OpenRouter.
 *
 * The API key lives only in the Netlify build environment as OPENROUTER_API_KEY.
 * Never commit the key and never expose it to the client.
 *
 * Request body:  { message: string, history?: [{ role, content }], stream?: boolean }
 * Response:      { reply: string } | { error: string }
 */

const SYSTEM_PROMPT = `You are Insurgo — an AI systems architect.

Insurgo builds autonomous AI systems that replace manual growth operations for
modern businesses. You respond as a thoughtful systems thinker: precise,
structured, never fluffy. When a user describes their business or asks how to
automate something, propose a concrete system architecture in this shape:

- 1–2 sentence diagnosis of the bottleneck
- The system flow (e.g. "Inbound → AI qualification → CRM → booking → follow-up")
- 2–3 bullet outcomes (instant response, higher conversion, etc.)

Keep it under 180 words. Plain text. No headers, no markdown tables.`;

const MAX_HISTORY_ITEMS = 10;
const MAX_CONTENT_LENGTH = 2000;

function normalizeHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  return rawHistory
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({
      role: item?.role === 'assistant' ? 'assistant' : 'user',
      content: typeof item?.content === 'string' ? item.content.trim() : '',
    }))
    .filter((m) => m.content.length > 0)
    .map((m) => ({
      ...m,
      content: m.content.slice(0, MAX_CONTENT_LENGTH),
    }));
}

function buildOpenRouterMessages(message, history) {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: message },
  ];
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'OPENROUTER_API_KEY is not configured on the server.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const history = normalizeHistory(body?.history);
  const useStream = Boolean(body?.stream);
  if (!message) {
    return new Response(JSON.stringify({ error: 'message is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (message.length > MAX_CONTENT_LENGTH) {
    return new Response(
      JSON.stringify({ error: `message too long (${MAX_CONTENT_LENGTH} char max)` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const openRouterPayload = {
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
      max_tokens: 450,
      temperature: 0.6,
      messages: buildOpenRouterMessages(message, history),
      stream: useStream,
    };

    const upstream = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.URL || 'https://insurgo.systems',
          'X-Title': 'Insurgo Systems',
        },
        body: JSON.stringify(openRouterPayload),
      },
    );

    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(
        JSON.stringify({
          error: `upstream ${upstream.status}`,
          detail: text.slice(0, 500),
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (useStream) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      const upstreamReader = upstream.body?.getReader();
      if (!upstreamReader) {
        return new Response(
          JSON.stringify({ error: 'stream not available from upstream' }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }

      const stream = new ReadableStream({
        async start(controller) {
          let buffer = '';
          let finished = false;
          try {
            while (true) {
              const { value, done } = await upstreamReader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });

              let lineBreak = buffer.indexOf('\n');
              while (lineBreak !== -1) {
                const line = buffer.slice(0, lineBreak).trim();
                buffer = buffer.slice(lineBreak + 1);

                if (!line.startsWith('data:')) {
                  lineBreak = buffer.indexOf('\n');
                  continue;
                }

                const payload = line.slice(5).trim();
                if (payload === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  finished = true;
                  controller.close();
                  return;
                }

                try {
                  const parsed = JSON.parse(payload);
                  const delta = parsed?.choices?.[0]?.delta?.content;
                  if (typeof delta === 'string' && delta.length > 0) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`),
                    );
                  }
                } catch {
                  // Ignore malformed chunks and continue streaming.
                }

                lineBreak = buffer.indexOf('\n');
              }
            }
          } catch {
            if (!finished) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    error: 'stream interrupted',
                  })}\n\n`,
                ),
              );
            }
          } finally {
            if (!finished) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            }
          }
        },
      });

      return new Response(stream, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-store, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return new Response(
        JSON.stringify({ error: 'empty response from model' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'request failed',
        detail: String(err?.message || err),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

export const config = {
  path: '/api/chat',
};
