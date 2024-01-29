import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
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
  countries: { countryCode: string }[];
  titles: { title: ChessTitleAbbreviation | null }[];
};

export const getPlayers = async ({
  isStreamer = false,
  countryCode,
  title,
  limit = 100,
  offset = 0,
}: {
  isStreamer?: boolean;
  countryCode?: string;
  title?: ChessTitleAbbreviation;
  limit?: number;
  offset?: number;
}): Promise<PlayersResponse> => {
  let where: Prisma.ChessPlayerWhereInput = {};
  if (title) {
    where = { ...where, title };
  }
  if (countryCode) {
    where = { ...where, countryCode };
  }
  if (isStreamer) {
    where = { ...where, isStreamer, twitchUrl: { not: '' } };
  }
  const [total = 0, players = [], countries = [], titles = []] =
    await getPrismaClient().$transaction([
      getPrismaClient().chessPlayer.count({ where }),
      getPrismaClient().chessStats.findMany({
        take: limit,
        skip: offset,
        orderBy: { last: 'desc' },
        include: { player: { include: { country: true } } },
        where: { timeClass: 'blitz', player: { ...where } },
      }),
      getPrismaClient().chessPlayer.findMany({
        select: { countryCode: true },
        distinct: ['countryCode'],
        orderBy: { countryCode: 'asc' },
      }),
      getPrismaClient().chessPlayer.findMany({
        select: { title: true },
        distinct: ['title'],
        orderBy: { title: 'asc' },
      }),
    ]);

  await getPrismaClient().$disconnect();

  return { total, offset, limit, players, countries, titles };
};
