import { PrismaClient, StockHistory } from '@prisma/client';

const main = async () => {
  const prismaClient = new PrismaClient();
  const day = 1000 * 60 * 60 * 24;
  // const twoWeeksAgo = Date.now() - day * 14;
  // const oneMonthAgo = Date.now() - day * 30;
  const threeMonthsAgo = Date.now() - day * 90;
  const history: StockHistory[] = await prismaClient.stockHistory.findMany({
    orderBy: { symbol: 'asc' },
    where: {
      goldenCross: true,
      stock: { vn30: true },
      date: { gte: new Date(threeMonthsAgo) },
    },
  });
  console.table(history);
};

main();
