import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessTimeClass, Prisma } from '@prisma/client';
import { CountryResponse } from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const countTitledPlayers = (countryCode: string): Prisma.Sql => {
  const query = `SELECT player."title", COUNT(*) as total
FROM chess."ChessPlayer" AS player
WHERE player."countryCode" = '${countryCode}'
AND player."title" IS NOT NULL
GROUP BY player."title"
ORDER BY player."title";`;
  return Prisma.raw(query);
};

export const getCountry = async (
  countryCode: string
): Promise<CountryResponse> => {
  const where = { countryCode, title: { not: null } };
  const [
    total = 0,
    players = [],
    {
      _avg: { last: averageRapidRating = 0 },
    },
    {
      _avg: { last: averageBlitzRating = 0 },
    },
    {
      _avg: { last: averageBulletRating = 0 },
    },
    {
      _max: { last: maxRapidRating = 0 },
    },
    {
      _max: { last: maxBlitzRating = 0 },
    },
    {
      _max: { last: maxBulletRating = 0 },
    },
    titles = [],
  ] = await getPrismaClient().$transaction([
    getPrismaClient().chessPlayer.count({ where }),
    getPrismaClient().chessPlayer.findMany({
      where,
      include: { stats: true },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: {
        timeClass: ChessTimeClass.rapid,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: {
        timeClass: ChessTimeClass.blitz,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: {
        timeClass: ChessTimeClass.bullet,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: {
        timeClass: ChessTimeClass.rapid,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: {
        timeClass: ChessTimeClass.blitz,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: {
        timeClass: ChessTimeClass.bullet,
        last: { gt: 0 },
      },
    }),
    getPrismaClient().$queryRaw<{ title: string; total: number }[]>(
      countTitledPlayers(countryCode)
    ),
  ]);

  await getPrismaClient().$disconnect();

  return {
    averageRapidRating: averageRapidRating ?? 0,
    averageBlitzRating: averageBlitzRating ?? 0,
    averageBulletRating: averageBulletRating ?? 0,
    maxRapidRating: maxRapidRating ?? 0,
    maxBlitzRating: maxBlitzRating ?? 0,
    maxBulletRating: maxBulletRating ?? 0,
    total,
    players,
    titles,
  };
};
