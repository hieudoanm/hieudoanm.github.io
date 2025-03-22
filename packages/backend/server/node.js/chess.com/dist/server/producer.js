'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.startProducerServer = exports.producer = void 0;
const node_fs_1 = require('node:fs');
const node_http_1 = require('node:http');
const node_path_1 = __importDefault(require('node:path'));
const node_url_1 = __importDefault(require('node:url'));
const kafka_1 = require('../clients/kafka');
const prisma_1 = require('../clients/prisma');
const constants_1 = require('../constants/constants');
const chess_client_1 = require('../services/chess.client');
const log_1 = require('../utils/log');
const try_catch_1 = require('../utils/try-catch');
const PUBLIC_DIR = node_path_1.default.join(process.cwd(), 'public');
exports.producer = kafka_1.kafka.producer();
const getContentType = (filePath) => {
  const ext = node_path_1.default.extname(filePath);
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
const getIndex = (request, response) => {
  var _a, _b;
  const parsedUrl = node_url_1.default.parse(
    (_a = request.url) !== null && _a !== void 0 ? _a : '',
    true
  );
  const pathname =
    (_b = parsedUrl.pathname) !== null && _b !== void 0 ? _b : '';
  const filePath = node_path_1.default.join(
    PUBLIC_DIR,
    pathname === '/' ? 'index.html' : pathname
  );
  console.info('GET', filePath);
  (0, node_fs_1.readFile)(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(data);
    }
  });
};
const getTitled = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url = '' } = request;
    const [path, queryString] = url.split('?');
    const query = new URLSearchParams(queryString);
    log_1.logger.info(url, path, query);
    const title = (_a = query.get('title')) !== null && _a !== void 0 ? _a : '';
    const players = yield prisma_1.prismaClient.player.findMany({
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
  });
const postTitled = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { url = '' } = request;
    const [path, queryString] = url.split('?');
    const query = new URLSearchParams(queryString);
    log_1.logger.info(url, path, query);
    yield exports.producer.connect();
    const usernames = new Set();
    const titleMap =
      (_b =
        (_a = query.get('titleMap')) === null || _a === void 0
          ? void 0
          : _a.toLowerCase()) !== null && _b !== void 0
        ? _b
        : 'all';
    const title =
      (_d =
        (_c = query.get('title')) === null || _c === void 0
          ? void 0
          : _c.toUpperCase()) !== null && _d !== void 0
        ? _d
        : '';
    const titles =
      title !== '' ? [title] : constants_1.TITLES_MAP.get(titleMap);
    for (const title of titles) {
      const { data: players = [] } = yield (0, try_catch_1.tryCatch)(
        (0, chess_client_1.getPlayers)(title)
      );
      if (!players) {
        log_1.logger.error(`❌ Error fetching players for title=${title}`);
        continue;
      }
      players.forEach(usernames.add, usernames);
      for (const player of players) {
        yield exports.producer.send({
          topic: 'chess-titled-player',
          messages: [{ value: JSON.stringify({ title, player }) }],
        });
        log_1.logger.info(`✅ Sent player=${player} with title=${title}`);
      }
    }
    yield exports.producer.disconnect();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        total: Array.from(usernames).length,
        usernames: Array.from(usernames),
      })
    );
  });
const producerServer = (0, node_http_1.createServer)((request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { url = '', method } = request;
    const [path] = url.split('?');
    log_1.logger.info(method, url, path);
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
  })
);
const startProducerServer = () => {
  // starts a simple http server locally on port 3000
  producerServer.listen(3000, '127.0.0.1', () => {
    log_1.logger.info('🚀 Producer Server is listening on 127.0.0.1:3000');
  });
};
exports.startProducerServer = startProducerServer;
