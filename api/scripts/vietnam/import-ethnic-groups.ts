import csv from 'csvtojson';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import { EthnicGroupDto } from '../../src/generated/ethnicGroup.entity';

const main = async () => {
  const prismaService = new PrismaService();
  const file = './scripts/csv/ethnic-groups.csv';
  const ethnicGroups: EthnicGroupDto[] = await csv().fromFile(file);
  await prismaService.ethnicGroup.deleteMany();
  for (const ethnicGroup of ethnicGroups) {
    const { name, group } = ethnicGroup;
    await prismaService.ethnicGroup.create({ data: { name, group } });
  }
};

main().catch((error) => console.error(error));
