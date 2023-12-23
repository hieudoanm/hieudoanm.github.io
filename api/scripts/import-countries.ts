import { DayOfWeek, Region } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { CountryDto } from '../src/generated/country.entity';

const main = async () => {
  const prismaService = new PrismaService();
  const url: string = 'https://restcountries.com/v3.1/all';
  const response = await axios.get<CountryDto[]>(url);
  const { data: countries = [] } = response;
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
      languages,
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
      currencies,
      idd,
      languages,
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
};

main();
