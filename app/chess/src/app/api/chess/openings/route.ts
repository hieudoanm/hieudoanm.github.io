import { NextRequest, NextResponse } from 'next/server';
import { OpeningsResponse, getOpenings } from './service';
import { BUILD_ENV } from '@chess/common/environments/environments';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const eco: string | undefined = searchParameters.get('eco') ?? undefined;
  const limitString: string | undefined =
    searchParameters.get('limit') ?? '100';
  const limit: number = Number.parseInt(limitString, 10);
  const offsetString: string | undefined =
    searchParameters.get('offset') ?? '0';
  const offset: number = Number.parseInt(offsetString, 10);

  return { eco, limit, offset };
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<OpeningsResponse>> => {
  const { searchParams } = new URL(request.url);
  const { eco, limit = 100, offset = 0 } = resolveQuery(searchParams);
  const { total = 0, openings = [] } = await getOpenings({
    eco,
    limit,
    offset,
  });
  return NextResponse.json<OpeningsResponse>(
    { total, limit, offset, openings },
    { status: 200 }
  );
};

export const dynamic =
  BUILD_ENV === 'desktop' ? 'force-static' : 'force-dynamic';
