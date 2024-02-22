import { PrismaClient, StockHistory } from '@prisma/client';

const average = (numbers: number[]): number => {
  const sum: number = numbers.reduce(
    (previous, current) => previous + current,
    0
  );
  const total: number = numbers.length;
  return sum / total;
};

const ma = (number: number) => (end: number, history: StockHistory[]) => {
  const start = end - number;
  const slice = history.slice(start, end);
  if (slice.length < number) return null;
  return average(slice.map(({ close }) => close!));
};

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
        end: number,
        history: StockHistory[]
      ) => {
        const { symbol, date } = stockHistory;
        const ma50 = ma(50);
        const ma200 = ma(200);
        const where = { symbol_date: { symbol, date } };
        const body = {
          ...stockHistory,
          ma50: ma50(end, history),
          ma200: ma200(end, history),
        };
        const [dateString] = date.toISOString().split('T');
        console.log(
          `symbol=${symbol} date=${dateString} ma50=${ma50(end, history)} ma200=${ma200(end, history)}`
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
