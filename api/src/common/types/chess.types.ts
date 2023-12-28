import {
  ChessBoardFile,
  ChessBoardRank,
  ChessPiece,
} from '../enums/chess.enums';

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
