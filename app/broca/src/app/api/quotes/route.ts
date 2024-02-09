import { URLSearchParams } from 'url';
import { Quote } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getQuotes } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const author: string = searchParameters.get('author') ?? '';
  const content: string = searchParameters.get('content') ?? '';
  const tag: string = searchParameters.get('tag') ?? '';

  const limitString: string = searchParameters.get('limit') ?? '100';
  const limit = Number.parseInt(limitString ?? '100', 10) ?? 0;
  const offsetString: string = searchParameters.get('offset') ?? '0';
  const offset = Number.parseInt(offsetString ?? '0', 10) ?? 0;

  return { author, content, tag, limit, offset };
};

type QuotesResponse = {
  total: number;
  limit: number;
  offset: number;
  quotes: Quote[];
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<QuotesResponse>> => {
  const { searchParams } = new URL(request.url);
  const { author, content, tag, limit, offset } = resolveQuery(searchParams);

  const { total = 0, quotes = [] } = await getQuotes(
    { author, content, tag },
    { limit, offset }
  );

  return NextResponse.json<QuotesResponse>(
    { total, limit, offset, quotes },
    { status: 200 }
  );
};
