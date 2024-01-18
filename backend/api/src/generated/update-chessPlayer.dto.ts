import { ApiProperty } from '@nestjs/swagger';
import { ChessLeague, ChessTitle } from '@prisma/client';

export class UpdateChessPlayerDto {
  username?: string;
  @ApiProperty({ enum: ChessTitle })
  title?: ChessTitle;
  @ApiProperty({ enum: ChessLeague })
  league?: ChessLeague;
  createdAt?: Date;
}
