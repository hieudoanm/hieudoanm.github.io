import { createServer } from 'node:http';
import { logger } from '../utils/log';
import { enableCors } from '../utils/server';
import { routes } from './routes/api';
import { getRoute as getIndexRoute } from './routes/get';

const httpServer = createServer((request, response) => {
  enableCors(response);

  const { method = '', url = '' } = request;
  const [path, queryString] = url.split('?');
  const query: URLSearchParams = new URLSearchParams(queryString);
  logger.info({ method, url, path, query });

  if (method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (method === 'GET' && (path === '/' || path.includes('favicon'))) {
    getIndexRoute(request, response);
    return;
  }

  for (const route of routes) {
    const {
      method: routeMethod,
      path: routePath,
      function: routeFunction,
    } = route;
    if (method === routeMethod && path.startsWith(routePath)) {
      routeFunction(request, response);
      return;
    }
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: 'Not Found' }));
});

const PORT: number = parseInt(process.env.PORT ?? '10000') ?? 10000;

export const startHttpServer = (): Promise<void> => {
  return new Promise((resolve) => {
    // starts a simple http server locally on port 10000
    httpServer.listen(PORT, '0.0.0.0', () => {
      const message = `🚀 Server is listening on

- Local (host) : http://localhost:${PORT}
- Local (IP)   : http://127.0.0.1:${PORT}`;

      logger.info(message);
      resolve();
    });
  });
};
