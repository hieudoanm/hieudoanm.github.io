import { ChessCountry, PrismaClient } from '@prisma/client';
import { writeFileSync } from 'node:fs';

const main = async () => {
  const prismaClient = new PrismaClient();

  const countries: ChessCountry[] = await prismaClient.chessCountry.findMany({
    orderBy: { cca2: 'asc' },
  });

  const flags: Record<string, string> = {};
  const names: Record<string, string> = {};

  for (const country of countries) {
    flags[country.cca2] = country.flag;
    names[country.cca2] = country.name;
  }

  writeFileSync(
    './src/common/json/flags.json',
    JSON.stringify(flags, undefined, 2)
  );
  writeFileSync(
    './src/common/json/names.json',
    JSON.stringify(names, undefined, 2)
  );
};

main();
