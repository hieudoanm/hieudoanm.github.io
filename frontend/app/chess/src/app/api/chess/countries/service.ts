import { TIME_RANGE_IN_MILLISECONDS } from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { Country } from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export const getCountries = async (): Promise<Country[]> => {
  try {
    const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get('year') ?? 0;
    const d = new Date(Date.now() - milliseconds);
    const [date] = d.toISOString().split('T');
    const countries = await getPrismaClient().chessPlayer.groupBy({
      by: ['countryCode'],
      _count: { countryCode: true },
      orderBy: { countryCode: 'asc' },
      where: { title: { not: null }, lastOnline: { gte: `${date}T00:00:00Z` } },
    });
    await getPrismaClient().$disconnect();
    return countries.map((country) => ({
      ...country,
      count: country._count.countryCode,
    }));
  } catch (error) {
    logger.error(`getCountries error=${error}`);
    return [];
  }
};
