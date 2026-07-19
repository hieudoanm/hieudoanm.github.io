import {
  createBoard,
  findWinner,
  isBoardFull,
  type WinResult,
} from '../_shared/board';
import type { Board, Move, Player, PlayerNumber } from './types';
import { other } from './types';

export interface WildState {
  board: Board;
  moves: Move[];
  current: PlayerNumber;
  selectedMark: Player;
  winner: WinResult | null;
  draw: boolean;
}

export const freshWild = (): WildState => ({
  board: createBoard(),
  moves: [],
  current: 1,
  selectedMark: 'X',
  winner: null,
  draw: false,
});

/**
 * Pure Wild move — the mover plays whichever mark they selected; a line of
 * either mark wins. The mover keeps their selection for their next turn.
 */
export const applyWildMove = (state: WildState, idx: number): WildState => {
  if (state.winner || state.draw || state.board[idx] !== null) return state;
  const board = [...state.board];
  board[idx] = state.selectedMark;
  const moves: Move[] = [...state.moves, { player: state.selectedMark, idx }];
  const winner = findWinner(board);
  return {
    board,
    moves,
    current: other(state.current),
    selectedMark: state.selectedMark,
    winner,
    draw: !winner && isBoardFull(board),
  };
};

/** Switches the mark the current player will place next. */
export const selectMark = (state: WildState, mark: Player): WildState =>
  state.winner || state.draw ? state : { ...state, selectedMark: mark };

/** Pops the last placed mark and restores the previous turn. */
export const undoWildMove = (state: WildState): WildState => {
  if (state.winner || state.draw || state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;
  const board = [...state.board];
  board[last.idx] = null;
  return { ...state, board, moves, current: other(state.current) };
};
