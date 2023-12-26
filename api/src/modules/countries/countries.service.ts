import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CountriesDto,
  CountryDto,
  CurrenciesDto,
  CurrencyDto,
  LanguageDto,
  LanguagesDto,
} from './countries.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    private readonly httpService: HttpService,
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

  async getCountries(): Promise<CountriesDto> {
    const key: string = 'countries';
    const cacheCountries: CountryDto[] =
      await this.cacheManager.get<CountryDto[]>(key);
    if (cacheCountries) {
      const total: number = cacheCountries.length;
      return { total, countries: cacheCountries };
    }
    const countries: CountryDto[] = await this.getCountriesFromAPI();
    await this.cacheManager.set(key, countries, 86400);
    const total: number = countries.length;
    return { total, countries };
  }

  async getCurrencies(): Promise<CurrenciesDto> {
    const { countries = [] } = await this.getCountries();
    let currenciesMap = {};
    countries.forEach(({ currencies }) => {
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

  async getLanguages(): Promise<LanguagesDto> {
    const { countries = [] } = await this.getCountries();
    let languagesMap = {};
    countries.forEach(({ languages }) => {
      languagesMap = { ...languages, ...languagesMap };
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
