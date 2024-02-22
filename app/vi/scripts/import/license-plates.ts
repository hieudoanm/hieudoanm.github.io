import { LicensePlate, PrismaClient } from '@prisma/client';
import csv from 'csvtojson';

const main = async () => {
  const prismaClient = new PrismaClient();
  const file = './resources/license-plates.csv';
  const licensePlates: LicensePlate[] = await csv().fromFile(file);
  for (const licensePlate of licensePlates) {
    const { code, name, group } = licensePlate;
    await prismaClient.licensePlate.upsert({
      create: { code, name, group },
      update: { code, name, group },
      where: { code },
    });
  }
};

main().catch((error) => console.error(error));
