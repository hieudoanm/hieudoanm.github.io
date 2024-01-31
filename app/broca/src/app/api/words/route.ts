import { NextRequest, NextResponse } from 'next/server';
import { getWords } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const word: string = searchParameters.get('word') ?? '';
  const resultsString: string = searchParameters.get('results') ?? '';
  const results = resultsString === 'true';

  const limitString: string = searchParameters.get('limit') ?? '100';
  const limit = Number.parseInt(limitString ?? '100', 10) ?? 0;
  const offsetString: string = searchParameters.get('offset') ?? '0';
  const offset = Number.parseInt(offsetString ?? '0', 10) ?? 0;

  return { word, results, limit, offset };
};

type WordsResponse = {
  total: number;
  limit: number;
  offset: number;
  words: string[];
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<WordsResponse>> => {
  const { searchParams } = new URL(request.url);
  const { word, results, limit, offset } = resolveQuery(searchParams);

  const { total = 0, words = [] } = await getWords(
    { word, results },
    { limit, offset }
  );

  return NextResponse.json<WordsResponse>(
    { total, limit, offset, words },
    { status: 200 }
  );
};
