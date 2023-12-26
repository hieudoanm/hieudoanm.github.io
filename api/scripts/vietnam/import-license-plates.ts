import csv from 'csvtojson';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import { LicensePlateDto } from 'src/generated/licensePlate.entity';

const main = async () => {
  const prismaService = new PrismaService();
  const file = './scripts/csv/license-plates.csv';
  const licensePlates: LicensePlateDto[] = await csv().fromFile(file);
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
