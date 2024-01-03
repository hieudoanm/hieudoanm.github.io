import { PrismaClient } from '@prisma/client';
import axios from 'axios';

type Country = {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { common: string; official: string } };
  };
  cca3: string;
};

type TopUniversitiesResponse = {
  score_nodes: { title: string; country: string; city: string; rank: string }[];
};

const getCountries = async (): Promise<Map<string, string>> => {
  const url = 'https://restcountries.com/v3.1/all?fields=cca3,name';
  const response = await axios.get<Country[]>(url);
  const { data: countries } = response;
  const countriesMap: Map<string, string> = new Map<string, string>();
  for (const {
    cca3,
    name: { common, official, nativeName = {} },
  } of countries) {
    const commonKey: string = (common ?? '').toLowerCase().trim();
    const officialKey: string = (official ?? '').toLowerCase().trim();
    countriesMap.set(commonKey, cca3);
    countriesMap.set(officialKey, cca3);
    for (const { common } of Object.values(nativeName)) {
      const commonKey: string = (common ?? '').toLowerCase().trim();
      const officialKey: string = (official ?? '').toLowerCase().trim();
      countriesMap.set(commonKey, cca3);
      countriesMap.set(officialKey, cca3);
    }
  }
  return countriesMap;
};

const main = async () => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('nid', '3897789');
  urlSearchParams.set('page', '0');
  urlSearchParams.set('items_per_page', '1000000');
  const url = `https://www.topuniversities.com/rankings/endpoint?${urlSearchParams.toString()}`;
  const response = await axios.get<TopUniversitiesResponse>(url);
  const {
    data: { score_nodes },
  } = response;
  const prismaService = new PrismaClient();
  await prismaService.$connect();
  const countries = await getCountries();
  for (const {
    title = '',
    country = '',
    city = '',
    rank = '0',
  } of score_nodes) {
    const rankNumber: number = parseInt(rank, 10) ?? 0;
    const countryKey = (country ?? '')
      .toString()
      .toLowerCase()
      .replace('(mainland)', '')
      .replace('sar', '')
      .trim();
    const countryCode: string = countries.get(countryKey) ?? '';
    const university: string = title.trim();
    try {
      const body = {
        rank: rankNumber,
        university,
        city: city.toString(),
        countryCode,
      };
      await prismaService.university.upsert({
        create: body,
        update: body,
        where: { rank: rankNumber },
      });
    } catch (error) {
      console.error(
        `rank=${rankNumber} university=${university} city=${city} countryKey=${countryKey} countryCode=${countryCode}`
      );
    }
  }
};

main();
