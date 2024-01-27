import { getGamesByYearAndMonth } from '@chess/common/clients/chess.com/chess.client';
import { NextRequest, NextResponse } from 'next/server';

type GamesParameters = {
  params: { username: string; year: string; month: string };
};

export const GET = async (
  _request: NextRequest,
  { params }: GamesParameters
) => {
  const username: string = params.username ?? '';
  const yearString: string = params.year ?? '0';
  const year: number = Number.parseInt(yearString, 10);
  const monthString: string = params.month ?? '';
  const month: number = Number.parseInt(monthString, 10);
  const games = await getGamesByYearAndMonth(username, year, month);
  return NextResponse.json(games, { status: 200 });
};
