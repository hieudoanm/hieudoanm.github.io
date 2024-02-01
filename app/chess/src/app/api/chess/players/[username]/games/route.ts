import { NextRequest, NextResponse } from 'next/server';
import { GamesResponse, SyncedResponse } from './dto';
import { getChessGames, syncGames } from './service';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';

type PlayersParameters = { params: { username: string } };

const resolveQuery = (searchParameters: URLSearchParams) => {
  const d = new Date();
  const yearString: string =
    searchParameters.get('year') ?? d.getFullYear().toString();
  const year: number = Number.parseInt(yearString, 10);
  const monthString: string =
    searchParameters.get('month') ?? (d.getMonth() + 1).toString();
  const month: number = Number.parseInt(monthString, 10);
  const limitString: string | undefined =
    searchParameters.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined =
    searchParameters.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);

  return { year, month, limit, offset };
};

export const GET = async (
  request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<GamesResponse>> => {
  const username: string = params?.username ?? '';
  const { searchParams } = new URL(request.url);
  const { year, month, limit, offset } = resolveQuery(searchParams);

  const response = await getChessGames(username, {
    year,
    month,
    limit,
    offset,
  });
  return NextResponse.json<GamesResponse>(response, { status: 200 });
};

export const POST = async (
  request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<SyncedResponse>> => {
  const username: string = params?.username ?? '';
  const body: { month: number; year: number } = await request.json();
  const { month, year } = body;
  const response = await syncGames(username, { month, year });
  return NextResponse.json<SyncedResponse>(response, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: CHESS_USERNAME }];
};
