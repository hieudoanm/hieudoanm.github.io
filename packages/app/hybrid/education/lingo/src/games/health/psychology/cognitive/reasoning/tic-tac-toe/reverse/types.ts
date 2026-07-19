import type { Board, Player } from '../_shared/board';

export type { Board, Player };

export interface Move {
  player: Player;
  idx: number;
}

export interface LoseResult {
  player: Player;
  cells: number[];
}
