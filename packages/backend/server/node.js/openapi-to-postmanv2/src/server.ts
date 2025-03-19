import { readFile } from 'node:fs';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import url from 'node:url';
import Converter from 'openapi-to-postmanv2';

const publicDir = path.join(__dirname, '../public');

const convert = async (openapi: string) => {
  return new Promise((resolve, reject) => {
    Converter.convert(
      { type: 'string', data: openapi },
      {},
      (error, conversionResult) => {
        console.error(error);
        console.log(conversionResult);
        if (!conversionResult.result) {
          reject(new Error(conversionResult.reason));
        } else {
          resolve(conversionResult);
        }
      }
    );
  });
};

const enableCors = (
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
};

const routeIndex = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const parsedUrl = url.parse(request.url ?? '', true);
  const pathname = parsedUrl.pathname ?? '';
  const filePath = path.join(
    publicDir,
    pathname === '/' ? 'index.html' : pathname
  );
  console.info('GET', filePath);
  readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(data);
    }
  });
};

const routeConvert = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', async () => {
    try {
      console.info('Received Data:', body);
      const contentType = request.headers['content-type'] ?? '';
      let data = {};
      if (contentType?.includes('application/json')) {
        data = JSON.parse(body); // Parse JSON
        console.info('Received JSON:', data);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams(body);
        data = Object.fromEntries(params.entries());
        console.info('Received Form:', data);
      }

      const { openapi = '' } = data as { openapi: string };
      const responseData = await convert(openapi);
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ error: null, data: responseData }));
    } catch (error) {
      console.error(error);
      response.writeHead(400, {
        'Content-Type': 'application/json',
      });
      response.end(
        JSON.stringify({ error: (error as Error).message, data: {} })
      );
    }
  });
};

function getContentType(filePath: string) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.ico':
      return 'image/x-icon';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
}

const server = createServer((request, response) => {
  enableCors(response);

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (
    request.method === 'GET' &&
    (request.url === '/' || request.url === '/favicon.svg')
  ) {
    routeIndex(request, response);
    return;
  }

  if (request.method === 'POST' && request.url === '/convert') {
    routeConvert(request, response);
    return;
  }

  response.writeHead(404, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify({ error: 'Not Found' }));
});

const PORT: number = parseInt(process.env.PORT ?? '10000') ?? 10000;

// starts a simple http server locally on port 3000
server.listen(PORT, '0.0.0.0', () => {
  console.info(`Listening on 0.0.0.0:${PORT}`);
});
