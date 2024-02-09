import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Language, Prisma, PrismaClient } from '@prisma/client';

export const getLanguage = async (code: string): Promise<Language> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const where: Prisma.LanguageWhereInput = { cca3: code };
  const language: Language = await prismaClient.language.findFirstOrThrow({
    where,
  });
  return language;
};
