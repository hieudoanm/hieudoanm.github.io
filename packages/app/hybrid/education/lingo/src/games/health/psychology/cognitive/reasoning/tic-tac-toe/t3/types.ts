import type { Board, Player, WinResult } from '../_shared/board';

export type { Board, Player, WinResult };

export interface Move {
  player: Player;
  idx: number;
}

/** Marks currently owned per player — at most three each. */
export interface MarkHistory {
  X: number[];
  O: number[];
}
