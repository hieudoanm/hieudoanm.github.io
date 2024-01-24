import { ChessOpeningDto } from '@hieudoanm/generated/prisma/chess/dto/chessOpening.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OpeningsRequestQueryResponseDto {
  @IsOptional()
  @IsString()
  eco: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;
}

export class OpeningsResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessOpeningDto] })
  openings: ChessOpeningDto[];
}

export class EcosResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  ecos: string[];
}
