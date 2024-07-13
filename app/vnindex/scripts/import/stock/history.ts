import { PrismaClient } from '@prisma/client';
import axios from 'axios';

type HistoryResponse = {
  symbol: string;
  t: number[];
  c: number[];
  o: number[];
  h: number[];
  l: number[];
  v: number[];
};

const round = (number: number, digits: number) => {
  return Number.parseFloat(number.toFixed(digits));
};

const main = async () => {
  const prismaClient = new PrismaClient();
  const stockSymbols = await prismaClient.stockSymbol.findMany({
    select: { symbol: true },
    where: { OR: [{ vn30: true }, { hnx30: true }] },
  });
  const symbols: string[] = stockSymbols.map(({ symbol }) => symbol);
  for (const symbol of symbols) {
    try {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('symbol', symbol);
      urlSearchParams.set('resolution', '1D');
      const url = `https://histdatafeed.vps.com.vn/tradingview/history?${urlSearchParams.toString()}`;
      const response = await axios.get<HistoryResponse>(url);
      const { data } = response;
      const t: number[] = data.t;
      const c: number[] = data.c;
      const o: number[] = data.o;
      const h: number[] = data.h;
      const l: number[] = data.l;
      const v: number[] = data.v;
      const upserts = t
        .map((timestamp: number, index: number) => {
          const [date] = new Date(timestamp * 1000).toISOString().split('T');
          const close = c[index];
          const open = o[index];
          const high = h[index];
          const low = l[index];
          const volume = v[index];
          // Money Flow Index
          const mfPrice: number = Number.parseFloat(
            ((high + low + close) / 3).toFixed(2)
          );
          return {
            symbol,
            date: new Date(date),
            close,
            open,
            high,
            low,
            volume,
            mfPrice,
          };
        })
        .map(async (item, index: number, array) => {
          const { symbol, date, mfPrice, volume, close } = item;
          let mf: number = 0;
          let change: number | null = null;
          let changePercentage: number | null = null;
          if (index > 0) {
            const { mfPrice: mfPriceYesterday, close: closeYesterday } =
              array[index - 1];
            const sign = mfPrice > mfPriceYesterday ? 1 : -1;
            mf = volume * mfPrice * sign;
            change = round(close! - closeYesterday!, 2);
            changePercentage = Number.parseFloat(
              ((change / closeYesterday!) * 100).toFixed(2)
            );
          }
          const body = { ...item, mf, change, changePercentage };
          console.log(body);
          const where = { symbol_date: { symbol, date: new Date(date) } };
          return await prismaClient.stockHistory.upsert({
            create: body,
            update: body,
            where,
          });
        });
      await Promise.all(upserts);
    } catch (error) {
      console.error(error);
    }
  }
  process.exit(0);
};

main();
