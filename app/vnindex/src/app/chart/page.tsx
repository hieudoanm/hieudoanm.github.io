import { TIME_RANGES, TimeRange } from '@vi/common/constants/time.constants';
import { BUILD_ENV } from '@vi/common/environments/environments';
import { log } from '@vi/common/log';
import { getPrismaClient } from '@vi/common/prisma/prisma.client';
import { SymbolTemplate } from '@vi/shared/templates/SymbolTemplate';
import { NextPage } from 'next';

export type StockPageProperties = {
  searchParams: { symbol: string; timeRange: string };
};

const StockPage: NextPage<StockPageProperties> = async ({ searchParams }) => {
  const symbol: string = searchParams.symbol ?? 'TCB';
  const timeRange: TimeRange = (searchParams.timeRange as TimeRange) ?? '3M';
  const timestamp: number = TIME_RANGES[timeRange];
  log.info('symbol', symbol);

  const prismaClient = getPrismaClient();
  const stockHistory = await prismaClient.stockHistory.findMany({
    where: { symbol, date: { gte: new Date(Date.now() - timestamp) } },
  });
  await prismaClient.$disconnect();

  return <SymbolTemplate symbol={symbol} stockHistory={stockHistory} />;
};

export const dynamic =
  BUILD_ENV === 'static' ? 'force-static' : 'force-dynamic';

export default StockPage;
