import { CountryDto } from './country.entity';
import { OrganizationDto } from './organization.entity';

export class CountriesOnOrganizationsDto {
  organization?: OrganizationDto;
  organizationCode: string;
  country?: CountryDto;
  countryCode: string;
  accession: Date | null;
  withdrawal: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
