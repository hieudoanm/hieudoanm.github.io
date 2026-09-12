import type { Board } from '../_shared/board';

export type { Board };

export interface Move {
  idx: number;
}

export type PlayerNumber = 1 | 2;

export const other = (player: PlayerNumber): PlayerNumber =>
  player === 1 ? 2 : 1;
