import {
  ChessBoardFile,
  ChessBoardRank,
  ChessPiece,
} from '../enums/chess.enums';

export type Result = {
  result?: string;
  count?: number;
};

export type ResultsByTimeOfDay = {
  win?: number;
  draw?: number;
  loss?: number;
  timeOfDay?: string;
};

export type Games = {
  total?: number;
  win?: number;
  draw?: number;
  loss?: number;
  periods?: GamesByPeriod[];
  timeOfDays?: GamesByTimeOfDay[];
  daysOfWeek?: GamesByDayOfWeek[];
};

export type GamesByPeriod = { games?: number; period?: number };
export type GamesByTimeOfDay = { games?: number; timeOfDay?: string };
export type GamesByDayOfWeek = { games?: number; dayOfWeek?: string };

export type Accuracy = {
  average?: number;
  win?: number;
  draw?: number;
  loss?: number;
  periods?: AccuracyByPeriod[];
  timeOfDays?: AccuracyByTimeOfDay[];
  daysOfWeek?: AccuracyByDayOfWeek[];
};

export type AccuracyByPeriod = { average?: number; period?: number };
export type AccuracyByTimeOfDay = { average?: number; timeOfDay?: string };
export type AccuracyByDayOfWeek = { average?: number; dayOfWeek?: string };

export type Opponent = {
  opponent?: string;
  games?: number;
  win?: number;
  draw?: number;
  loss?: number;
};

// Board
export type ChessBoardSquare = `${ChessBoardFile}${ChessBoardRank}`;
// Piece
export type ChessAnnotation = `${ChessPiece}${ChessBoardSquare}`;
// Time Control
export type ChessTimeControl =
  | '1|0'
  | '1|1'
  | '2|1'
  | '3|1'
  | '3|2'
  | '5|0'
  | '5|5'
  | '10|0'
  | '15|10'
  | '30|0'
  | '60|0'
  | '90|0'
  | '120|0';

export type ChessPieceType =
  | 'king'
  | 'queen'
  | 'rook'
  | 'bishop'
  | 'knight'
  | 'pawn';

export type ChessCastling = 'short' | 'long' | 'none' | '';

export type ChessSide = 'white' | 'black';
