import { CountryDto } from './country.entity';
import { CurrencyDto } from './currency.entity';

export class CurrenciesInCountriesDto {
  currency?: CurrencyDto;
  currencyCode: string;
  country?: CountryDto;
  countryCode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
