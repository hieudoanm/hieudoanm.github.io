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
exports.addPlayer = void 0;
const log_1 = require('../utils/log');
const prisma_1 = require('../clients/prisma');
const try_catch_1 = require('../utils/try-catch');
const chess_client_1 = require('./chess.client');
const addPlayer = (player) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { data: playerData = {}, error: playerError } = yield (0,
    try_catch_1.tryCatch)((0, chess_client_1.getPlayer)(player));
    if (playerError) {
      log_1.logger.error(
        `❌ Error fetching player=${player} data:`,
        playerError.message
      );
      return;
    }
    const {
      avatar = '',
      player_id: id = 0,
      url = '',
      name = '',
      username = '',
      title = '',
      followers = 0,
      country = '',
      location = '',
      last_online: lastOnline = 0,
      joined = 0,
      status = '',
      is_streamer: isStreamer = false,
      twitch_url: twitchUrl = '',
      verified = false,
      league = '',
    } = playerData !== null && playerData !== void 0 ? playerData : {};
    // Get Stats
    const { data: statsData = {}, error: statsError } = yield (0,
    try_catch_1.tryCatch)((0, chess_client_1.getStats)(player));
    if (statsError) {
      log_1.logger.error(
        `❌ Error fetching player=${player} stats:`,
        statsError.message
      );
      return;
    }
    const {
      chess_rapid: {
        last: {
          rating: chessRapidRatingLast = 0,
          rd: chessRapidRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: chessRapidRatingBest = 0 } = { rating: 0 },
        record: {
          win: chessRapidRecordWin = 0,
          draw: chessRapidRecordDraw = 0,
          loss: chessRapidRecordLoss = 0,
        } = {
          win: 0,
          loss: 0,
          draw: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_blitz: {
        last: {
          rating: chessBlitzRatingLast = 0,
          rd: chessBlitzRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: chessBlitzRatingBest = 0 } = { rating: 0 },
        record: {
          win: chessBlitzRecordWin = 0,
          draw: chessBlitzRecordDraw = 0,
          loss: chessBlitzRecordLoss = 0,
        } = {
          win: 0,
          loss: 0,
          draw: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_bullet: {
        last: {
          rating: chessBulletRatingLast = 0,
          rd: chessBulletRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: chessBulletRatingBest = 0 } = { rating: 0 },
        record: {
          win: chessBulletRecordWin = 0,
          draw: chessBulletRecordDraw = 0,
          loss: chessBulletRecordLoss = 0,
        } = {
          win: 0,
          loss: 0,
          draw: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = statsData !== null && statsData !== void 0 ? statsData : {};
    const upsertData = {
      id,
      avatar,
      url,
      name,
      username,
      title,
      followers,
      country,
      location,
      lastOnline: new Date(lastOnline * 1000),
      joined: new Date(joined * 1000),
      status,
      isStreamer,
      twitchUrl,
      verified,
      league,
      chessRapidRatingLast,
      chessRapidRatingDeviation,
      chessRapidRatingBest,
      chessRapidRecordWin,
      chessRapidRecordDraw,
      chessRapidRecordLoss,
      chessBlitzRatingLast,
      chessBlitzRatingDeviation,
      chessBlitzRatingBest,
      chessBlitzRecordWin,
      chessBlitzRecordDraw,
      chessBlitzRecordLoss,
      chessBulletRatingLast,
      chessBulletRatingDeviation,
      chessBulletRatingBest,
      chessBulletRecordWin,
      chessBulletRecordDraw,
      chessBulletRecordLoss,
    };
    const { error } = yield (0, try_catch_1.tryCatch)(
      prisma_1.prismaClient.player.upsert({
        where: { id },
        update: upsertData,
        create: upsertData,
      })
    );
    if (error) {
      log_1.logger.error(
        `❌ Error upsert player=${player} error:`,
        error.message
      );
    }
    log_1.logger.info(`✅ Upserted player=${player}`);
  });
exports.addPlayer = addPlayer;
