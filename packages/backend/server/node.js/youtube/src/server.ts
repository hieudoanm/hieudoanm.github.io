import { createServer } from 'node:http';
import { createReadStream, createWriteStream } from 'node:fs';
import ytdl from '@distube/ytdl-core';

const download = (
  urlString: string
): Promise<{ id: string | null; filePath: string }> => {
  if (!ytdl.validateURL(urlString)) {
    throw new Error('Invalid URL');
  }
  const url = new URL(urlString);
  // Get query parameters
  const urlSearchParams = new URLSearchParams(url.search);
  // https://www.youtube.com/watch?v=dZs_cLHfnNA&list=RDdZs_cLHfnNA&start_radio=1&ab_channel=HYBELABELS
  const id: string | null = urlSearchParams.get('v');

  const videoStream = ytdl(urlString, { quality: 'highestvideo' });
  const filePath = `./downloads/${id}.mp4`;

  const writeStream = createWriteStream(filePath);

  videoStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.info('Download complete:', filePath);
      resolve({ id, filePath });
    });
    writeStream.on('error', reject);
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

  if (request.method === 'POST' && request.url === '/download') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      try {
        console.info('Received Data:', body);
        const jsonData = JSON.parse(body); // Parse JSON
        console.info('Received JSON:', jsonData);
        const { url: urlString = '' } = jsonData;

        const { id, filePath } = await download(urlString);

        response.writeHead(200, {
          'Content-Type': 'video/mp4',
          'Content-Disposition': `inline; filename="${id}.mp4"`,
        });

        // Create stream and pipe to response
        const fileStream = createReadStream(filePath);
        fileStream.pipe(response);

        fileStream.on('error', (err) => {
          console.error('File streaming error:', err);
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Error streaming video');
        });
      } catch (error) {
        console.error(error);
        response.writeHead(400, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ error }));
      }
    });
  }
});

const PORT: number = parseInt(process.env.PORT ?? '10000') ?? 10000;

// starts a simple http server locally on port 3000
server.listen(PORT, '0.0.0.0', () => {
  console.info(`Listening on 0.0.0.0:${PORT}`);
});
