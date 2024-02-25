import {
  NewsSource,
  NewsSourceCategory,
  NewsSourceCountry,
  NewsSourceLanguage,
} from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getNewsSources } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const category: NewsSourceCategory =
    (searchParameters.get('category') as NewsSourceCategory) ?? '';
  const country: NewsSourceCountry =
    (searchParameters.get('country') as NewsSourceCountry) ?? '';
  const language: NewsSourceLanguage =
    (searchParameters.get('language') as NewsSourceLanguage) ?? '';

  return { category, country, language };
};

type NewsSourcesResponse = {
  total: number;
  categories: NewsSourceCategory[];
  countries: NewsSourceCountry[];
  languages: NewsSourceLanguage[];
  sources: NewsSource[];
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<NewsSourcesResponse>> => {
  const { searchParams } = new URL(request.url);
  const { category, country, language } = resolveQuery(searchParams);

  const {
    total = 0,
    categories = [],
    countries = [],
    languages = [],
    sources = [],
  } = await getNewsSources({
    category,
    country,
    language,
  });

  return NextResponse.json<NewsSourcesResponse>(
    { total, categories, countries, languages, sources },
    { status: 200 }
  );
};
