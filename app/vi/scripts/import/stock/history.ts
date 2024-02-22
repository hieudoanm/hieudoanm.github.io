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

const main = async () => {
  const prismaClient = new PrismaClient();
  const stockSymbols = await prismaClient.stockSymbol.findMany({
    select: { symbol: true },
  });
  const symbols: string[] = stockSymbols.map(({ symbol }) => symbol);
  symbols.reverse();
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
      const upserts = t.map(async (timestamp: number, index: number) => {
        const [date] = new Date(timestamp * 1000).toISOString().split('T');
        const close = c[index];
        const open = o[index];
        const high = h[index];
        const low = l[index];
        const volume = v[index];
        console.info(
          `symbol="${symbol}" date="${date}" close="${close}" open="${open}" high="${high}" low="${low}" volume="${volume}"`
        );
        const body = {
          symbol,
          date: new Date(date),
          close,
          open,
          high,
          low,
          volume,
        };
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
