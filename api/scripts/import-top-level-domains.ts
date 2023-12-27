import axios from 'axios';
import { writeFileSync } from 'fs';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { CountryDto } from '../src/generated/country.entity';

const getCountryDomains = async (): Promise<Set<string>> => {
  const url: string = 'https://restcountries.com/v3.1/all';
  const response = await axios.get<CountryDto[]>(url);
  const { data: countries } = response;
  const countryDomains = new Set<string>();
  for (const { tld = [] } of countries) {
    tld.forEach((domain) => {
      countryDomains.add(domain);
    });
  }
  return countryDomains;
};

const getDomains = async () => {
  const url: string = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';
  const response = await axios.get<string>(url);
  const { data } = response;
  writeFileSync('./scripts/txt/top-level-domains.txt', data);
  const domains = data.split('\n');
  domains.shift();
  return domains;
};

const main = async () => {
  const prismaService = new PrismaService();
  const countryDomains = await getCountryDomains();
  const domains = await getDomains();
  await prismaService.topLevelDomain.deleteMany();
  for (const domain of domains) {
    if (!domain) continue;
    const lowerDomain = domain.toLowerCase();
    console.info(`domain=${lowerDomain}`);
    const type = countryDomains.has(`.${lowerDomain}`) ? 'country' : 'generic';
    await prismaService.topLevelDomain.upsert({
      create: { domain: lowerDomain, type },
      update: { domain: lowerDomain, type },
      where: { domain: lowerDomain },
    });
  }
};

main();
