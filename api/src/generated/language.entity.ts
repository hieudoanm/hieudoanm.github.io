import { LanguagesInCountriesDto } from './languagesInCountries.entity';

export class LanguageDto {
  code: string;
  name: string;
  category: number;
  countries?: LanguagesInCountriesDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
