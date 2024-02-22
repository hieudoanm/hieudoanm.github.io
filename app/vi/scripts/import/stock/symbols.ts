import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const getSymbols = async () => {
  const url = 'https://bgapidatafeed.vps.com.vn/getlistallstock';
  const response = await axios.get(url);
  const { data } = response;
  return data;
};

const getVN30 = async (): Promise<string[]> => {
  const url = 'https://bgapidatafeed.vps.com.vn/listvn30';
  const response = await axios.get<string[]>(url);
  const { data } = response;
  return data;
};

const getHNX30 = async (): Promise<string[]> => {
  const url = 'https://bgapidatafeed.vps.com.vn/getlistckindex/HNX30';
  const response = await axios.get<string[]>(url);
  const { data } = response;
  return data;
};

const importStock = async (prismaClient: PrismaClient) => {
  const vn30: string[] = await getVN30();
  const hnx30: string[] = await getHNX30();
  const symbols = await getSymbols();
  for (const {
    stock_code: symbol,
    name_en: name,
    post_to: market,
  } of symbols) {
    const vn30flag: boolean = vn30.includes(symbol);
    const hnx30flag: boolean = hnx30.includes(symbol);
    console.info(
      `symbol="${symbol}" market="${market}" vn30="${vn30flag}" hnx30="${hnx30flag}" name="${name}"`
    );
    if (symbol.length > 3) continue;
    const body = {
      symbol,
      name,
      market,
      vn30: vn30flag,
      hnx30: hnx30flag,
    };
    await prismaClient.stockSymbol.upsert({
      create: body,
      update: body,
      where: { symbol },
    });
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  await importStock(prismaClient);
  process.exit(0);
};

main();
