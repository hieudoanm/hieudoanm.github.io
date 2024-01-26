import {
  getArchives,
  getPlayer,
  getStats,
} from '@chess/common/clients/chess.com/chess.client';
import { Player, Stats } from '@chess/common/clients/chess.com/chess.dto';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessLeague,
  ChessPlayer,
  ChessStats,
  ChessStatus,
  ChessTimeClass,
  ChessTitle,
  Prisma,
} from '@prisma/client';
import axios from 'axios';

export const getChessPlayer = async (
  username: string
): Promise<ChessPlayer> => {
  logger.info(`syncChessPlayer username=${username}`);
  const where: Prisma.ChessPlayerWhereInput = { username };
  const player = await getPrismaClient().chessPlayer.findFirst({
    where,
    include: { stats: true },
  });
  if (player !== null) return player;
  return syncChessPlayer(username);
};

export const syncChessPlayer = async (
  username: string
): Promise<ChessPlayer> => {
  const player = await syncProfile(username);
  const id: number = await syncStats(username, player.id);
  logger.info(`syncChessPlayer id=${id}`);
  return player;
};

const syncProfile = async (username: string): Promise<ChessPlayer> => {
  const chessPlayer: Player = await getPlayer(username);
  const archives: string[] = await getArchives(username);
  archives.sort((a, b) => (a < b ? 1 : -1));
  const player = await mapProfile(chessPlayer, archives);

  return getPrismaClient().chessPlayer.upsert({
    create: player,
    update: player,
    where: { id: player.id },
    include: { stats: true },
  });
};

const mapProfile = async (chessPlayer: Player, archives: string[]) => {
  const {
    avatar = '',
    username = '',
    player_id: playerId = 0,
    name = '',
    title = '',
    followers = 0,
    country: countryUrl = '',
    location = '',
    last_online: lastOnline = 0,
    joined = 0,
    status = '',
    is_streamer: isStreamer = false,
    twitch_url: twitchUrl = '',
    verified = false,
    league = '',
  } = chessPlayer;
  const {
    data: { name: country = '', code: countryCode = '' },
  } = await axios.get<{
    name: string;
    code: string;
  }>(countryUrl);
  const d = new Date();
  const lastOnlineDate: Date = new Date(lastOnline * 1000);
  const joinedDate: Date = new Date(joined * 1000);
  return {
    id: playerId,
    avatar,
    name,
    username,
    followers,
    location,
    country,
    countryCode,
    lastOnline: lastOnlineDate,
    joined: joinedDate,
    isStreamer,
    verified,
    twitchUrl,
    status: status as ChessStatus,
    title: title ? (title as ChessTitle) : undefined,
    league: league ? (league as ChessLeague) : undefined,
    archives,
    createdAt: d,
    updatedAt: d,
  };
};

const syncStats = async (username: string, id: number): Promise<number> => {
  const stats = await getStats(username);
  const playerStats = mapStats(stats, id);
  for (const timeClassStats of playerStats) {
    await getPrismaClient().chessStats.upsert({
      create: timeClassStats,
      update: timeClassStats,
      where: {
        playerId_timeClass: {
          playerId: id,
          timeClass: timeClassStats.timeClass,
        },
      },
    });
  }
  return id;
};

const mapStats = (stats: Stats, id: number): ChessStats[] => {
  const {
    chess_daily: {
      last: {
        rating: statsDailyRatingLast = 0,
        rd: statsDailyRatingDeviation = 0,
      } = { rating: 0, rd: 0 },
      best: { rating: statsDailyRatingBest = 0 } = { rating: 0 },
      record: {
        win: statsDailyRecordWin = 0,
        draw: statsDailyRecordDraw = 0,
        loss: statsDailyRecordLoss = 0,
      } = {
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = {
      last: { rating: 0, rd: 0 },
      best: { rating: 0 },
      record: { win: 0, draw: 0, loss: 0 },
    },
    chess_rapid: {
      last: {
        rating: statsRapidRatingLast = 0,
        rd: statsRapidRatingDeviation = 0,
      } = { rating: 0, rd: 0 },
      best: { rating: statsRapidRatingBest = 0 } = { rating: 0 },
      record: {
        win: statsRapidRecordWin = 0,
        draw: statsRapidRecordDraw = 0,
        loss: statsRapidRecordLoss = 0,
      } = {
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = {
      last: { rating: 0, rd: 0 },
      best: { rating: 0 },
      record: { win: 0, draw: 0, loss: 0 },
    },
    chess_blitz: {
      last: {
        rating: statsBlitzRatingLast = 0,
        rd: statsBlitzRatingDeviation = 0,
      } = { rating: 0, rd: 0 },
      best: { rating: statsBlitzRatingBest = 0 } = { rating: 0 },
      record: {
        win: statsBlitzRecordWin = 0,
        draw: statsBlitzRecordDraw = 0,
        loss: statsBlitzRecordLoss = 0,
      } = {
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = {
      last: { rating: 0, rd: 0 },
      best: { rating: 0 },
      record: { win: 0, draw: 0, loss: 0 },
    },
    chess_bullet: {
      last: {
        rating: statsBulletRatingLast = 0,
        rd: statsBulletRatingDeviation = 0,
      } = { rating: 0, rd: 0 },
      best: { rating: statsBulletRatingBest = 0 } = { rating: 0 },
      record: {
        win: statsBulletRecordWin = 0,
        draw: statsBulletRecordDraw = 0,
        loss: statsBulletRecordLoss = 0,
      } = {
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = {
      last: { rating: 0, rd: 0 },
      best: { rating: 0 },
      record: { win: 0, draw: 0, loss: 0 },
    },
  } = stats;
  const d = new Date();
  return [
    {
      playerId: id,
      timeClass: ChessTimeClass.daily,
      best: statsDailyRatingBest,
      last: statsDailyRatingLast,
      deviation: statsDailyRatingDeviation,
      win: statsDailyRecordWin,
      draw: statsDailyRecordDraw,
      loss: statsDailyRecordLoss,
      createdAt: d,
      updatedAt: d,
    },
    {
      playerId: id,
      timeClass: ChessTimeClass.rapid,
      best: statsRapidRatingBest,
      last: statsRapidRatingLast,
      deviation: statsRapidRatingDeviation,
      win: statsRapidRecordWin,
      draw: statsRapidRecordDraw,
      loss: statsRapidRecordLoss,
      createdAt: d,
      updatedAt: d,
    },
    {
      playerId: id,
      timeClass: ChessTimeClass.blitz,
      best: statsBlitzRatingBest,
      last: statsBlitzRatingLast,
      deviation: statsBlitzRatingDeviation,
      win: statsBlitzRecordWin,
      draw: statsBlitzRecordDraw,
      loss: statsBlitzRecordLoss,
      createdAt: d,
      updatedAt: d,
    },
    {
      playerId: id,
      timeClass: ChessTimeClass.bullet,
      best: statsBulletRatingBest,
      last: statsBulletRatingLast,
      deviation: statsBulletRatingDeviation,
      win: statsBulletRecordWin,
      draw: statsBulletRecordDraw,
      loss: statsBulletRecordLoss,
      createdAt: d,
      updatedAt: d,
    },
  ];
};
