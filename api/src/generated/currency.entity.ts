import { CurrenciesInCountriesDto } from './currenciesInCountries.entity';

export class CurrencyDto {
  code: string;
  name: string;
  symbol: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  countries?: CurrenciesInCountriesDto[];
}
