import { CountryDto } from '@hieudoanm/generated/prisma/public/dto/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Region } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CountriesRequestQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  unMember: boolean;

  @IsOptional()
  @IsString()
  region: Region;

  @IsOptional()
  @IsString()
  subregion: string;

  @IsOptional()
  @IsString()
  timezone: string;
}

export class CountriesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ default: [] })
  regions: Region[];

  @ApiProperty({ default: [] })
  subregions: string[];

  @ApiProperty({ type: [CountryDto], default: [] })
  countries: CountryDto[];
}

export class CurrencyDto {
  @ApiProperty({ default: '' })
  code: string;

  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  symbol: string;
}

export class CurrenciesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [CurrencyDto], default: [] })
  currencies: CurrencyDto[];
}
