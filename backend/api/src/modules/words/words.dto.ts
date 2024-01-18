import { WordDto } from '@hieudoanm/generated/word.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class WordsRequestQueryDto {
  @Type(() => Number)
  @IsOptional()
  @Max(1000)
  @Min(10)
  @IsInt()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  offset: number;
}

export class WordsResponseDto {
  @ApiProperty({ default: 0 })
  limit: number;

  @ApiProperty({ default: 0 })
  offset: number;

  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [WordDto], default: [] })
  words: WordDto[];
}
