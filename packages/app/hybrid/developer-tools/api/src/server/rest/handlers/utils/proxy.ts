import type { Route, ApiErrorResponse } from '../../types';

interface ProxyQuery {
  url: string;
  method?: string;
}

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

  const { url: targetUrl, method: queryMethod } =
    req.query as unknown as ProxyQuery;
  if (!targetUrl) {
    const body: ApiErrorResponse = {
      error: 'MissingUrl',
      message: "'url' query parameter is required",
      statusCode: 400,
    };
    res.status(400).json(body);
    return;
  }

  const decodedUrl = decodeURI(targetUrl);
  const fetchMethod = queryMethod ?? method;

  let reqBody: string | undefined;
  if (!['GET', 'HEAD'].includes(fetchMethod)) {
    try {
      reqBody =
        typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    } catch {
      reqBody = undefined;
    }
  }

  let fetchResponse: Response;
  try {
    fetchResponse = await fetch(decodedUrl, {
      method: fetchMethod,
      body: reqBody,
    });
  } catch (error) {
    const body: ApiErrorResponse = {
      error: 'ProxyRequestFailed',
      message: 'Failed to reach the target URL',
      details: (error as Error).message,
      statusCode: 500,
    };
    res.status(500).json(body);
    return;
  }

  if (!fetchResponse.ok) {
    const body: ApiErrorResponse = {
      error: 'ProxyResponseNotOk',
      message: `Target responded with HTTP ${fetchResponse.status}`,
      statusCode: fetchResponse.status,
    };
    res.status(fetchResponse.status).json(body);
    return;
  }

  const contentType = fetchResponse.headers.get('content-type') ?? '';
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (contentType.includes('application/json')) {
    try {
      const data = await fetchResponse.json();
      res.status(200).json(data);
    } catch (error) {
      const body: ApiErrorResponse = {
        error: 'JsonParseFailed',
        message: 'Failed to parse JSON response from target',
        details: (error as Error).message,
        statusCode: 500,
      };
      res.status(500).json(body);
    }
    return;
  }

  try {
    const text = await fetchResponse.text();
    res.setHeader('Content-Type', contentType || 'text/plain');
    res.status(200).send(text);
  } catch (error) {
    const body: ApiErrorResponse = {
      error: 'TextReadFailed',
      message: 'Failed to read response body from target',
      details: (error as Error).message,
      statusCode: 500,
    };
    res.status(500).json(body);
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
  responseSchema: {
    type: 'object',
    description: 'Response from the proxied URL. Shape depends on the target.',
    properties: {},
  },
  handler,
};
