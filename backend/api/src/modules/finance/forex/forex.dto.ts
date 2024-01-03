import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FrankfurterLatestResponseDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  base: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  rates: Record<string, number>;
}

export class RateDto {
  @ApiProperty()
  rate: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

export class RatesRequestQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  base: string;
}

export class RatesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  base: string;

  @ApiProperty({ type: [RateDto] })
  rates: RateDto[];
}
