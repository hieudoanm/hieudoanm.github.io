import { ChessTimeClass } from '@hieudoanm/generated/prisma/chess/client';
import { ChessPlayerDto } from './chessPlayer.entity';

export class ChessStatsDto {
  player?: ChessPlayerDto;
  playerId: number;
  timeClass: ChessTimeClass;
  best: number;
  last: number;
  deviation: number;
  win: number;
  draw: number;
  loss: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
