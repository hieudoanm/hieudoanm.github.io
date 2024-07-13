import { PrismaClient, StockHistory } from '@prisma/client';

const round = (number: number, digits: number) => {
  return Number.parseFloat(number.toFixed(digits));
};

const sum = (numbers: number[]): number => {
  return numbers.reduce((previous, current) => previous + current, 0);
};

const average = (numbers: number[]): number => {
  const total: number = sum(numbers);
  const length: number = numbers.length;
  return round(total / length, 2);
};

const relativeStrengthIndex =
  (days: number) =>
  (end: number, history: StockHistory[]): number => {
    const start = end - days;
    const slice = history.slice(start, end);
    if (slice.length !== days) return 0;
    const changes = slice.map(({ change }) => change!);
    const averageGain = round(
      sum(changes.filter((change) => change > 0)) / days,
      2
    );
    const averageLoss = round(
      sum(changes.filter((change) => change < 0)) / days,
      2
    );
    const relativeStrength = round(averageGain / Math.abs(averageLoss), 2);
    return round(100 - 100 / (1 + relativeStrength), 2);
  };

const moneyFlowIndex =
  (days: number) =>
  (end: number, history: StockHistory[]): number => {
    const start = end - days;
    const slice = history.slice(start, end);
    if (slice.length !== days) return 0;
    const mfs: number[] = slice.map(({ mf }) => mf!);
    const averageGain = round(sum(mfs.filter((mf) => mf > 0)) / days, 2);
    const averageLoss = round(sum(mfs.filter((mf) => mf < 0)) / days, 2);
    const relativeStrength = round(averageGain / Math.abs(averageLoss), 2);
    return round(100 - 100 / (1 + relativeStrength), 2);
  };

const ma =
  (number: number) =>
  (end: number, history: StockHistory[]): number => {
    const start = end - number;
    const slice = history.slice(start, end);
    if (slice.length < number) return 0;
    const closes = slice.map(({ close }) => close!);
    return average(closes);
  };

const standardDeviation =
  (days: number) =>
  (end: number, history: StockHistory[]): number => {
    const start = end - days;
    const slice = history.slice(start, end);
    if (slice.length !== days) return 0;
    const closes = slice.map(({ close }) => close!);
    const mean: number = average(closes);
    return Math.sqrt(
      average(
        closes.reduce(
          (accumulation: number[], value: number) =>
            accumulation.concat((value - mean) ** 2),
          []
        )
      )
    );
  };

const main = async () => {
  const prismaClient = new PrismaClient();
  const stockSymbols = await prismaClient.stockSymbol.findMany({
    select: { symbol: true },
    orderBy: { symbol: 'asc' },
    where: { OR: [{ vn30: true }, { hnx30: true }] },
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
        const { symbol, date, close = 0 } = stockHistory;
        // Bollinger Bands
        const ma30 = ma(30);
        const std30 = standardDeviation(30);
        const std: number = std30(end, history);
        const bollingerMiddleBand: number = ma30(end, history);
        const bollingerUpperBand: number = round(
          bollingerMiddleBand + 2 * std,
          2
        );
        const bollingerLowerBand: number = round(
          bollingerMiddleBand - 2 * std,
          2
        );
        const bollingerOverbought = close! > bollingerUpperBand;
        const bollingerOversold = close! < bollingerLowerBand;
        // Moving Average
        const ma50 = ma(50);
        const ma200 = ma(200);
        // Money Flow Index
        const mfi14 = moneyFlowIndex(14);
        const mfi = mfi14(end, history);
        const mfiOversold = mfi <= 20;
        const mfiOverbought = mfi >= 80;
        // Relative Strength Index
        const rsi14 = relativeStrengthIndex(14);
        const rsi = rsi14(end, history);
        const rsiOversold = rsi <= 30;
        const rsiOverbought = rsi >= 70;
        // Body
        const updatedBody = {
          // Bollinger Bands
          bollingerUpperBand,
          bollingerMiddleBand,
          bollingerLowerBand,
          bollingerOverbought,
          bollingerOversold,
          // Moving Average
          ma50: ma50(end, history),
          ma200: ma200(end, history),
          // Money Flow Index
          mfi,
          mfiOversold,
          mfiOverbought,
          // Relative Strength Index
          rsi,
          rsiOversold,
          rsiOverbought,
        };
        const body = {
          ...stockHistory,
          ...updatedBody,
        };
        const [dateString] = date.toISOString().split('T');
        console.log(`symbol=${symbol} date=${dateString}`, updatedBody);
        const where = { symbol_date: { symbol, date } };
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
