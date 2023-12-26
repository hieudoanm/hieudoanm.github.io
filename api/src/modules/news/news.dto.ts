import { ApiProperty } from '@nestjs/swagger';

export class GoogleCountryDto {
  @ApiProperty({ default: 0 })
  country: string;

  @ApiProperty({ type: [String], default: [] })
  queries: string[];
}

export class GoogleResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [GoogleCountryDto], default: [] })
  countries: GoogleCountryDto[];
}

export class NewsSourceDto {
  @ApiProperty({ default: '' })
  id: string;

  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: '' })
  url: string;

  @ApiProperty({ default: '' })
  category: string;

  @ApiProperty({ default: '' })
  language: string;

  @ApiProperty({ default: '' })
  country: string;
}

export class NewsSourcesDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [NewsSourceDto], default: [] })
  sources: NewsSourceDto[];
}
