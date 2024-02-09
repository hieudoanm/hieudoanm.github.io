import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Prisma, PrismaClient, TarotCard } from '@prisma/client';

export const getTarotCard = async (id: string): Promise<TarotCard> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const where: Prisma.TarotCardWhereInput = { id };
  const tarotcard: TarotCard = await prismaClient.tarotCard.findFirstOrThrow({
    where,
  });
  return tarotcard;
};
