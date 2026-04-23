import { jsonResponse, proxyBridge } from './_whatsappBridge.js';

export default async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const upstream = await proxyBridge('/connect', { method: 'POST' });
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
  path: '/api/whatsapp-connect',
};
