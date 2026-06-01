import type { NextApiRequest, NextApiResponse } from 'next';

// ─── CORS Headers ─────────────────────────────────────────────────────────────

function setCorsHeaders(res: NextApiResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Expose-Headers', '*');
}

// ─── Proxy Handler ────────────────────────────────────────────────────────────

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  setCorsHeaders(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const method = req.method ?? 'GET';

  const targetUrl = req.query['url'];
  if (!targetUrl || Array.isArray(targetUrl)) {
    res.status(400).json({ error: "Missing 'url' query parameter" });
    return;
  }

  const decodedUrl = decodeURI(targetUrl);
  console.info(`decodedUrl=${decodedUrl}`);

  let body: string | undefined;

  if (!['GET', 'HEAD'].includes(method)) {
    try {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    } catch {
      body = undefined;
    }
  }

  let fetchResponse: Response;

  try {
    fetchResponse = await fetch(decodedUrl, { method, body });
  } catch (error) {
    console.error(`Proxy request failed: ${(error as Error).message}`);
    res.status(500).json({
      error: 'Proxy request failed',
      details: (error as Error).message,
    });
    return;
  }

  if (!fetchResponse.ok) {
    console.error(`Proxy response not ok: ${fetchResponse.statusText}`);
    res.status(fetchResponse.status).json({ error: 'Proxy response not ok' });
    return;
  }

  const contentType = fetchResponse.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      const data = await fetchResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(
        `Failed to parse JSON response: ${(error as Error).message}`
      );
      res.status(500).json({
        error: 'Failed to parse JSON response',
        details: (error as Error).message,
      });
    }
    return;
  }

  try {
    const text = await fetchResponse.text();
    res.setHeader('Content-Type', contentType || 'text/plain');
    res.status(200).send(text);
  } catch (error) {
    console.error(`Failed to read text response: ${(error as Error).message}`);
    res.status(500).json({
      error: 'Failed to read text response',
      details: (error as Error).message,
    });
  }
}
