import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { ChessOpening } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type OpeningsResponse = { total: number; openings: ChessOpening[] };

export const GET = async (
  request: NextRequest
): Promise<NextResponse<OpeningsResponse>> => {
  const url: string = request.url;
  const [_, queryString] = url.split('?');
  const eco: string = resolveQuery(queryString, 'eco');
  const where = { eco };
  const openings: ChessOpening[] =
    await getPrismaClient().chessOpening.findMany({ where });
  const total: number = openings.length;
  return NextResponse.json({ total, openings }, { status: 200 });
};
