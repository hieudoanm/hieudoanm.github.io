import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { Prisma, Region } from '@prisma/client';
import { CountryDto } from '@hieudoanm/generated/prisma/dto/country.entity';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CountriesResponseDto, CurrenciesResponseDto } from './countries.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaPublicClient: PrismaPublicClient,
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
    timezone,
  }: {
    name: string;
    unMember: boolean;
    region: Region;
    subregion: string;
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
        name: name ? name : undefined,
      };
      this.logger.log('getCountriesFromDB where', where);
      const countries = await this.prismaPublicClient.country.findMany({
        where,
        include: { organizations: true },
      });
      const regions: Region[] = (
        await this.prismaPublicClient.country.findMany({
          where,
          distinct: 'region',
          select: { region: true },
          orderBy: { region: 'asc' },
        })
      ).map(({ region }) => region);
      const subregions: string[] = (
        await this.prismaPublicClient.country.findMany({
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
    timezone,
  }: {
    name?: string;
    unMember?: boolean;
    region?: Region;
    subregion?: string;
    timezone?: string;
  }): Promise<CountriesResponseDto> {
    const key: string = `countries-${name}-${region}-${subregion}-${timezone}`;
    this.logger.log(
      `getCountries name=${name} region=${region} subregion=${subregion} timezone=${timezone}`
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
      timezone,
    });
    const total: number = countries.length;
    const countriesResponse = { total, regions, subregions, countries };
    await this.cacheManager.set(key, countriesResponse, 86400);
    return countriesResponse;
  }

  async getCountry(code: string): Promise<CountryDto> {
    return await this.prismaPublicClient.country.findFirstOrThrow({
      where: { cca3: code },
      include: { organizations: true },
    });
  }

  async getCurrencies(): Promise<CurrenciesResponseDto> {
    const currencies = await this.prismaPublicClient.currency.findMany({
      include: { countries: true },
    });
    const total = currencies.length;
    return { total, currencies };
  }
}
