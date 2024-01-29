import {
  TIME_RANGE_IN_DAYS,
  TIME_RANGE_IN_MILLISECONDS,
} from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { TimeRange } from '@chess/common/types/time';
import {
  ChessPlayer,
  ChessTimeClass,
  ChessTitleAbbreviation,
  Prisma,
} from '@prisma/client';
import { TitledStatsDto } from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const getTitledPlayers = async ({
  title,
  timeRange = 'year',
  countryCode,
}: {
  title: ChessTitleAbbreviation;
  timeRange: TimeRange;
  countryCode?: string;
}): Promise<{ total: number; players: ChessPlayer[] }> => {
  const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get(timeRange) ?? 0;
  const d = new Date(Date.now() - milliseconds);
  const [date] = d.toISOString().split('T');
  const where: Prisma.ChessPlayerWhereInput = {
    title,
    countryCode,
    lastOnline: { gte: `${date}T00:00:00Z` },
  };
  const [total = 0, players = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessPlayer.count({ where }),
    getPrismaClient().chessPlayer.findMany({
      where,
      include: { country: true, stats: true },
      orderBy: [{ username: 'asc' }],
    }),
  ]);
  return {
    total,
    players,
  };
};

const buildAverageRatingQuery = ({
  title,
  timeRange,
  timeClass,
  countryCode,
}: {
  title: string;
  timeRange: TimeRange;
  timeClass: ChessTimeClass;
  countryCode?: string;
}): Prisma.Sql => {
  const days: number = TIME_RANGE_IN_DAYS.get(timeRange) ?? 0;
  const countryWhere = countryCode
    ? `player."countryCode" = '${countryCode}'`
    : 'player."countryCode" IS NOT NULL';
  const query: string = `SELECT AVG(stats."last") AS "average"
FROM chess."ChessStats" AS stats
WHERE stats."last" != 0
AND stats."timeClass" = '${timeClass}'
AND stats."playerId" IN (SELECT player."id"
FROM chess."ChessPlayer" AS player
WHERE player."title" = '${title}'
AND ${countryWhere}
AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day));`;
  logger.info(`buildAverageRatingQuery query=${query}`);
  return Prisma.raw(query);
};

const buildMaxAverageRating = ({
  title,
  timeRange,
  timeClass,
  countryCode,
}: {
  title: string;
  timeRange: TimeRange;
  timeClass: ChessTimeClass;
  countryCode?: string;
}): Prisma.Sql => {
  const days: number = TIME_RANGE_IN_DAYS.get(timeRange) ?? 0;
  const countryWhere = countryCode
    ? `player."countryCode" = '${countryCode}'`
    : 'player."countryCode" IS NOT NULL';
  const query: string = `SELECT MAX(stats."last") AS "max"
FROM chess."ChessStats" AS stats
WHERE stats."last" != 0
AND stats."timeClass" = '${timeClass}'
AND stats."playerId" IN (SELECT player."id"
FROM chess."ChessPlayer" AS player
WHERE player."title" = '${title}'
AND ${countryWhere}
AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day));`;
  logger.info(`buildMaxAverageRating query=${query}`);
  return Prisma.raw(query);
};

export const getTitledStats = async ({
  title,
  timeRange,
  countryCode,
}: {
  title: ChessTitleAbbreviation;
  timeRange: TimeRange;
  countryCode?: string;
}): Promise<TitledStatsDto> => {
  const averageRapidRatingQuery = buildAverageRatingQuery({
    title,
    timeRange,
    timeClass: 'rapid',
    countryCode,
  });
  const maxRapidRatingQuery = buildMaxAverageRating({
    title,
    timeRange,
    timeClass: 'rapid',
    countryCode,
  });
  const averageBlitzRatingQuery = buildAverageRatingQuery({
    title,
    timeRange,
    timeClass: 'blitz',
    countryCode,
  });
  const maxBlitzRatingQuery = buildMaxAverageRating({
    title,
    timeRange,
    timeClass: 'blitz',
    countryCode,
  });
  const averageBulletRatingQuery = buildAverageRatingQuery({
    title,
    timeRange,
    timeClass: 'bullet',
    countryCode,
  });
  const maxBulletRatingQuery = buildMaxAverageRating({
    title,
    timeRange,
    timeClass: 'bullet',
    countryCode,
  });
  const [
    [{ average: averageRapidRating = 0 }],
    [{ max: maxRapidRating = 0 }],
    [{ average: averageBlitzRating = 0 }],
    [{ max: maxBlitzRating = 0 }],
    [{ average: averageBulletRating = 0 }],
    [{ max: maxBulletRating = 0 }],
  ] = await getPrismaClient().$transaction([
    getPrismaClient().$queryRaw<{ average: number }[]>(averageRapidRatingQuery),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxRapidRatingQuery),
    getPrismaClient().$queryRaw<{ average: number }[]>(averageBlitzRatingQuery),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxBlitzRatingQuery),
    getPrismaClient().$queryRaw<{ average: number }[]>(
      averageBulletRatingQuery
    ),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxBulletRatingQuery),
  ]);
  const { total = 0, players = [] } = await getTitledPlayers({
    title,
    timeRange,
    countryCode,
  });
  await getPrismaClient().$disconnect();
  const stats = {
    rapid: {
      average: Number.parseFloat(averageRapidRating?.toFixed(2)),
      max: maxRapidRating,
    },
    blitz: {
      average: Number.parseFloat(averageBlitzRating?.toFixed(2)),
      max: maxBlitzRating,
    },
    bullet: {
      average: Number.parseFloat(averageBulletRating?.toFixed(2)),
      max: maxBulletRating,
    },
  };
  return {
    stats,
    total,
    players,
  };
};
