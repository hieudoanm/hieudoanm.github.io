import axios from 'axios';
import { PrismaService } from '../src/common/prisma/prisma.service';

type ForexHistory = {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
};

const main = async () => {
  const prismaService = new PrismaService();
  const url = 'https://api.frankfurter.app/1994-01-04..';
  const response = await axios<ForexHistory>(url);
  const { data } = response;
  const { amount, base, rates } = data;
  const dates = Object.keys(rates);
  for (const date of dates) {
    const dateRates: Record<string, number> = rates[date];
    const codes = Object.keys(dateRates);
    for (const code of codes) {
      const rate = dateRates[code];
      const body = {
        currencyCode: code,
        date: new Date(date),
        rate,
        amount,
        base,
      };
      try {
        await prismaService.currencyHistory.upsert({
          create: body,
          update: body,
          where: {
            currencyCode_date: { currencyCode: code, date: new Date(date) },
          },
        });
        console.info(amount, base, date, code, rate);
      } catch (error) {
        console.error(amount, base, date, code, rate, 'error');
      }
    }
  }
};

main().catch(console.error);
