import { NextRequest, NextResponse } from 'next/server';
import { getChessGames } from './service';

type PlayersParameters = { params: { username: string } };

export const GET = (
  request: NextRequest,
  { params }: PlayersParameters
): NextResponse => {
  const username: string = params?.username ?? '';
  const { searchParams } = new URL(request.url);
  const yearString: string =
    searchParams.get('year') ?? new Date().getFullYear().toString();
  const year: number = Number.parseInt(yearString, 10);
  const monthString: string =
    searchParams.get('month') ?? (new Date().getMonth() + 1).toString();
  const month: number = Number.parseInt(monthString, 10);
  const limitString: string | undefined = searchParams.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined = searchParams.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);
  const response = getChessGames(username, { year, month }, { limit, offset });
  return NextResponse.json(response, { status: 200 });
};
