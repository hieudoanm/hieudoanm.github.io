import { EthnicGroup, PrismaClient } from '@prisma/client';
import csv from 'csvtojson';

const main = async () => {
  const prismaService = new PrismaClient();
  const file = './scripts/csv/vietnam/ethnic-groups.csv';
  const ethnicGroups: EthnicGroup[] = await csv().fromFile(file);
  await prismaService.ethnicGroup.deleteMany();
  for (const ethnicGroup of ethnicGroups) {
    const { name, group } = ethnicGroup;
    await prismaService.ethnicGroup.create({ data: { name, group } });
  }
};

main().catch((error) => console.error(error));
