import {
  NewsSource,
  NewsSourceCategory,
  NewsSourceCountry,
  NewsSourceLanguage,
  PrismaClient,
} from '@prisma/client';
import axios from 'axios';

const NEWS_API_KEY = process.env.NEWS_API_KEY ?? '';

const main = async () => {
  const prismaClient = new PrismaClient();
  await prismaClient.$connect();
  const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`;
  const response = await axios.get<{ total: number; sources: NewsSource[] }>(
    url
  );
  const { data } = response;
  const { sources = [] } = data;
  for (const source of sources) {
    const { id, name, description, url, category, country, language } = source;
    console.log('id', id);
    const body: NewsSource = {
      id,
      name,
      description,
      url,
      category: category.toUpperCase() as NewsSourceCategory,
      country: country.toUpperCase() as NewsSourceCountry,
      language: language.toUpperCase() as NewsSourceLanguage,
    };
    await prismaClient.newsSource.upsert({
      create: body,
      update: body,
      where: { id },
    });
  }
};

main().catch((error) => console.error(error));
