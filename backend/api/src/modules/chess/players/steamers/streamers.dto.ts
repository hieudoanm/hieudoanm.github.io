import { ApiProperty } from '@nestjs/swagger';
import { ChessPlayerDto } from '@hieudoanm/generated/chessPlayer.entity';

export class CountryDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  country: string;
}

export class StreamersResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessPlayerDto] })
  players: ChessPlayerDto[];

  @ApiProperty({ type: [CountryDto] })
  countries: CountryDto[];
}
