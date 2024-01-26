import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessOpening } from '@prisma/client';

export type OpeningsResponse = { total: number; openings: ChessOpening[] };

export const getOpenings = async (eco?: string): Promise<OpeningsResponse> => {
  const where = { eco };
  const openings: ChessOpening[] =
    await getPrismaClient().chessOpening.findMany({
      where,
    });
  const total: number = openings.length;
  return { total, openings };
};
