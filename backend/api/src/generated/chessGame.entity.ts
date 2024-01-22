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
  fen: string;
  whiteAccuracy: number;
  blackAccuracy: number;
  whiteUsername: string;
  blackUsername: string;
  whiteResult: ChessResult;
  blackResult: ChessResult;
  whiteRating: number;
  blackRating: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
