import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import {
  NewsSource,
  NewsSourceCategory,
  NewsSourceCountry,
  NewsSourceLanguage,
  Prisma,
  PrismaClient,
} from '@prisma/client';

export const getNewsSources = async ({
  category,
  country,
  language,
}: {
  category: NewsSourceCategory;
  country: NewsSourceCountry;
  language: NewsSourceLanguage;
}): Promise<{
  total: number;
  categories: NewsSourceCategory[];
  countries: NewsSourceCountry[];
  languages: NewsSourceLanguage[];
  sources: NewsSource[];
}> => {
  let where: Prisma.NewsSourceWhereInput = {};
  if (category) where = { ...where, category };
  if (country) where = { ...where, country };
  if (language) where = { ...where, language };
  const prismaClient: PrismaClient = getPrismaClient();
  const [
    total = 0,
    categories = [],
    countries = [],
    languages = [],
    sources = [],
  ] = await prismaClient.$transaction([
    prismaClient.newsSource.count({ where }),
    prismaClient.newsSource.findMany({
      select: { category: true },
      distinct: 'category',
    }),
    prismaClient.newsSource.findMany({
      select: { country: true },
      distinct: 'country',
    }),
    prismaClient.newsSource.findMany({
      select: { language: true },
      distinct: 'language',
    }),
    prismaClient.newsSource.findMany({ where }),
  ]);
  return {
    total,
    categories: categories.map(({ category }) => category),
    countries: countries.map(({ country }) => country),
    languages: languages.map(({ language }) => language),
    sources,
  };
};
