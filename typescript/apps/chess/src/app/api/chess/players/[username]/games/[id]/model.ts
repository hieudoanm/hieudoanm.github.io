import {
  ChessCastling,
  ChessPieceType,
  ChessSide,
} from '@chess/common/types/chess';
import { ChessGame, ChessPhrase } from '@prisma/client';

export type Move = {
  no: number;
  side: ChessSide;
  move: string;
  fen: string;
  // Opening
  eco: string;
  opening: string;
  phrase: ChessPhrase | null;
  numberOfMajorAndMinorPieces: number;
  piece: ChessPieceType;
  castling: ChessCastling;
};

export type GameResponse = ChessGame & {
  castling: Record<ChessSide, ChessCastling>;
  pieces: Record<ChessSide, Record<ChessPieceType, number>>;
  moves: Move[];
};
