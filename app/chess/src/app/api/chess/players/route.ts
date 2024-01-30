import { TimeRange } from '@chess/common/types/time';
import { ChessTitleAbbreviation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { PlayersResponse, getPlayers } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const countryCode: string | undefined =
    searchParameters.get('countryCode') ?? undefined;
  const title: ChessTitleAbbreviation | undefined =
    (searchParameters.get('title') as ChessTitleAbbreviation) ?? undefined;
  const timeRange: TimeRange =
    (searchParameters.get('timeRange') as TimeRange) ?? undefined;
  const isStreamer: boolean | undefined =
    (searchParameters.get('isStreamer') ?? '') === 'true';
  const limitString: string | undefined =
    searchParameters.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined =
    searchParameters.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);

  return {
    isStreamer,
    timeRange,
    countryCode,
    title,
    limit,
    offset,
  };
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<PlayersResponse>> => {
  const { searchParams } = new URL(request.url);
  const { countryCode, timeRange, title, limit, offset, isStreamer } =
    resolveQuery(searchParams);

  const {
    stats,
    total = 0,
    titles = [],
    players = [],
    countries = [],
  } = await getPlayers(
    { isStreamer, countryCode, title, timeRange },
    { limit, offset }
  );
  return NextResponse.json<PlayersResponse>(
    { offset, limit, total, stats, titles, players, countries },
    { status: 200 }
  );
};
