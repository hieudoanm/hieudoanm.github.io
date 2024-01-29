import { logger } from '@chess/common/libs/logger';
import { TimeRange } from '@chess/common/types/time';
import { ChessTitleAbbreviation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { TitledStatsDto } from './model';
import { getTitledStats } from './service';

type TitleParameters = { params: { title: string } };

export const GET = async (
  request: NextRequest,
  { params }: TitleParameters
): Promise<NextResponse<TitledStatsDto>> => {
  const { searchParams } = new URL(request.url);
  const timeRange: TimeRange =
    (searchParams.get('timeRange') as TimeRange) ?? 'year';
  const countryCode: string | undefined =
    searchParams.get('countryCode') ?? undefined;

  const title: ChessTitleAbbreviation =
    (params.title as ChessTitleAbbreviation) ?? 'GM';

  logger.info(
    `title=${title} countryCode=${countryCode} timeRange=${timeRange}`
  );

  const titleStats = await getTitledStats({ countryCode, timeRange, title });
  return NextResponse.json<TitledStatsDto>(titleStats, { status: 200 });
};
