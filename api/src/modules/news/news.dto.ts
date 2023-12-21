import { ApiProperty } from '@nestjs/swagger';

export class GoogleCountryDto {
  @ApiProperty()
  country: string;

  @ApiProperty({ type: [String] })
  queries: string[];
}

export class GoogleResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [GoogleCountryDto] })
  countries: GoogleCountryDto[];
}
