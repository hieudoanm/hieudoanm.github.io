import { ApiProperty } from '@nestjs/swagger';
import { ChessOpeningDto } from '../../../../generated/chessOpening.entity';

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
