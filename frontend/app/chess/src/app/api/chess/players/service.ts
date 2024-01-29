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

export type PlayersResponse = {
  total: number;
  limit: number;
  offset: number;
  titles: TitleTotal[];
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
  countries: CountryTotal[];
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
  const whereCountry: string = countryCode
    ? `player."countryCode" = '${countryCode}'`
    : 'player."countryCode" IS NOT NULL';
  const whereTitle: string = title
    ? `player."title" = '${title}'`
    : 'player."title" IS NOT NULL';
  const whereIsStreamer: string = isStreamer ? `AND player."isStreamer"` : '';

  const days: number = timeRange ? TIME_RANGE_IN_DAYS.get(timeRange) ?? 0 : 0;
  const whereLastOnline: string =
    days > 0
      ? `AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day)`
      : '';

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
  if (title) playerWhere = { ...playerWhere, title: title ?? { not: null } };
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
        where: { ...playerWhere },
      }),
    ]);

  await getPrismaClient().$disconnect();

  return {
    total,
    offset,
    limit,
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
