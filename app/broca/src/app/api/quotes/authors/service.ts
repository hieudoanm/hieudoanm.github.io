import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export const getAuthors = async () => {
  const prismaClient: PrismaClient = getPrismaClient();
  const authorsResponse = await prismaClient.quote.findMany({
    select: { author: true },
    distinct: 'author',
    orderBy: { author: 'asc' },
  });
  const authors = authorsResponse
    .map(({ author }) => author ?? '')
    .filter((author) => author);
  return { total: authors.length, authors: authors };
};
