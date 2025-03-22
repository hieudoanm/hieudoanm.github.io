import { readFile } from 'node:fs';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import url from 'node:url';
import { kafka } from '../clients/kafka';
import { prismaClient } from '../clients/prisma';
import { TITLES_MAP } from '../constants/constants';
import { getPlayers } from '../services/chess.client';
import { logger } from '../utils/log';
import { tryCatch } from '../utils/try-catch';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export const producer = kafka.producer();

const getContentType = (filePath: string) => {
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
};

const getIndex = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const parsedUrl = url.parse(request.url ?? '', true);
  const pathname = parsedUrl.pathname ?? '';
  const filePath = path.join(
    PUBLIC_DIR,
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

const getTitled = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { url = '' } = request;
  const [path, queryString] = url.split('?');
  const query = new URLSearchParams(queryString);
  logger.info(url, path, query);
  const title: string = query.get('title') ?? '';
  const players = await prismaClient.player.findMany({
    select: {
      title: true,
      username: true,
      chessRapidRatingBest: true,
      chessRapidRatingDeviation: true,
      chessBlitzRatingBest: true,
      chessBlitzRatingDeviation: true,
      chessBulletRatingBest: true,
      chessBulletRatingDeviation: true,
      lastOnline: true,
    },
    where: {
      id: { gt: 0 },
      title: title === '' ? undefined : title,
      lastOnline: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365) },
      chessRapidRatingDeviation: { gt: 0, lte: 50 },
      chessBlitzRatingDeviation: { gt: 0, lte: 50 },
      chessBulletRatingDeviation: { gt: 0, lte: 50 },
    },
    orderBy: [
      { chessRapidRatingBest: 'desc' },
      { chessBlitzRatingBest: 'desc' },
      { chessBulletRatingBest: 'desc' },
      { username: 'asc' },
    ],
  });

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    JSON.stringify({
      total: players.length,
      players: players,
    })
  );
};

const postTitled = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { url = '' } = request;
  const [path, queryString] = url.split('?');
  const query = new URLSearchParams(queryString);
  logger.info(url, path, query);

  await producer.connect();
  const usernames = new Set();
  const titleMap = query.get('titleMap')?.toLowerCase() ?? 'all';
  const title = query.get('title')?.toUpperCase() ?? '';
  const titles = title !== '' ? [title] : TITLES_MAP.get(titleMap);
  for (const title of titles) {
    const { data: players = [] } = await tryCatch(getPlayers(title));
    if (!players) {
      logger.error(`❌ Error fetching players for title=${title}`);
      continue;
    }
    players.forEach(usernames.add, usernames);
    for (const player of players) {
      await producer.send({
        topic: 'chess-titled-player',
        messages: [{ value: JSON.stringify({ title, player }) }],
      });
      logger.info(`✅ Sent player=${player} with title=${title}`);
    }
  }
  await producer.disconnect();
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    JSON.stringify({
      total: Array.from(usernames).length,
      usernames: Array.from(usernames),
    })
  );
};

const producerServer = createServer(async (request, response) => {
  const { url = '', method } = request;
  const [path] = url.split('?');
  logger.info(method, url, path);

  if (method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (method === 'GET' && (url === '/' || url.includes('favicon'))) {
    getIndex(request, response);
    return;
  }

  if (method === 'GET' && path.startsWith('/api/titled')) {
    getTitled(request, response);
    return;
  }

  if (method === 'POST' && path.startsWith('/api/titled')) {
    postTitled(request, response);
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World!\n');
});

export const startProducerServer = () => {
  // starts a simple http server locally on port 3000
  producerServer.listen(3000, '127.0.0.1', () => {
    logger.info('🚀 Producer Server is listening on 127.0.0.1:3000');
  });
};
