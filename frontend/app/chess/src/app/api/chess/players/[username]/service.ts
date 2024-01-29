import { Player, Stats } from '@chess/common/clients/chess.com/chess.dto';
import {
  getArchives,
  getPlayer as getPlayerFromAPI,
  getStats,
} from '@chess/common/clients/chess.com/proxy.client';
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

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export const getPlayer = async (username: string): Promise<ChessPlayer> => {
  logger.info(`getPlayer username=${username}`);
  const where: Prisma.ChessPlayerWhereInput = { username };
  const include: Prisma.ChessPlayerInclude = { country: true, stats: true };
  const player = await getPrismaClient().chessPlayer.findFirst({
    where,
    include,
  });
  if (player !== null) {
    await getPrismaClient().$disconnect();
    return player;
  }
  return syncPlayer(username);
};

export const syncPlayer = async (username: string): Promise<ChessPlayer> => {
  const player = await syncProfile(username);
  const id: number = await syncStats(username, player.id);
  logger.info(`syncPlayer id=${id}`);
  await getPrismaClient().$disconnect();
  return player;
};

const syncProfile = async (username: string): Promise<ChessPlayer> => {
  const player: Player = await getPlayerFromAPI(username);
  const { archives = [] } = await getArchives(username);
  archives.sort((a, b) => (a < b ? 1 : -1));
  const createUpdate = mapProfile(player, archives);

  if (!createUpdate.id) {
    return { id: 0 } as ChessPlayer;
  }

  return getPrismaClient().chessPlayer.upsert({
    create: createUpdate,
    update: createUpdate,
    where: { id: createUpdate.id },
    include: { country: true, stats: true },
  });
};

const mapProfile = (player: Player, archives: string[]) => {
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
  } = player;
  const countryCode: string = countryUrl.split('/').pop() ?? '';
  logger.info(`mapProfile username=${username} countryCode=${countryCode}`);
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
  if (id) {
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
