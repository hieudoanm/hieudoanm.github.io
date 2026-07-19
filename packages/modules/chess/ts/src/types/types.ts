export type Color = 'w' | 'b';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface Piece {
  color: Color;
  type: PieceType;
}

export type Square = number;

export type Board = (Piece | null)[];

export interface Move {
  from: Square;
  to: Square;
  promotion: PieceType | null;
  captured: Piece | null;
}

export interface CastlingRights {
  K: boolean;
  Q: boolean;
  k: boolean;
  q: boolean;
}

export type GameStatus = 'playing' | 'checkmate' | 'stalemate' | 'draw';

export type GameResult = '1-0' | '0-1' | '1/2-1/2' | '*';

export interface GameState {
  board: Board;
  turn: Color;
  castlingRights: CastlingRights;
  enPassant: Square | null;
  halfMoveClock: number;
  fullMoveNumber: number;
  history: { move: Move; stateBefore: string }[];
  status: GameStatus;
  result: GameResult;
  inCheck: boolean;
}

export type FenParts = [
  board: string,
  turn: string,
  castling: string,
  enPassant: string,
  halfMove: string,
  fullMove: string,
];
