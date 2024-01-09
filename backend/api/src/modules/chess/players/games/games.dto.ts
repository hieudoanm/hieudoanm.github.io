import { ApiProperty } from '@nestjs/swagger';
import { ChessGameDto } from '../../../../generated/chessGame.entity';

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
