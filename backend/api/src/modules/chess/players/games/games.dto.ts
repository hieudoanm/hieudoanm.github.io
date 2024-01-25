import { ChessGameDto } from '@hieudoanm/generated/prisma/chess/dto/chessGame.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GamesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ChessGameDto] })
  games: ChessGameDto[];
}

export class SyncRequestDto {
  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;
}

export class SyncedResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  synced: number;

  @ApiProperty()
  existed: number;
}
