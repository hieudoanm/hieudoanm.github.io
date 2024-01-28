import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessOpening } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export type OpeningsResponse = {
  total: number;
  limit: number;
  offset: number;
  openings: ChessOpening[];
};

export const getOpenings = async ({
  eco,
  limit = 100,
  offset = 0,
}: {
  eco?: string;
  limit?: number;
  offset?: number;
}): Promise<OpeningsResponse> => {
  const where = { eco };
  const openings: ChessOpening[] =
    await getPrismaClient().chessOpening.findMany({
      where,
      take: limit,
      skip: offset,
    });
  const total: number = openings.length;
  await getPrismaClient().$disconnect();
  return { total, limit, offset, openings };
};
