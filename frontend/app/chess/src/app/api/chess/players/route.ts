import { TIME_RANGE_IN_MILLISECONDS } from '@chess/common/constants/time.constants';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { ChessPlayer, ChessStats, ChessTitle, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PlayersResponse = {
  total: number;
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<PlayersResponse>> => {
  const url: string = request.url;
  const [_, queryString] = url.split('?');
  const title: ChessTitle = resolveQuery<ChessTitle>(queryString, 'title');
  const country: string = resolveQuery(queryString, 'country');

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
  return NextResponse.json({ total, players });
};
