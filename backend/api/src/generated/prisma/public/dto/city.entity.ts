import { CountryDto } from './country.entity';

export class CityDto {
  id: number;
  capital: boolean;
  city: string;
  state: string;
  country?: CountryDto;
  countryCode: string;
  latitude: number;
  longitude: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
