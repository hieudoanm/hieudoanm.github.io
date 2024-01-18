import { ApiProperty } from '@nestjs/swagger';
import { ChessLeague, ChessTitle } from '@prisma/client';

export class CreateChessPlayerDto {
  id: number;
  username: string;
  @ApiProperty({ enum: ChessTitle })
  title?: ChessTitle;
  @ApiProperty({ enum: ChessLeague })
  league?: ChessLeague;
  createdAt?: Date;
}
