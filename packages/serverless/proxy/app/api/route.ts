import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

// ─── CORS Middleware ─────────────────────────────────────────────────────────

app.use('*', async (context, next) => {
  context.header('Access-Control-Allow-Origin', '*');
  context.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  context.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  context.header('Access-Control-Expose-Headers', '*');

  if (context.req.method === 'OPTIONS') {
    return context.body(null, 200);
  }

  await next();
});

// ─── Proxy Route "/" ─────────────────────────────────────────────────────────

app.all('/', async (context) => {
  const method = context.req.method;

  const targetUrl = context.req.query('url');
  if (!targetUrl) {
    return context.json({ error: "Missing 'url' query parameter" }, 400);
  }

  const decodedUrl = decodeURI(targetUrl);
  console.info(`decodedUrl=${decodedUrl}`);

  let body: BodyInit | undefined;

  if (!['GET', 'HEAD'].includes(method)) {
    try {
      body = await context.req.text();
    } catch {
      body = undefined;
    }
  }

  let fetchResponse: Response;

  try {
    fetchResponse = await fetch(decodedUrl, { method, body });
  } catch (error) {
    console.error(`Proxy request failed: ${(error as Error).message}`);
    return context.json(
      { error: 'Proxy request failed', details: (error as Error).message },
      500
    );
  }

  if (!fetchResponse.ok) {
    console.error(`Proxy response not ok: ${fetchResponse.statusText}`);
    return context.json({ error: 'Proxy response not ok' });
  }

  const contentType = fetchResponse.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      const data = await fetchResponse.json();
      return context.json(data);
    } catch (error) {
      console.error(
        `Failed to parse JSON response: ${(error as Error).message}`
      );
      return context.json(
        {
          error: 'Failed to parse JSON response',
          details: (error as Error).message,
        },
        500
      );
    }
  }

  try {
    const text = await fetchResponse.text();
    return context.text(text);
  } catch (error) {
    console.error(`Failed to read text response: ${(error as Error).message}`);
    return context.json(
      {
        error: 'Failed to read text response',
        details: (error as Error).message,
      },
      500
    );
  }
});

// ─── Export handlers ─────────────────────────────────────────────────────────

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
