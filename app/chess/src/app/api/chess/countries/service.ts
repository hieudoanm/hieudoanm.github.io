import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessCountry } from '@prisma/client';

export type CountriesResponse = {
  total: number;
  countries: ChessCountry[];
};

export const getCountries = async (): Promise<CountriesResponse> => {
  const [total = 0, countries = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessCountry.count(),
    getPrismaClient().chessCountry.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  await getPrismaClient().$disconnect();

  return { total, countries };
};
