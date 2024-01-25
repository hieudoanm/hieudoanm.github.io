import { ChessPlayerDto } from '@hieudoanm/generated/prisma/chess/dto/chessPlayer.entity';
import { ApiProperty } from '@nestjs/swagger';

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
