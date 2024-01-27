import { CountryDto } from './country.entity';

export class UniversityDto {
  rank: number;
  university: string | null;
  city: string | null;
  country?: CountryDto | null;
  countryCode: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
