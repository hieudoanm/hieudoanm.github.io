import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import {
  Prisma,
  PrismaClient,
  TarotCard,
  TarotCardSuit,
  TarotCardType,
} from '@prisma/client';

export const getTarotCards = async ({
  suit,
  type,
}: {
  suit: TarotCardSuit;
  type: TarotCardType;
}): Promise<{
  total: number;
  cards: TarotCard[];
}> => {
  let where: Prisma.TarotCardWhereInput = {};
  if (suit) where = { ...where, suit };
  if (type) where = { ...where, type };
  const prismaClient: PrismaClient = getPrismaClient();
  const [total = 0, cards = []] = await prismaClient.$transaction([
    prismaClient.tarotCard.count({ where }),
    prismaClient.tarotCard.findMany({ where }),
  ]);
  return { total, cards };
};
