import { CountryDto } from './country.entity';
import { LanguageDto } from './language.entity';

export class LanguagesInCountriesDto {
  language?: LanguageDto;
  languageCode: string;
  country?: CountryDto;
  countryCode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
