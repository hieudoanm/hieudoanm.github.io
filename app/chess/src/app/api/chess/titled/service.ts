import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessTitle } from '@prisma/client';

export type TitledResponse = {
  total: number;
  titles: ChessTitle[];
};

export const getTitled = async (): Promise<TitledResponse> => {
  const titles: ChessTitle[] = await getPrismaClient().chessTitle.findMany();
  const total: number = titles.length;
  await getPrismaClient().$disconnect();
  return { total, titles };
};
