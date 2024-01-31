import { logger } from '@broca/common/log';
import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Prisma, PrismaClient, Word } from '@prisma/client';

export const getWords = async (
  { word, results = false }: { word: string; results: boolean },
  {
    limit = 100,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }
): Promise<{ total: number; words: string[] }> => {
  const prismaClient: PrismaClient = getPrismaClient();

  logger.info(`getWords word=${word}`);
  let where: Prisma.WordWhereInput = {};
  if (word) where = { ...where, word: { contains: word } };
  if (results) where = { ...where, results: { isEmpty: false } };

  const [total = 0, words = []] = await prismaClient.$transaction([
    prismaClient.word.count({ where }),
    prismaClient.word.findMany({
      where,
      take: limit,
      skip: offset,
      select: { word: true },
      orderBy: { word: 'asc' },
    }),
  ]);
  return { total, words: words.map(({ word }: Word) => word) };
};
