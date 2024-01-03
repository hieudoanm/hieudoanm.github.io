import { ApiProperty } from '@nestjs/swagger';
import { ChessPlayerDto } from '../../../../generated/chessPlayer.entity';

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
