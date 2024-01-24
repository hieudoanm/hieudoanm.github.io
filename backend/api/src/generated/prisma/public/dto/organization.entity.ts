import { CountriesOnOrganizationsDto } from './countriesOnOrganizations.entity';

export class OrganizationDto {
  code: string;
  name: string | null;
  countries?: CountriesOnOrganizationsDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
