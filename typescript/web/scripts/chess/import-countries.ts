import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { exit } from 'node:process';

type Country = {
  cca2: string;
  cca3: string;
  flag: string;
  name: { common: string };
};

const main = async () => {
  const prismaClient = new PrismaClient();

  const url = 'https://restcountries.com/v3.1/all';
  const { data: countries = [] } = await axios.get<Country[]>(url);

  for (const country of countries) {
    const {
      cca2,
      cca3,
      flag,
      name: { common: name },
    } = country;
    const body = { cca2, cca3, name, flag };
    console.log({ cca2, cca3, name, flag });
    await prismaClient.country.upsert({
      create: body,
      update: body,
      where: { cca2_cca3: { cca2, cca3 } },
    });
  }
  await prismaClient.$disconnect();

  exit(0);
};

main();
