import { DayOfWeek, Region } from '@prisma/client';
import axios from 'axios';
import csv from 'csvtojson';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { CountryDto } from '../src/generated/country.entity';

const main = async () => {
  const prismaService = new PrismaService();
  const url: string = 'https://restcountries.com/v3.1/all';
  const response = await axios.get<CountryDto[]>(url);
  const { data: countries = [] } = response;
  let currenciesMap: Record<string, Record<string, string>> = {};
  let languagesMap: Record<string, string> = {};
  for (const country of countries) {
    const {
      cca3,
      cca2,
      ccn3,
      region,
      subregion,
      status,
      flag,
      startOfWeek,
      area,
      population,
      independent,
      unMember,
      landlocked,
      name,
      currencies,
      idd,
      languages = {},
      translations,
      demonyms,
      maps,
      flags,
      car,
      capitalInfo,
      coatOfArms,
      postalCode,
      timezones,
      continents,
      latlng,
      tld,
      capital,
      altSpellings,
    } = country;
    console.info('cca3', cca3);
    currenciesMap = {
      ...currenciesMap,
      ...(currencies as unknown as Record<string, Record<string, string>>),
    };
    languagesMap = {
      ...languagesMap,
      ...(languages as unknown as Record<string, string>),
    };
    const body = {
      cca3,
      cca2,
      ccn3,
      region: region.toUpperCase() as Region,
      subregion,
      status,
      flag,
      startOfWeek: startOfWeek.toUpperCase() as DayOfWeek,
      area,
      population,
      independent,
      unMember,
      landlocked,
      name,
      idd,
      translations,
      demonyms,
      maps,
      flags,
      car,
      capitalInfo,
      coatOfArms,
      postalCode,
      timezones,
      continents,
      latlng,
      tld,
      capital,
      altSpellings,
    };
    await prismaService.country.upsert({
      create: body,
      update: body,
      where: { cca3 },
    });
  }
  console.info('Import Languages', languagesMap);
  const file = './data/csv/united-states/languages.csv';
  const categoryLanguages: { language: string; category: string }[] =
    await csv().fromFile(file);
  for (const [code, name] of Object.entries(languagesMap)) {
    const { category = '0' } = categoryLanguages.find(
      ({ language }) => name === language
    ) || { category: '0' };
    console.info(`code=${code} name=${name} category=${category}`);
    await prismaService.language.upsert({
      create: { code, name, category: parseInt(category) },
      update: { code, name, category: parseInt(category) },
      where: { code },
    });
  }
  console.info('Import Currencies', currenciesMap);
  for (const [code, { name = '', symbol = '' }] of Object.entries(
    currenciesMap
  )) {
    console.info(`code=${code} name=${name} symbol=${symbol}`);
    await prismaService.currency.upsert({
      create: { code, name, symbol },
      update: { code, name, symbol },
      where: { code },
    });
  }
  console.info('Import Many to Many');
  for (const {
    cca3: countryCode,
    currencies = {},
    languages = {},
  } of countries) {
    for (const currencyCode of Object.keys(currencies)) {
      await prismaService.currenciesInCountries.upsert({
        create: { currencyCode, countryCode },
        update: { currencyCode, countryCode },
        where: { currencyCode_countryCode: { currencyCode, countryCode } },
      });
    }
    for (const languageCode of Object.keys(languages)) {
      await prismaService.languagesInCountries.upsert({
        create: { languageCode, countryCode },
        update: { languageCode, countryCode },
        where: { languageCode_countryCode: { languageCode, countryCode } },
      });
    }
  }
};

main().catch((error) => console.error(error));
