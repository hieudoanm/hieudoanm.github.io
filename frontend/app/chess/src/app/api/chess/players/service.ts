import { getPrismaClient } from '@chess/common/prisma/prisma.client';
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

export type PlayersResponse = {
  total: number;
  limit: number;
  offset: number;
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
};

export const getPlayers = async ({
  isStreamer = false,
  countryCode,
  title,
  limit = 100,
  offset = 0,
  timeClass = 'blitz',
}: {
  isStreamer?: boolean;
  countryCode?: string;
  title?: ChessTitleAbbreviation;
  limit?: number;
  offset?: number;
  timeClass?: ChessTimeClass;
}): Promise<PlayersResponse> => {
  let where: Prisma.ChessPlayerWhereInput = {};
  if (title) where = { ...where, title };
  if (countryCode) where = { ...where, countryCode };
  if (isStreamer) where = { ...where, isStreamer, twitchUrl: { not: '' } };

  const [total = 0, players = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessPlayer.count({ where }),
    getPrismaClient().chessStats.findMany({
      take: limit,
      skip: offset,
      orderBy: { last: 'desc' },
      include: { player: { include: { country: true } } },
      where: { timeClass, player: { ...where } },
    }),
  ]);

  await getPrismaClient().$disconnect();

  return { total, offset, limit, players };
};
