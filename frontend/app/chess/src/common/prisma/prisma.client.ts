import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | undefined;

export const getPrismaClient = (): PrismaClient => {
  if (prismaClient !== undefined) return prismaClient;
  prismaClient = new PrismaClient();
  return prismaClient;
};
