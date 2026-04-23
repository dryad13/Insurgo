const DEFAULT_BRIDGE_URL = 'http://localhost:8787';

function getBaseUrl() {
  return (process.env.WA_BRIDGE_URL || DEFAULT_BRIDGE_URL).replace(/\/+$/, '');
}

export async function proxyBridge(pathname, init = {}) {
  const url = `${getBaseUrl()}${pathname}`;
  const res = await fetch(url, init);
  return res;
}

export function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
