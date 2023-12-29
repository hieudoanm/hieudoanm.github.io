import { LanguagesInCountriesDto } from './languagesInCountries.entity';
import { CountryNameDto } from './countryName.entity';

export class LanguageDto {
  code: string;
  name: string;
  category: number;
  countries?: LanguagesInCountriesDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
  CountryName?: CountryNameDto[];
}
