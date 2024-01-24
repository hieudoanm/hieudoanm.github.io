
import {CountryDto} from './country.entity'


export class CallingCodeDto {
  root: string ;
suffix: string ;
country?: CountryDto ;
countryCode: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
