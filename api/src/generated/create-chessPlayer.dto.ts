import { ChessTitle, League } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChessPlayerDto {
  id: number;
  username: string;
  @ApiProperty({ enum: ChessTitle })
  title?: ChessTitle;
  @ApiProperty({ enum: League })
  league?: League;
  createdAt?: Date;
}
