import { TIME_RANGE_IN_MILLISECONDS } from '@chess/common/constants/time.constants';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { ChessTitle, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url: string = request.url;
  const [_, queryString] = url.split('?');
  const title: ChessTitle = resolveQuery<ChessTitle>(queryString, 'title');
  const country: string = resolveQuery(queryString, 'country');

  const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get('year') ?? 0;
  const d = new Date(Date.now() - milliseconds);
  const [date] = d.toISOString().split('T');
  const mainWhere: Prisma.ChessPlayerWhereInput = {
    isStreamer: true,
    lastOnline: { gte: `${date}T00:00:00Z` },
  };
  let where = { ...mainWhere };
  if (title) {
    where = { ...where, title };
  }
  if (country) {
    where = { ...where, countryCode: country };
  }

  const [countries = [], total = 0, players = []] =
    await getPrismaClient().$transaction([
      getPrismaClient().chessPlayer.findMany({
        select: { countryCode: true, country: true },
        distinct: ['countryCode', 'country'],
        where,
        orderBy: { country: 'asc' },
      }),
      getPrismaClient().chessPlayer.count({ where }),
      getPrismaClient().chessPlayer.findMany({
        where,
        include: { stats: true },
        orderBy: [{ followers: 'desc' }],
      }),
    ]);
  return NextResponse.json({ total, countries, players });
};
