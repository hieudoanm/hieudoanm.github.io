
import {OrganizationDto} from './organization.entity'
import {CountryDto} from './country.entity'


export class CountriesOnOrganizationsDto {
  organization?: OrganizationDto ;
organizationCode: string ;
country?: CountryDto ;
countryCode: string ;
accession: Date  | null;
withdrawal: Date  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
