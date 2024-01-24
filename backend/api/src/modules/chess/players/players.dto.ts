import { ChessPlayerDto } from '@hieudoanm/generated/prisma/chess/dto/chessPlayer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PlayersResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessPlayerDto] })
  players: ChessPlayerDto[];
}
