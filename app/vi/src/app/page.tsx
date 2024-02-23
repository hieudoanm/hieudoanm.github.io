import { Market, Prisma, Sector } from '@prisma/client';
import { BUILD_ENV } from '@vi/common/environments/environments';
import { getPrismaClient } from '@vi/common/prisma/prisma.client';
import { SymbolsTemplate } from '@vi/shared/templates/SymbolsTemplate';
import { NextPage } from 'next';

export type HomePageProperties = {
  searchParams: { market: string; sector: string };
};

const HomePage: NextPage<HomePageProperties> = async ({ searchParams }) => {
  const market: string = searchParams.market ?? undefined;
  const sector: string = searchParams.sector ?? undefined;

  const prismaClient = getPrismaClient();
  let where: Prisma.StockSymbolWhereInput = {};
  if (market) {
    if (market === 'VN30') where = { ...where, vn30: true };
    else if (market === 'HNX30') where = { ...where, hnx30: true };
    else where = { ...where, market: market as Market };
  }
  if (sector) where = { ...where, sector: sector as Sector };

  const stockSymbols = await prismaClient.stockSymbol.findMany({ where });
  await prismaClient.$disconnect();

  return <SymbolsTemplate title="Symbols" stockSymbols={stockSymbols} />;
};

export const dynamic =
  BUILD_ENV === 'static' ? 'force-static' : 'force-dynamic';

export default HomePage;
