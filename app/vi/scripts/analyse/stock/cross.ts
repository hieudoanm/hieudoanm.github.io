import { PrismaClient, StockHistory } from '@prisma/client';

const main = async () => {
  const prismaClient = new PrismaClient();
  const stockSymbols = await prismaClient.stockSymbol.findMany({
    select: { symbol: true },
  });
  const symbols: string[] = stockSymbols.map(({ symbol }) => symbol);
  for (const symbol of symbols) {
    const history: StockHistory[] = await prismaClient.stockHistory.findMany({
      orderBy: { date: 'asc' },
      where: { symbol },
    });
    const maHistoryUpserts = history.map(
      async (
        stockHistory: StockHistory,
        index: number,
        history: StockHistory[]
      ) => {
        if (index === 0) {
          return { ...stockHistory, goldenCross: false, deathCross: false };
        }
        const yesterday: StockHistory = history[index - 1];
        const { symbol, date } = stockHistory;
        const { ma50: ma50now = 0, ma200: ma200now = 0 } = stockHistory;
        const { ma50: ma50yesterday = 0, ma200: ma200yesterday = 0 } =
          yesterday;
        const goldenCross: boolean =
          (ma50yesterday ?? 0) < (ma200yesterday ?? 0) &&
          (ma50now ?? 0) > (ma200now ?? 0);
        const deathCross: boolean =
          (ma50yesterday ?? 0) > (ma200yesterday ?? 0) &&
          (ma50now ?? 0) < (ma200now ?? 0);
        const where = { symbol_date: { symbol, date } };
        const body = { ...stockHistory, goldenCross, deathCross };
        const [dateString] = date.toISOString().split('T');
        console.log(
          `symbol=${symbol} date=${dateString} goldenCross=${goldenCross} deathCross=${deathCross}`
        );
        return await prismaClient.stockHistory.upsert({
          create: body,
          update: body,
          where,
        });
      }
    );
    await Promise.all(maHistoryUpserts);
  }
};

main();
