import { getGamesByYearAndMonth } from '@chess/common/clients/chess.com/chess.client';
import { GamesResponse } from '@chess/common/clients/chess.com/chess.dto';
import { NextRequest, NextResponse } from 'next/server';

type GamesParameters = {
  params: { username: string; year: string; month: string };
};

export const GET = async (
  _request: NextRequest,
  { params }: GamesParameters
): Promise<NextResponse<GamesResponse>> => {
  const username: string = params.username ?? '';
  const yearString: string = params.year ?? '0';
  const year: number = Number.parseInt(yearString, 10);
  const monthString: string = params.month ?? '';
  const month: number = Number.parseInt(monthString, 10);
  const gamesResponse = await getGamesByYearAndMonth(username, year, month);
  return NextResponse.json<GamesResponse>(gamesResponse, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  const d: Date = new Date();
  const year: string = d.getFullYear().toString();
  const month: string = (d.getMonth() + 1).toString();
  return [{ username: 'hikaru', year, month }];
};
