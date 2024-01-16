import { ApiProperty } from '@nestjs/swagger';
import { ChessPlayerDto } from '@hieudoanm/generated/chessPlayer.entity';

export class PlayersResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessPlayerDto] })
  players: ChessPlayerDto[];
}
