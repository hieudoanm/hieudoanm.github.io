import { Prisma, PrismaClient } from '@prisma/client';
import axios from 'axios';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export type WordsResponse = {
  query: { limit: string; page: number };
  results: { total: number; data: string[] };
};

const importWord = async (
  prismaClient: PrismaClient,
  wordQuery: string
): Promise<void> => {
  try {
    const baseUrl = `https://www.wordsapi.com/mashape/words/${encodeURIComponent(
      wordQuery
    )}`;
    const encrypted = '8cfdb189e722909be89207bfe958babbaeb2290937f892b8';
    const when = '2023-03-23T06:42:24.775Z';
    const limit = 1000000;
    const url = `${baseUrl}?encrypted=${encrypted}&when=${when}&limit=${limit}`;
    const response = await axios.get<Prisma.WordCreateInput>(url);
    const { data } = response;
    const { word, results, syllables, pronunciation, frequency = 0 } = data;
    const body = { word, results, syllables, pronunciation, frequency };
    console.info(`word=${word}`);
    await prismaClient.word.upsert({
      create: body,
      update: body,
      where: { word },
    });
  } catch (error) {
    console.error(`word=${wordQuery} error`);
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  console.info('Query from DB');
  const wordsFromDB: string[] = (
    await prismaClient.word.findMany({
      select: { word: true },
    })
  ).map(({ word }) => word);
  const wordsSetFromDB = new Set(wordsFromDB);
  console.info('Filter from DB');
  const wordsTxt = readFileSync(
    path.join(__dirname, '../..', './resources/txt/words.txt'),
    'utf-8'
  );
  const words = wordsTxt
    .split('\n')
    .filter((word) => !wordsSetFromDB.has(word));
  const limit = 100;
  const length = words.length;
  console.info(`length=${length}`);
  const pages = Math.ceil(length / limit);
  for (let i = 0; i < pages; i++) {
    const offset = i * limit;
    console.info(`page=${i} offset=${offset} limit=${limit}`);
    const slice: string[] = words.slice(offset, offset + limit);
    // if (slice.length) continue;
    await Promise.all(
      slice.map(async (word) => {
        return await importWord(prismaClient, word);
      })
    );
  }
};

main();
