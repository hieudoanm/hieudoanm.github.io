
import {CurrencyDto} from './currency.entity'
import {CountryDto} from './country.entity'


export class CurrenciesInCountriesDto {
  currency?: CurrencyDto ;
currencyCode: string ;
country?: CountryDto ;
countryCode: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
