import {
  TIME_RANGE_IN_DAYS,
  TIME_RANGE_IN_MILLISECONDS,
} from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { TimeRange } from '@chess/common/types/time';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitleAbbreviation,
  Prisma,
} from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type CountryTotal = { countryCode: string; total: number };

export type Stat = {
  average: number;
  max: number;
};

export type Stats = {
  rapid: Stat;
  blitz: Stat;
  bullet: Stat;
};

export type PlayersResponse = {
  total: number;
  limit: number;
  offset: number;
  stats: Stats;
  titles: TitleTotal[];
  countries: CountryTotal[];
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
};

const buildCalculateRatingQuery = (
  sqlFunction: 'AVG' | 'MAX',
  {
    title,
    timeRange,
    timeClass,
    isStreamer,
    countryCode,
  }: {
    countryCode?: string;
    isStreamer?: boolean;
    timeClass?: ChessTimeClass;
    timeRange?: TimeRange;
    title?: ChessTitleAbbreviation;
  }
): Prisma.Sql => {
  // Country
  const whereCountry: string = countryCode
    ? `player."countryCode" = '${countryCode}'`
    : 'player."countryCode" IS NOT NULL';
  // Is Streamer
  const whereIsStreamer: string = isStreamer
    ? `AND player."isStreamer" AND player."twitchUrl" NOT LIKE ''`
    : '';
  // Time Range
  const days: number = timeRange ? TIME_RANGE_IN_DAYS.get(timeRange) ?? 0 : 0;
  const whereLastOnline: string =
    days > 0
      ? `AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day)`
      : '';
  // Title
  const whereTitle: string = title
    ? `player."title" = '${title}'`
    : 'player."title" IS NOT NULL';

  const query: string = `SELECT ${sqlFunction}(stats."last") AS "${sqlFunction.toLowerCase()}"
FROM chess."ChessStats" AS stats
WHERE stats."last" != 0
AND stats."timeClass" = '${timeClass}'
AND stats."playerId" IN (SELECT player."id"
FROM chess."ChessPlayer" AS player
WHERE ${whereCountry} AND ${whereTitle} ${whereIsStreamer} ${whereLastOnline}
);`;
  logger.info(`buildAverageRatingQuery query=${query}`);
  return Prisma.raw(query);
};

const getStats = async ({
  title,
  timeRange,
  isStreamer,
  countryCode,
}: {
  countryCode?: string;
  isStreamer?: boolean;
  timeRange?: TimeRange;
  title?: ChessTitleAbbreviation;
}): Promise<Stats> => {
  const options = { title, timeRange, isStreamer, countryCode };
  const averageRapidRatingQuery = buildCalculateRatingQuery('AVG', {
    ...options,
    timeClass: 'rapid',
  });
  const maxRapidRatingQuery = buildCalculateRatingQuery('MAX', {
    ...options,
    timeClass: 'rapid',
  });
  const averageBlitzRatingQuery = buildCalculateRatingQuery('AVG', {
    ...options,
    timeClass: 'blitz',
  });
  const maxBlitzRatingQuery = buildCalculateRatingQuery('MAX', {
    ...options,
    timeClass: 'blitz',
  });
  const averageBulletRatingQuery = buildCalculateRatingQuery('AVG', {
    ...options,
    timeClass: 'bullet',
  });
  const maxBulletRatingQuery = buildCalculateRatingQuery('MAX', {
    ...options,
    timeClass: 'bullet',
  });

  const [
    [{ avg: averageRapidRating = 0 }],
    [{ max: maxRapidRating = 0 }],
    [{ avg: averageBlitzRating = 0 }],
    [{ max: maxBlitzRating = 0 }],
    [{ avg: averageBulletRating = 0 }],
    [{ max: maxBulletRating = 0 }],
  ] = await getPrismaClient().$transaction([
    getPrismaClient().$queryRaw<{ avg: number }[]>(averageRapidRatingQuery),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxRapidRatingQuery),
    getPrismaClient().$queryRaw<{ avg: number }[]>(averageBlitzRatingQuery),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxBlitzRatingQuery),
    getPrismaClient().$queryRaw<{ avg: number }[]>(averageBulletRatingQuery),
    getPrismaClient().$queryRaw<{ max: number }[]>(maxBulletRatingQuery),
  ]);

  return {
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
};

const buildTitledCountQuery = ({
  title,
  timeRange,
  isStreamer,
  countryCode,
}: {
  countryCode?: string;
  isStreamer?: boolean;
  timeRange?: TimeRange;
  title?: ChessTitleAbbreviation;
}): Prisma.Sql => {
  // Country
  const whereCountry: string = countryCode
    ? `player."countryCode" = '${countryCode}'`
    : 'player."countryCode" IS NOT NULL';
  // Is Streamer
  const whereIsStreamer: string = isStreamer
    ? `AND player."isStreamer" AND player."twitchUrl" NOT LIKE ''`
    : '';
  // Time Range
  const days: number = timeRange ? TIME_RANGE_IN_DAYS.get(timeRange) ?? 0 : 0;
  const whereLastOnline: string =
    days > 0
      ? `AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day)`
      : '';
  // Title
  const whereTitle: string = title
    ? `player."title" = '${title}'`
    : 'player."title" IS NOT NULL';

  const query: string = `SELECT player."title", COUNT(*) as total
FROM chess."ChessPlayer" AS player
WHERE ${whereCountry} AND ${whereTitle} ${whereIsStreamer} ${whereLastOnline}
GROUP BY player."title"
ORDER BY player."title";`;
  logger.info(`buildTitledCountQuery query=${query}`);

  return Prisma.raw(query);
};

export const getPlayers = async (
  {
    isStreamer = false,
    countryCode,
    title,
    timeClass = 'blitz',
    timeRange,
  }: {
    isStreamer?: boolean;
    countryCode?: string;
    title?: ChessTitleAbbreviation;
    timeClass?: ChessTimeClass;
    timeRange?: TimeRange;
  },
  {
    limit = 100,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }
): Promise<PlayersResponse> => {
  let playerWhere: Prisma.ChessPlayerWhereInput = {};
  if (countryCode) playerWhere = { ...playerWhere, countryCode };
  // eslint-disable-next-line unicorn/no-null
  playerWhere = { ...playerWhere, title: title ?? { not: null } };
  if (isStreamer)
    playerWhere = { ...playerWhere, isStreamer, twitchUrl: { not: '' } };
  if (timeRange) {
    const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get(timeRange) ?? 0;
    const d = new Date(Date.now() - milliseconds);
    const [date] = d.toISOString().split('T');
    playerWhere = { ...playerWhere, lastOnline: { gte: `${date}T00:00:00Z` } };
  }

  const [total = 0, titles = [], players = [], countries = []] =
    await getPrismaClient().$transaction([
      getPrismaClient().chessPlayer.count({ where: playerWhere }),
      getPrismaClient().$queryRaw<TitleTotal[]>(
        buildTitledCountQuery({ countryCode, title, isStreamer, timeRange })
      ),
      getPrismaClient().chessStats.findMany({
        take: limit,
        skip: offset,
        orderBy: { last: 'desc' },
        include: { player: { include: { country: true } } },
        where: { timeClass, player: { ...playerWhere } },
      }),
      getPrismaClient().chessPlayer.groupBy({
        by: ['countryCode'],
        _count: { countryCode: true },
        orderBy: { countryCode: 'asc' },
        where: playerWhere,
      }),
    ]);

  const stats = await getStats({ title, timeRange, countryCode, isStreamer });

  await getPrismaClient().$disconnect();

  return {
    total,
    offset,
    limit,
    stats,
    titles,
    players,
    countries: countries.map((country) => {
      return {
        countryCode: country.countryCode,
        total: (country._count as { countryCode: number })?.countryCode ?? 0,
      };
    }),
  };
};
