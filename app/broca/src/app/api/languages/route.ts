import { URLSearchParams } from 'url';
import { Language } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getLanguages } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const categoryString: string = searchParameters.get('category') ?? '0';
  const category = Number.parseInt(categoryString ?? '0', 10) ?? 0;
  const duolingoString: string = searchParameters.get('duolingo') ?? 'false';
  const duolingo = duolingoString === 'true';

  return { category, duolingo };
};

type LanguagesResponse = { total: number; languages: Language[] };

export const GET = async (
  request: NextRequest
): Promise<NextResponse<LanguagesResponse>> => {
  const { searchParams } = new URL(request.url);
  const { category, duolingo } = resolveQuery(searchParams);

  const { total = 0, languages = [] } = await getLanguages({
    category,
    duolingo,
  });

  return NextResponse.json<LanguagesResponse>(
    { total, languages },
    { status: 200 }
  );
};
