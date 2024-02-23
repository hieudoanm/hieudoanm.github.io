import { Market, Prisma, Sector } from '@prisma/client';
import { TIME_RANGES, TimeRange } from '@vi/common/constants/time.constants';
import { BUILD_ENV } from '@vi/common/environments/environments';
import { getPrismaClient } from '@vi/common/prisma/prisma.client';
import { IndicatorsTemplate } from '@vi/shared/templates/IndicatorsTemplate';
import { NextPage } from 'next';

export type IndicatorsPageProperties = {
  searchParams: { market: string; sector: string; timeRange: string };
};

const IndicatorsPage: NextPage<IndicatorsPageProperties> = async ({
  searchParams,
}) => {
  const market: string = searchParams.market ?? undefined;
  const sector: string = searchParams.sector ?? undefined;
  const timeRange: TimeRange = (searchParams.timeRange as TimeRange) ?? '3M';
  const timestamp: number = TIME_RANGES[timeRange];

  const prismaClient = getPrismaClient();
  let where: Prisma.StockSymbolWhereInput = {};
  if (market) {
    if (market === 'VN30') where = { ...where, vn30: true };
    else if (market === 'HNX30') where = { ...where, hnx30: true };
    else where = { ...where, market: market as Market };
  }
  if (sector) where = { ...where, sector: sector as Sector };

  const stockHistory = await prismaClient.stockHistory.findMany({
    include: { stock: true },
    orderBy: { symbol: 'asc' },
    where: {
      OR: [
        { goldenCross: true },
        { deathCross: true },
        { bollingerOverbought: true },
        { bollingerOversold: true },
        { mfiOverbought: true },
        { mfiOversold: true },
        { rsiOverbought: true },
        { rsiOversold: true },
      ],
      stock: where,
      date: { gte: new Date(Date.now() - timestamp) },
    },
  });

  return <IndicatorsTemplate stockHistory={stockHistory} />;
};

export const dynamic =
  BUILD_ENV === 'static' ? 'force-static' : 'force-dynamic';

export default IndicatorsPage;
