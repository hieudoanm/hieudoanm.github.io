import { createServer } from 'node:http';
import Converter from 'openapi-to-postmanv2';

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

const server = createServer((request, response) => {
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

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'POST' && request.url === '/convert') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      try {
        console.info('Received Data:', body);
        const jsonData = JSON.parse(body); // Parse JSON
        console.info('Received JSON:', jsonData);
        const { openapi = '' } = jsonData;
        const data = await convert(openapi);
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ error: null, data }));
      } catch (error) {
        console.error(error);
        response.writeHead(400, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ error, data: {} }));
      }
    });
  } else {
    response.writeHead(404, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT: number = parseInt(process.env.PORT ?? '10000') ?? 10000;

// starts a simple http server locally on port 3000
server.listen(PORT, '0.0.0.0', () => {
  console.info(`Listening on 0.0.0.0:${PORT}`);
});
