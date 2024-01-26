import { TIME_RANGE_IN_MILLISECONDS } from '@chess/common/constants/time.constants';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessPlayer, ChessStats, ChessTitle, Prisma } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export type PlayersResponse = {
  total: number;
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const getPlayers = async ({
  country,
  title,
}: {
  country?: string;
  title?: ChessTitle;
}): Promise<PlayersResponse> => {
  const milliseconds: number =
    2 * (TIME_RANGE_IN_MILLISECONDS.get('year') ?? 0);
  const d = new Date(Date.now() - milliseconds);
  const [date] = d.toISOString().split('T');
  let where: Prisma.ChessPlayerWhereInput = {
    lastOnline: { gte: `${date}T00:00:00Z` },
  };
  if (title) {
    where = { ...where, title };
  }
  if (country) {
    where = { ...where, countryCode: country };
  }

  const [total = 0, players = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessPlayer.count({ where }),
    getPrismaClient().chessPlayer.findMany({
      where,
      include: { stats: true },
      orderBy: [{ followers: 'desc' }],
    }),
  ]);

  await getPrismaClient().$disconnect();

  return { total, players };
};
