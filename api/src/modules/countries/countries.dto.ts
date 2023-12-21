import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty()
  region: string;

  @ApiProperty()
  subregion: string;

  @ApiProperty()
  currencies: Record<string, { name: string; symbol: string }>;
}

export class CountriesDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [CountryDto] })
  countries: CountryDto[];
}

export class CurrencyDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;
}

export class CurrenciesDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [CurrencyDto] })
  currencies: CurrencyDto[];
}
