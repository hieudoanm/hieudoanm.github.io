import { ChessPlayerDto } from '@hieudoanm/generated/chessPlayer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  countryCode: string;
  country: string;
  total: string;
}

export class TitleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  total: number;
}

export class CountriesResponseDto {
  @ApiProperty()
  averageRapidRating: number;

  @ApiProperty()
  averageBlitzRating: number;

  @ApiProperty()
  averageBulletRating: number;

  @ApiProperty()
  maxRapidRating: number;

  @ApiProperty()
  maxBlitzRating: number;

  @ApiProperty()
  maxBulletRating: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessPlayerDto] })
  players: ChessPlayerDto[];

  @ApiProperty({ type: [TitleDto] })
  titles: TitleDto[];
}
