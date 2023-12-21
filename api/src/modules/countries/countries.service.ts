import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
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

  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<CountriesDto> {
    try {
      const url: string = 'https://restcountries.com/v3.1/all';
      this.logger.log(`getCountries url=${url}`);
      const response = await this.httpService.axiosRef.get<CountryDto[]>(url);
      const { data: countries } = response;
      const total = countries.length;
      return { total, countries };
    } catch (error) {
      this.logger.error(`getCountries error=${error}`);
      return { total: 0, countries: [] };
    }
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
