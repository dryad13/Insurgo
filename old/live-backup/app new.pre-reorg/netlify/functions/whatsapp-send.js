import { jsonResponse, proxyBridge } from './_whatsappBridge.js';

export default async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const to = String(body?.to || '').trim();
  const text = String(body?.text || '').trim();

  if (!to || !text) {
    return jsonResponse({ error: 'to and text are required' }, 400);
  }

  try {
    const upstream = await proxyBridge('/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to, text }),
    });
    const data = await upstream.json();
    return jsonResponse(data, upstream.status);
  } catch (err) {
    return jsonResponse(
      {
        error: 'whatsapp bridge unavailable',
        detail: String(err?.message || err),
      },
      502,
    );
  }
};

export const config = {
  path: '/api/whatsapp-send',
};
