import { logger } from '@broca/common/log';
import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Language, Prisma, PrismaClient } from '@prisma/client';

export const getLanguages = async ({
  category = 0,
  duolingo = false,
}: {
  category: number;
  duolingo: boolean;
}): Promise<{ total: number; languages: Language[] }> => {
  try {
    let where: Prisma.LanguageWhereInput = {};
    if (category) where = { ...where, category };
    if (duolingo) where = { ...where, duolingo };
    const prismaClient: PrismaClient = getPrismaClient();
    const [total = 0, languages = []] = await prismaClient.$transaction([
      prismaClient.language.count({ where }),
      prismaClient.language.findMany({ where, orderBy: { cca3: 'asc' } }),
    ]);
    return { total, languages };
  } catch (error) {
    logger.error({ category, duolingo }, `getLanguages error=${error}`);
    return { total: 0, languages: [] };
  }
};
