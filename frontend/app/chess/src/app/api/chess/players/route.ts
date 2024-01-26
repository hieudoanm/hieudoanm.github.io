import { ChessTitle } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { PlayersResponse, getPlayers } from './service';

export const GET = async (
  request: NextRequest
): Promise<NextResponse<PlayersResponse>> => {
  const { searchParams } = new URL(request.url);
  const country: string | undefined = searchParams.get('country') ?? undefined;
  const title: ChessTitle | undefined =
    (searchParams.get('title') as ChessTitle) ?? undefined;
  const limitString: string | undefined = searchParams.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined = searchParams.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);

  const { total = 0, players = [] } = await getPlayers({ country, title });
  return NextResponse.json({ total, offset, limit, players });
};
