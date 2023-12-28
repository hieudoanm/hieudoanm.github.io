import { ChessTimeClass, ChessVariant, ChessResult } from '@prisma/client';

export class ChessGameDto {
  id: string;
  url: string;
  pgn: string;
  timeControl: string;
  timeClass: ChessTimeClass;
  endTime: Date;
  rated: boolean;
  tcn: string;
  initialSetup: string;
  rules: ChessVariant;
  whiteId: string;
  blackId: string;
  whiteUsername: string;
  blackUsername: string;
  whiteAccuracy: number;
  blackAccuracy: number;
  whiteResult: ChessResult;
  blackResult: ChessResult;
  whiteRating: number;
  blackRating: number;
  fen: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
