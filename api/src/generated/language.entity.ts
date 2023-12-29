import { LanguagesInCountriesDto } from './languagesInCountries.entity';

export class LanguageDto {
  code: string;
  name: string;
  category: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  countries?: LanguagesInCountriesDto[];
}
