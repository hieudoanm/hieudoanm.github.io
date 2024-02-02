import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import csv from 'csvtojson';

type Country = {
  languages: Record<string, string>;
};

const importFromAPI = async (prismaClient: PrismaClient) => {
  const url = 'https://restcountries.com/v3.1/all';
  const { data: countries = [] } = await axios.get<Country[]>(url);

  let languagesMap: Record<string, string> = {};
  for (const country of countries) {
    const { languages = {} } = country;
    languagesMap = { ...languagesMap, ...languages };
  }

  for (const cca3 in languagesMap) {
    const name = languagesMap[cca3];
    const body = { cca3, name };
    await prismaClient.language.upsert({
      create: body,
      update: body,
      where: { cca3 },
    });
  }
};

const importFromCSV = async (prismaClient: PrismaClient) => {
  const languages = await csv().fromFile('./resources/languages.csv');

  for (const {
    cca3 = '',
    name = '',
    category = '0',
    duolingo = 'false',
  } of languages) {
    console.info({ cca3, name, category, duolingo });
    const body = {
      cca3,
      name,
      category: Number.parseInt(category, 10),
      duolingo: duolingo === 'true',
    };
    await prismaClient.language.upsert({
      create: body,
      update: body,
      where: { cca3 },
    });
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  await importFromAPI(prismaClient);
  await importFromCSV(prismaClient);
};

main();
