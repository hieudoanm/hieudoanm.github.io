import { getPrismaClient } from '@chess/common/prisma/prisma.client';

export type EcosResponse = {
  total: number;
  ecos: string[];
};

export const getECOs = async (): Promise<EcosResponse> => {
  const ecos = await getPrismaClient().chessOpening.findMany({
    select: { eco: true },
    distinct: ['eco'],
    orderBy: { eco: 'asc' },
  });
  const total: number = ecos.length;
  return { total, ecos: ecos.map(({ eco }) => eco) };
};
