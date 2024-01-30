import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Word, Prisma, PrismaClient } from '@prisma/client';

export const getWord = async (word: string): Promise<Word> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const where: Prisma.WordWhereInput = { word };
  const dbWord: Word = await prismaClient.word.findFirstOrThrow({ where });
  return dbWord;
};
