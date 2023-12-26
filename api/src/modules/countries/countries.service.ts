import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Region } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CountryDto } from '../../../src/generated/country.entity';
import {
  CountriesResponseDto,
  CurrenciesResponseDto,
  CurrencyDto,
  LanguageDto,
  LanguagesResponseDto,
} from './countries.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private async getCountriesFromAPI(): Promise<CountryDto[]> {
    try {
      const url: string = 'https://restcountries.com/v3.1/all';
      this.logger.log(`getCountries url=${url}`);
      const response = await this.httpService.axiosRef.get<CountryDto[]>(url);
      const { data: countries } = response;
      return countries;
    } catch (error) {
      this.logger.error(`getCountries error=${error}`);
      return [];
    }
  }

  private async getCountriesFromDB({
    name,
    unMember,
    region,
    subregion,
    language,
    currency,
    timezone,
  }: {
    name: string;
    unMember: boolean;
    region: Region;
    subregion: string;
    language: string;
    currency: string;
    timezone: string;
  }): Promise<{
    regions: Region[];
    subregions: string[];
    countries: CountryDto[];
  }> {
    try {
      const where: Prisma.CountryWhereInput = {
        unMember,
        region,
        subregion,
        timezones: timezone ? { has: timezone } : undefined,
        languages: language ? { path: [language], not: Prisma.DbNull } : {},
        currencies: currency ? { path: [currency], not: Prisma.DbNull } : {},
        name: name ? { path: ['official'], string_contains: name } : undefined,
      };
      this.logger.log('getCountriesFromDB where', where);
      const countries = await this.prismaService.country.findMany({
        where,
        include: { organizations: true },
      });
      const regions: Region[] = (
        await this.prismaService.country.findMany({
          where,
          distinct: 'region',
          select: { region: true },
          orderBy: { region: 'asc' },
        })
      ).map(({ region }) => region);
      const subregions: string[] = (
        await this.prismaService.country.findMany({
          where,
          distinct: 'subregion',
          select: { subregion: true },
          orderBy: { subregion: 'asc' },
        })
      ).map(({ subregion }) => subregion);
      return { regions, subregions, countries };
    } catch (error) {
      this.logger.error(`getCountriesFromDB error=${error}`);
      return { regions: [], subregions: [], countries: [] };
    }
  }

  async getCountries({
    name,
    unMember,
    region,
    subregion,
    language,
    currency,
    timezone,
  }: {
    name?: string;
    unMember?: boolean;
    region?: Region;
    subregion?: string;
    language?: string;
    currency?: string;
    timezone?: string;
  }): Promise<CountriesResponseDto> {
    const key: string = `countries-${name}-${region}-${subregion}-${language}-${currency}-${timezone}`;
    this.logger.log(
      `getCountries name=${name} region=${region} subregion=${subregion} language=${language} currency=${currency} timezone=${timezone}`
    );
    const cacheCountries: CountriesResponseDto =
      await this.cacheManager.get<CountriesResponseDto>(key);
    if (cacheCountries) {
      return cacheCountries;
    }
    const { regions, subregions, countries } = await this.getCountriesFromDB({
      name,
      unMember,
      region,
      subregion,
      language,
      currency,
      timezone,
    });
    const total: number = countries.length;
    const countriesResponse = { total, regions, subregions, countries };
    await this.cacheManager.set(key, countriesResponse, 86400);
    return countriesResponse;
  }

  async getCountry(code: string): Promise<CountryDto> {
    const country = await this.prismaService.country.findFirstOrThrow({
      where: { cca3: code },
      include: { organizations: true },
    });
    return country;
  }

  async getCurrencies(): Promise<CurrenciesResponseDto> {
    const { countries = [] } = await this.getCountries({});
    let currenciesMap = {};
    countries.forEach(({ currencies }: { currencies }) => {
      currenciesMap = { ...currenciesMap, ...currencies };
    });
    const currencies: CurrencyDto[] = Object.keys(currenciesMap).map(
      (code: string) => {
        const currency = currenciesMap[code];
        return { ...currency, code };
      }
    );
    currencies.sort((a, b) => (a.code > b.code ? 1 : -1));
    const total: number = currencies.length;
    return { total, currencies };
  }

  async getLanguages(): Promise<LanguagesResponseDto> {
    const { countries = [] } = await this.getCountries({});
    let languagesMap = {};
    countries.forEach(({ languages }: { languages }) => {
      languagesMap = { ...languagesMap, ...languages };
    });
    const languages: LanguageDto[] = Object.keys(languagesMap).map(
      (code: string) => {
        const language = languagesMap[code];
        return { name: language, code };
      }
    );
    languages.sort((a, b) => (a.code > b.code ? 1 : -1));
    const total: number = languages.length;
    return { total, languages };
  }
}
