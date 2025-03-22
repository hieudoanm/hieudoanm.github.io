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
Object.defineProperty(exports, '__esModule', { value: true });
exports.getStats = exports.getPlayer = exports.getPlayers = void 0;
const PROXY_URL = 'https://hieudoanm-reverse-proxy.vercel.app';
const proxy = (url) => `${PROXY_URL}/api?url=${url}`;
const getPlayers = (title) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.chess.com/pub/titled/${title}`;
    const response = yield fetch(proxy(url));
    const data = yield response.json();
    const { players = [] } = data;
    return players;
  });
exports.getPlayers = getPlayers;
const getPlayer = (player) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const playerUrl = `https://api.chess.com/pub/player/${player}`;
    const playerResponse = yield fetch(proxy(playerUrl));
    const playerData = yield playerResponse.json();
    return playerData;
  });
exports.getPlayer = getPlayer;
const getStats = (player) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const statsUrl = `https://api.chess.com/pub/player/${player}/stats`;
    const statsResponse = yield fetch(proxy(statsUrl));
    const statsData = yield statsResponse.json();
    return statsData;
  });
exports.getStats = getStats;
