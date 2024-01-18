import { ChessPlayerDto } from '@hieudoanm/generated/chessPlayer.entity';
import { ApiProperty } from '@nestjs/swagger';

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
