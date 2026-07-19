import type { MoveClass } from '@chess/ts';

export interface HangingPiece {
  square: string;
  piece: string;
  color: 'w' | 'b';
}

export interface ReviewedMove {
  moveNumber: number;
  color: 'w' | 'b';
  san: string;
  fen: string;
  bestSan: string | null;
  winPercentBefore: number;
  winPercentAfter: number;
  winPercentLost: number;
  classification: { label: string; code: MoveClass };
  accuracy: number;
  missedMate: boolean;
  hanging: HangingPiece | null;
}

export interface ReviewSide {
  accuracy: number;
  best: number;
  inaccuracies: number;
  mistakes: number;
  blunders: number;
  missedMate: number;
  hanging: number;
}

export interface ReviewResult {
  white: ReviewSide;
  black: ReviewSide;
  moves: ReviewedMove[];
  bestMove: string | null;
  worstMove: string | null;
}
