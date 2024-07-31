import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

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
  const filename = './src/json/vietnam/vnindex/symbols.json';
  const stocksString = readFileSync(filename, 'utf-8');
  const stocks: { symbol: string }[] = JSON.parse(stocksString);

  const symbols: string[] = stocks.map(({ symbol }) => symbol);
  for (const symbol of symbols) {
    try {
      console.info('symbol', symbol);
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
      const history = t.map((timestamp: number, index: number) => {
        const [date] = new Date(timestamp * 1000).toISOString().split('T');
        const close = c[index];
        const open = o[index];
        const high = h[index];
        const low = l[index];
        const volume = v[index];
        return {
          symbol,
          date,
          close,
          open,
          high,
          low,
          volume,
        };
      });
      const filename = `./src/json/vietnam/vnindex/history/${symbol}.json`;
      writeFileSync(filename, JSON.stringify(history, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
  process.exit(0);
};

main();
