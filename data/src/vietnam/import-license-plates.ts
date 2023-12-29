import csv from 'csvtojson';
import { PrismaClient, LicensePlate } from '@prisma/client';

const main = async () => {
  const prismaService = new PrismaClient();
  const file = './data/csv/vietnam/license-plates.csv';
  const licensePlates: LicensePlate[] = await csv().fromFile(file);
  for (const licensePlate of licensePlates) {
    const { code, name, group } = licensePlate;
    await prismaService.licensePlate.upsert({
      create: { code, name, group },
      update: { code, name, group },
      where: { code },
    });
  }
};

main().catch((error) => console.error(error));
