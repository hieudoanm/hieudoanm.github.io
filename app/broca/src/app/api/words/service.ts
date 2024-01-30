import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export const getWords = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}): Promise<{ total: number; words: string[] }> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const [total = 0, words = []] = await prismaClient.$transaction([
    prismaClient.word.count(),
    prismaClient.word.findMany({
      take: limit,
      skip: offset,
      select: { word: true },
      orderBy: { word: 'asc' },
    }),
  ]);
  return { total, words: words.map(({ word }) => word) };
};
