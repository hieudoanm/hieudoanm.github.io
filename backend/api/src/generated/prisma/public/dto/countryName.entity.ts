
import {CountryDto} from './country.entity'
import {LanguageDto} from './language.entity'


export class CountryNameDto {
  country?: CountryDto ;
countryCode: string ;
language?: LanguageDto ;
languageCode: string ;
common: string  | null;
official: string  | null;
native: boolean  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
