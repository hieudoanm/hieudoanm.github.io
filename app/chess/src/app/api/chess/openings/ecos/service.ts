import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { PrismaClient } from '@prisma/client';

export type EcosResponse = {
  total: number;
  ecos: string[];
};

export const getECOs = async (): Promise<EcosResponse> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const ecos = await prismaClient.chessOpening.findMany({
    select: { eco: true },
    distinct: ['eco'],
    orderBy: { eco: 'asc' },
  });
  const total: number = ecos.length;
  await prismaClient.$disconnect();
  return { total, ecos: ecos.map(({ eco }) => eco) };
};
