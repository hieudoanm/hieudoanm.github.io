import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export const getTags = async () => {
  const prismaClient: PrismaClient = getPrismaClient();
  const tagsResponse = await prismaClient.quote.findMany({
    select: { tags: true },
    distinct: 'tags',
  });
  const tags: string[][] = tagsResponse.map(({ tags }) => tags);
  const flattenTags: string[] = tags.flat();
  const setTags: Set<string> = new Set(flattenTags);
  const uniqueTags: string[] = [...setTags];
  uniqueTags.sort((a, b) => (a > b ? 1 : -1));
  const total: number = uniqueTags.length;
  return { total, tags: uniqueTags };
};
