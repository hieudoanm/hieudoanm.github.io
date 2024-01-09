import { DayOfWeek, Region, PrismaClient } from '@prisma/client';
import axios from 'axios';
import csv from 'csvtojson';

const importCountryNames = async (
  prismaClient: PrismaClient,
  countries = []
) => {
  for (const {
    cca3: countryCode,
    translations = {},
    name: { nativeName = {} },
  } of countries) {
    const nativeCodes: string[] = Object.keys(nativeName);
    for (const [
      languageCode,
      { common = '', official = '' },
    ] of Object.entries<{ common: string; official: string }>(translations)) {
      const native = nativeCodes.includes(languageCode);
      try {
        const body = { languageCode, countryCode, common, official, native };
        await prismaClient.countryName.upsert({
          create: body,
          update: body,
          where: { countryCode_languageCode: { countryCode, languageCode } },
        });
      } catch {
        console.error(
          'Error',
          countryCode,
          languageCode,
          common,
          official,
          native
        );
      }
    }
  }
};

const importCurrencies = async (
  prismaClient: PrismaClient,
  currenciesMap: Record<string, Record<string, string>>
) => {
  console.info('Import Currencies', currenciesMap);
  for (const [code, { name = '', symbol = '' }] of Object.entries(
    currenciesMap
  )) {
    try {
      await prismaClient.currency.upsert({
        create: { code, name, symbol },
        update: { code, name, symbol },
        where: { code },
      });
    } catch {
      console.error(`code=${code} name=${name} symbol=${symbol}`);
    }
  }
};

const importLanguages = async (
  prismaClient: PrismaClient,
  languagesMap: Record<string, string>
) => {
  console.info('Import Languages', languagesMap);
  const file = './data/csv/united-states/languages.csv';
  const categoryLanguages: { language: string; category: string }[] =
    await csv().fromFile(file);
  for (const [code, name] of Object.entries(languagesMap)) {
    const { category = '0' } = categoryLanguages.find(
      ({ language }) => name === language
    ) ?? { category: '0' };
    try {
      await prismaClient.language.upsert({
        create: { code, name, category: parseInt(category) },
        update: { code, name, category: parseInt(category) },
        where: { code },
      });
    } catch {
      console.error(`code=${code} name=${name} category=${category}`);
    }
  }
};

const importCurrenciesAndLanguages = async (
  prismaClient: PrismaClient,
  countries = []
) => {
  for (const {
    cca3: countryCode,
    currencies = {},
    languages = {},
  } of countries) {
    for (const currencyCode of Object.keys(currencies)) {
      await prismaClient.currenciesInCountries.upsert({
        create: { currencyCode, countryCode },
        update: { currencyCode, countryCode },
        where: { currencyCode_countryCode: { currencyCode, countryCode } },
      });
    }
    for (const languageCode of Object.keys(languages)) {
      await prismaClient.languagesInCountries.upsert({
        create: { languageCode, countryCode },
        update: { languageCode, countryCode },
        where: { languageCode_countryCode: { languageCode, countryCode } },
      });
    }
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  const url: string = 'https://restcountries.com/v3.1/all';
  const response = await axios.get(url);
  const { data: countries = [] } = response;
  let currenciesMap: Record<string, Record<string, string>> = {};
  let languagesMap: Record<string, string> = {};
  await prismaClient.city.deleteMany({ where: { capital: true } });
  for (const country of countries) {
    const {
      cca3 = '',
      cca2 = '',
      ccn3 = '',
      region = '',
      subregion = '',
      status = '',
      flag = '',
      startOfWeek = '',
      area = '',
      population = '',
      independent = false,
      unMember = false,
      landlocked = false,
      idd = {},
      demonyms = {},
      maps = {},
      flags = {},
      car = {},
      capitalInfo = {},
      coatOfArms = {},
      postalCode = {},
      timezones = [],
      continents = [],
      latlng = [],
      tld = [],
      capital = [],
      altSpellings = [],
      name: { common = '' },
      currencies = {},
      languages = {},
    } = country;
    currenciesMap = {
      ...currenciesMap,
      ...(currencies as unknown as Record<string, Record<string, string>>),
    };
    languagesMap = {
      ...languagesMap,
      ...(languages as unknown as Record<string, string>),
    };
    const body = {
      name: common,
      cca3,
      cca2,
      ccn3,
      region: region?.toUpperCase() as Region,
      subregion,
      status,
      flag,
      startOfWeek: startOfWeek?.toUpperCase() as DayOfWeek,
      area,
      population,
      independent,
      unMember,
      landlocked,
      demonyms,
      maps,
      flags,
      car,
      coatOfArms,
      postalCode,
      timezones,
      continents,
      latlng,
      tld,
      altSpellings,
    };
    try {
      await prismaClient.country.upsert({
        create: body,
        update: body,
        where: { cca3 },
      });

      const { root = '', suffixes = [] } = idd;
      for (const suffix of suffixes) {
        await prismaClient.callingCode.upsert({
          create: { root, suffix, countryCode: cca3 },
          update: { root, suffix, countryCode: cca3 },
          where: { root_suffix: { root, suffix } },
        });
      }
      for (const city of capital) {
        const { latlng = [] } = capitalInfo;
        const [latitude = 0, longitude = 0] = latlng;
        await prismaClient.city.create({
          data: {
            city,
            state: '',
            countryCode: cca3,
            capital: true,
            latitude,
            longitude,
          },
        });
      }
    } catch {
      console.error('cca3', cca3, 'error');
    }
  }

  await importCountryNames(prismaClient, countries);
  await importCurrencies(prismaClient, currenciesMap);
  await importLanguages(prismaClient, languagesMap);
  await importCurrenciesAndLanguages(prismaClient, countries);
};

main().catch((error) => console.error(error));
