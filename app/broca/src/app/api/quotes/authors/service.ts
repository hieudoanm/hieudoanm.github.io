import { logger } from '@broca/common/log';
import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export const getAuthors = async () => {
  try {
    const prismaClient: PrismaClient = getPrismaClient();
    const authorsResponse = await prismaClient.quote.findMany({
      select: { author: true },
      distinct: 'author',
      orderBy: { author: 'asc' },
    });
    const authors = authorsResponse
      .map(({ author }: { author: string }) => author ?? '')
      .filter((author: string) => author);
    return { total: authors.length, authors: authors };
  } catch (error) {
    logger.error(`getAuthors error=${error}`);
    return { total: 0, authors: [] };
  }
};
