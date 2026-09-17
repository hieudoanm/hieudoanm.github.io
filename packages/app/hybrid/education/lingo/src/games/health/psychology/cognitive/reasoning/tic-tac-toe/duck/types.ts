import type { Board, Player, WinResult } from '../_shared/board';

export type { Board, Player, WinResult };

/** Turn phase: first place a mark, then move the duck. */
export type Phase = 'mark' | 'duck';

export interface Move {
  player: Player;
  /** Cell where this player's mark landed. */
  markIdx: number;
  /** Duck position before this turn (null while unset). */
  duckFrom: number | null;
  /** Duck position after this turn. */
  duckTo: number;
}
