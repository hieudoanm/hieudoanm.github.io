
import {CurrenciesInCountriesDto} from './currenciesInCountries.entity'
import {CurrencyHistoryDto} from './currencyHistory.entity'


export class CurrencyDto {
  code: string ;
name: string ;
symbol: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
countries?: CurrenciesInCountriesDto[] ;
history?: CurrencyHistoryDto[] ;
}
