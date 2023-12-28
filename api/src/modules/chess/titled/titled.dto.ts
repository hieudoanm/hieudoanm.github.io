import { ApiProperty } from '@nestjs/swagger';
import { ChessPlayerDto } from '../../../generated/chessPlayer.entity';

export class TitlesDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  titles: string[];
}

export class TitledStatsDto {
  @ApiProperty()
  averageRapidRating: number;

  @ApiProperty()
  maxRapidRating: number;

  @ApiProperty()
  averageBlitzRating: number;

  @ApiProperty()
  maxBlitzRating: number;

  @ApiProperty()
  averageBulletRating: number;

  @ApiProperty()
  maxBulletRating: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessPlayerDto] })
  players: ChessPlayerDto[];
}
