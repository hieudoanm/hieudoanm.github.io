import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessOpening } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

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
