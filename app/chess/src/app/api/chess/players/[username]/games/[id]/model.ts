import { ChessGame, ChessPhrase } from '@prisma/client';

export type Move = {
  no: number;
  side: 'white' | 'black';
  move: string;
  fen: string;
  // Opening
  eco: string;
  opening: string;
  phrase: ChessPhrase | null;
  numberOfMajorAndMinorPieces: number;
};

export type GameResponse = ChessGame & {
  moves: Move[];
};
