import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessCountry, PrismaClient } from '@prisma/client';

export type CountriesResponse = {
  total: number;
  countries: ChessCountry[];
};

export const getCountries = async (): Promise<CountriesResponse> => {
  try {
    const prismaClient: PrismaClient = getPrismaClient();
    const [total = 0, countries = []] = await prismaClient.$transaction([
      prismaClient.chessCountry.count(),
      prismaClient.chessCountry.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);

    await prismaClient.$disconnect();

    return { total, countries };
  } catch (error) {
    logger.error(`getCountries error=${error}`);
    return { total: 0, countries: [] };
  }
};
