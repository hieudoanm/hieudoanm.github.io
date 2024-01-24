import {
  ChessTitle,
  ChessLeague,
} from '@hieudoanm/generated/prisma/chess/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChessPlayerDto {
  username?: string;
  @ApiProperty({ enum: ChessTitle })
  title?: ChessTitle;
  @ApiProperty({ enum: ChessLeague })
  league?: ChessLeague;
  createdAt?: Date;
}
