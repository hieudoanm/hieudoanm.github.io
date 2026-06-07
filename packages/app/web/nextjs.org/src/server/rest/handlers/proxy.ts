import type { Route } from '../types';

const handler: Route['handler'] = async (req, res) => {
  const method = req.method ?? 'GET';

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.status(200).end();
    return;
  }

  const targetUrl = req.query['url'];
  if (!targetUrl || Array.isArray(targetUrl)) {
    res.status(400).json({ error: "Missing 'url' query parameter" });
    return;
  }

  const decodedUrl = decodeURI(targetUrl);

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
    res.status(500).json({
      error: 'Proxy request failed',
      details: (error as Error).message,
    });
    return;
  }

  if (!fetchResponse.ok) {
    res.status(fetchResponse.status).json({ error: 'Proxy response not ok' });
    return;
  }

  const contentType = fetchResponse.headers.get('content-type') ?? '';
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (contentType.includes('application/json')) {
    try {
      const data = await fetchResponse.json();
      res.status(200).json(data);
    } catch (error) {
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
    res.status(500).json({
      error: 'Failed to read text response',
      details: (error as Error).message,
    });
  }
};

export const proxy: Route = {
  method: 'GET',
  path: '/api/rest/proxy',
  description: 'Proxy HTTP requests to a target URL',
  tags: ['Utility'],
  parameters: [
    {
      name: 'url',
      in: 'query',
      required: true,
      type: 'string',
      description: 'Target URL to proxy to',
    },
    {
      name: 'method',
      in: 'query',
      required: false,
      type: 'string',
      description: 'HTTP method (default: GET)',
    },
  ],
  handler,
};
