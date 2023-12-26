import axios from 'axios';
import { readFileSync } from 'fs';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { WordDto } from '../src/generated/word.entity';

export type WordsResponse = {
  query: { limit: string; page: number };
  results: { total: number; data: string[] };
};

const importWord = async (
  prismaService: PrismaService,
  wordQuery: string
): Promise<void> => {
  try {
    const encrypted = '8cfdb189e722909be89207bfe958babbaeb2290937f892b8';
    const when = '2023-03-23T06:42:24.775Z';
    const limit = 1000000;
    const url = `https://www.wordsapi.com/mashape/words/${wordQuery}?encrypted=${encrypted}&when=${when}&limit=${limit}`;
    const response = await axios.get<WordDto>(url);
    const { data } = response;
    const { word, results, syllables, pronunciation, frequency } = data;
    const body = { word, results, syllables, pronunciation, frequency };
    console.info(`word=${word}`);
    await prismaService.word.upsert({
      create: body,
      update: body,
      where: { word },
    });
  } catch (error) {
    console.error(`word=${wordQuery} error=${error}`);
  }
};

const main = async () => {
  const prismaService = new PrismaService();
  console.info(`Query from DB`);
  const wordsFromDB: string[] = (
    await prismaService.word.findMany({
      select: { word: true },
    })
  ).map(({ word }) => word);
  const wordsSetFromDB = new Set(wordsFromDB);
  console.info(`Filter from DB`);
  const wordsTxt = readFileSync('./scripts/txt/words.txt', 'utf-8');
  const words = wordsTxt.split('\n').filter((word) => {
    return !wordsSetFromDB.has(word);
  });
  words.reverse();
  const limit = 1000;
  const length = words.length;
  console.info(`length=${length}`);
  const pages = Math.ceil(length / limit);
  for (let i = 0; i < pages; i++) {
    const offset = i * limit;
    console.info(`page=${i} offset=${offset} limit=${limit}`);
    const slice: string[] = words.slice(offset, offset + limit);
    await Promise.all(
      slice.map(async (word) => {
        return await importWord(prismaService, word);
      })
    );
  }
};

main();
