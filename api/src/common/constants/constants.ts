import {
  Rank,
  TimeRange,
  File,
  PieceSymbol,
  ChessPiece,
} from 'src/common/types/chess.types';

export const ONE_SECOND: number = 1000;
export const ONE_MINUTE: number = ONE_SECOND * 60;
export const ONE_HOUR: number = ONE_MINUTE * 60;
export const ONE_DAY: number = ONE_HOUR * 24;
export const ONE_WEEK: number = ONE_DAY * 7;
export const ONE_MONTH: number = ONE_DAY * 30;
export const ONE_QUARTER: number = ONE_DAY * 90;
export const ONE_YEAR: number = ONE_DAY * 365;

export const timeRangeInMilliseconds: Record<TimeRange, number> = {
  WEEK: ONE_WEEK,
  MONTH: ONE_MONTH,
  QUARTER: ONE_QUARTER,
  YEAR: ONE_YEAR,
};

export const timeRangeInDays: Record<TimeRange, number> = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
};

// Piece
export const PIECE_LIST: ChessPiece[] = [
  'king',
  'queen',
  'rook',
  'bishop',
  'knight',
  'pawn',
];
export const PIECE_SYMBOL_LIST: PieceSymbol[] = ['K', 'Q', 'R', 'B', 'N'];
export const PIECE_MAP: Record<PieceSymbol, ChessPiece> = {
  K: 'king',
  Q: 'queen',
  R: 'rook',
  B: 'bishop',
  N: 'knight',
};
// Chess Board
export const FILE_LIST: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANK_LIST: Rank[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
// Results
export const WIN_RESULTS: string[] = ['win'];
export const DRAW_RESULTS: string[] = [
  '50move',
  'agreed',
  'insufficient',
  'repetition',
  'stalemate',
  'timevsinsufficient',
];
export const LOSS_RESULTS: string[] = [
  'checkmated',
  'resigned',
  'timeout',
  'abandoned',
];

export const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
export const TIME_OF_DAYS = ['night', 'morning', 'afternoon', 'evening'];

export const RULE = 'chess';
