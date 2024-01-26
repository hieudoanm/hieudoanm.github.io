import { TIME_RANGE_IN_MILLISECONDS } from '@chess/common/constants/time.constants';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessPlayer, ChessStats, ChessTitle, Prisma } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export type PlayersResponse = {
  total: number;
  limit: number;
  offset: number;
  players: (ChessStats & { player: ChessPlayer })[];
};

export const getPlayers = async ({
  country,
  title,
  limit = 100,
  offset = 0,
}: {
  country?: string;
  title?: ChessTitle;
  limit?: number;
  offset?: number;
}): Promise<PlayersResponse> => {
  let where: Prisma.ChessPlayerWhereInput = {};
  if (title) {
    where = { ...where, title };
  }
  if (country) {
    where = { ...where, countryCode: country };
  }

  const [total = 0, players = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessPlayer.count({ where }),
    getPrismaClient().chessStats.findMany({
      take: limit,
      skip: offset,
      include: { player: true },
      orderBy: { last: 'desc' },
      where: { timeClass: 'blitz', player: { ...where } },
    }),
  ]);

  await getPrismaClient().$disconnect();

  return { total, offset, limit, players };
};
