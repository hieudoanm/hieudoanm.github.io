import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Quote, Prisma, PrismaClient } from '@prisma/client';

const buildWhere = ({
  author = '',
  content = '',
  tag = '',
}: {
  author: string;
  content: string;
  tag: string;
}): Prisma.QuoteWhereInput => {
  let where: Prisma.QuoteWhereInput = {};
  if (author)
    where = { ...where, author: { contains: author, mode: 'insensitive' } };
  if (content)
    where = { ...where, content: { contains: content, mode: 'insensitive' } };
  if (tag) where = { ...where, tags: { has: tag } };

  return where;
};

export const getQuotes = async (
  {
    author = '',
    content = '',
    tag = '',
  }: {
    author: string;
    content: string;
    tag: string;
  },
  { limit, offset }: { limit: number; offset: number }
): Promise<{ total: number; quotes: Quote[] }> => {
  const where: Prisma.QuoteWhereInput = buildWhere({ author, content, tag });

  const prismaClient: PrismaClient = getPrismaClient();
  const [total = 0, quotes = []] = await prismaClient.$transaction([
    prismaClient.quote.count({ where }),
    prismaClient.quote.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { content: 'asc' },
    }),
  ]);

  return { total, quotes };
};
