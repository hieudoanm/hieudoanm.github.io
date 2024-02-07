import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export type EcosResponse = {
  total: number;
  ecos: string[];
};

export const getECOs = async (): Promise<EcosResponse> => {
  try {
    const prismaClient: PrismaClient = getPrismaClient();
    const ecos = await prismaClient.chessOpening.findMany({
      select: { eco: true },
      distinct: ['eco'],
      orderBy: { eco: 'asc' },
    });
    const total: number = ecos.length;
    await prismaClient.$disconnect();
    return { total, ecos: ecos.map(({ eco }) => eco) };
  } catch (error) {
    logger.error(`getECOs error=${error}`);
    return { total: 0, ecos: [] };
  }
};
