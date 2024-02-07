import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessTitle } from '@prisma/client';

export type TitledResponse = {
  total: number;
  titles: ChessTitle[];
};

export const getTitled = async (): Promise<TitledResponse> => {
  try {
    const titles: ChessTitle[] = await getPrismaClient().chessTitle.findMany();
    const total: number = titles.length;
    await getPrismaClient().$disconnect();
    return { total, titles };
  } catch (error) {
    logger.error(`getTitled error=${error}`);
    return { total: 0, titles: [] };
  }
};
