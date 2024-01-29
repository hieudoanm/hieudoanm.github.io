import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessTimeClass, ChessTitleAbbreviation, Prisma } from '@prisma/client';
import { CountryResponse } from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const countTitledPlayers = ({
  title,
  code,
}: {
  title: ChessTitleAbbreviation;
  code: string;
}): Prisma.Sql => {
  const whereTitle = title
    ? `player."title" = '${title}'`
    : 'player."title" IS NOT NULL';
  const query = `SELECT player."title", COUNT(*) as total
FROM chess."ChessPlayer" AS player
WHERE player."countryCode" = '${code}'
AND ${whereTitle}
GROUP BY player."title"
ORDER BY player."title";`;
  return Prisma.raw(query);
};

export const getCountry = async ({
  title,
  code,
}: {
  title: ChessTitleAbbreviation;
  code: string;
}): Promise<CountryResponse> => {
  const whereTitle = title ?? { not: null };
  const where: Prisma.ChessPlayerWhereInput = {
    countryCode: code,
    title: whereTitle,
  };
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
      include: { country: true, stats: true },
      orderBy: { username: 'asc' },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: { timeClass: ChessTimeClass.rapid, last: { gt: 0 } },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: { timeClass: ChessTimeClass.blitz, last: { gt: 0 } },
    }),
    getPrismaClient().chessStats.aggregate({
      _avg: { last: true },
      where: { timeClass: ChessTimeClass.bullet, last: { gt: 0 } },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: { timeClass: ChessTimeClass.rapid, last: { gt: 0 } },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: { timeClass: ChessTimeClass.blitz, last: { gt: 0 } },
    }),
    getPrismaClient().chessStats.aggregate({
      _max: { last: true },
      where: { timeClass: ChessTimeClass.bullet, last: { gt: 0 } },
    }),
    getPrismaClient().$queryRaw<{ title: string; total: number }[]>(
      countTitledPlayers({ code, title })
    ),
  ]);

  await getPrismaClient().$disconnect();

  const stats = {
    rapid: {
      average: averageRapidRating ?? 0,
      max: maxRapidRating ?? 0,
    },
    blitz: {
      average: averageBlitzRating ?? 0,
      max: maxBlitzRating ?? 0,
    },
    bullet: {
      average: averageBulletRating ?? 0,
      max: maxBulletRating ?? 0,
    },
  };

  return {
    stats,
    total,
    titles,
    players,
  };
};
