import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessOpening, Prisma, PrismaClient } from '@prisma/client';

export type OpeningsResponse = {
  total: number;
  limit: number;
  offset: number;
  openings: ChessOpening[];
};

export const getOpenings = async (
  {
    eco,
    fen,
  }: {
    eco?: string;
    fen?: string;
  },
  {
    limit = 100,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }
): Promise<OpeningsResponse> => {
  try {
    const prismaClient: PrismaClient = getPrismaClient();
    let where: Prisma.ChessOpeningWhereInput = { eco };
    if (eco) where = { ...where, eco };
    if (fen) where = { ...where, fen };
    const [total = 0, openings = []] = await prismaClient.$transaction([
      prismaClient.chessOpening.count({ where }),
      prismaClient.chessOpening.findMany({
        where,
        take: limit,
        skip: offset,
      }),
    ]);
    await prismaClient.$disconnect();
    return { total, limit, offset, openings };
  } catch (error) {
    logger.error(`getOpenings error=${error}`);
    return { total: 0, openings: [], limit, offset };
  }
};
