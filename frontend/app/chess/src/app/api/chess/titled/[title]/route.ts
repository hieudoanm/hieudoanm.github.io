import { TimeRange } from '@chess/common/types/time';
import { ChessTitle } from '@prisma/client';
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
  const title: ChessTitle = (params.title as ChessTitle) ?? 'GM';
  const titleStats = await getTitledStats({ timeRange, title });
  return NextResponse.json(titleStats, { status: 200 });
};
