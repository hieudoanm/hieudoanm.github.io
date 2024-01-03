import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const importStock = async (prismaClient: PrismaClient) => {
  const url = 'https://bgapidatafeed.vps.com.vn/getlistallstock';
  const response = await axios.get(url);
  const { data: stock } = response;
  for (const { stock_code: symbol, name_en: name, post_to: market } of stock) {
    console.info(`symbol=${symbol} name=${name} market=${market}`);
    if (symbol.length > 3) continue;
    await prismaClient.stock.upsert({
      create: { symbol, name, market },
      update: { symbol, name, market },
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
