import {
  createBoard,
  type Board,
  type Player,
  type WinResult,
} from '../_shared/board';

export interface Move {
  player: Player;
  idx: number;
}

export type { Board, Player, WinResult };

export const initialBoard = createBoard;
