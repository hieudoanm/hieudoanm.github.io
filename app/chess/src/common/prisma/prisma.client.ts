import { Prisma, PrismaClient } from '@prisma/client';
import { logger } from '../libs/logger';

let prismaClient: PrismaClient | undefined;

export const getPrismaClient = (): PrismaClient => {
  if (prismaClient !== undefined) return prismaClient;
  prismaClient = new PrismaClient();
  return prismaClient;
};

export const rawQuery = async <T>(query: Prisma.Sql): Promise<T> => {
  try {
    const prismaClient = getPrismaClient();
    return await prismaClient.$queryRaw<T>(query);
  } catch (error) {
    logger.error(`rawQuery error=${error}`);
    return [] as T;
  }
};
