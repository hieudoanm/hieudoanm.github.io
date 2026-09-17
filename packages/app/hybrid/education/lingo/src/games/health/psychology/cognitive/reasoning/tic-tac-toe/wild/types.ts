import type { Board, Player, WinResult } from '../_shared/board';

export type { Board, Player, WinResult };

export interface Move {
  player: Player;
  idx: number;
}

export type PlayerNumber = 1 | 2;

export const other = (player: PlayerNumber): PlayerNumber =>
  player === 1 ? 2 : 1;
