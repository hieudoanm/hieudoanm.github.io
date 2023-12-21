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

export class NewsSourceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  country: string;
}

export class NewsSourcesDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [NewsSourceDto] })
  sources: NewsSourceDto[];
}
