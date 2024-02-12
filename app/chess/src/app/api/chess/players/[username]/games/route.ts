import { logger } from '@chess/common/libs/logger';
import { ChessTimeClass } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { GamesResponse, SyncedResponse } from './dto';
import { getChessGames, syncGames } from './service';

type PlayersParameters = { params: { username: string } };

const resolveQuery = (searchParameters: URLSearchParams) => {
  // Date Time
  const yearString: string = searchParameters.get('year') ?? '';
  const year: number | undefined = yearString
    ? Number.parseInt(yearString, 10)
    : undefined;
  const monthString: string = searchParameters.get('month') ?? '';
  const month: number | undefined = monthString
    ? Number.parseInt(monthString, 10)
    : undefined;
  // Game
  const timeClass: ChessTimeClass | undefined =
    (searchParameters.get('timeClass') as ChessTimeClass) ?? undefined;
  const timeControl: string | undefined =
    searchParameters.get('timeControl') ?? undefined;
  // Player
  const opponent: string = searchParameters.get('opponent') ?? '';
  // Pagination
  const limitString: string | undefined =
    searchParameters.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined =
    searchParameters.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);

  return { year, month, timeClass, timeControl, opponent, limit, offset };
};

export const GET = async (
  request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<GamesResponse>> => {
  const username: string = params?.username ?? '';
  const { searchParams } = new URL(request.url);
  const { year, month, opponent, limit, offset, timeClass, timeControl } =
    resolveQuery(searchParams);

  const response = await getChessGames(username, {
    year,
    month,
    limit,
    offset,
    opponent,
    timeClass,
    timeControl,
  });
  return NextResponse.json<GamesResponse>(response, { status: 200 });
};

export const POST = async (
  request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<SyncedResponse>> => {
  const username: string = params?.username ?? '';
  const body: { data: string } = await request.json();
  const data = JSON.parse(body.data);
  const { month, year, full = false } = data;
  logger.info(
    `/api/chess/players/${username}/games month=${month} year=${year} full=${full}`
  );
  const response = await syncGames({ username, month, year, full });
  return NextResponse.json<SyncedResponse>(response, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
// export const generateStaticParams = () => {
//   return [{ username: CHESS_USERNAME }];
// };
