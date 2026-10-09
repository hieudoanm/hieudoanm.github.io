import { createBoard, findWinner, isBoardFull } from '../_shared/board';
import type { Board, Move, Phase, Player, WinResult } from './types';

export const other = (player: Player): Player => (player === 'X' ? 'O' : 'X');

export interface DuckState {
  board: Board;
  duck: number | null;
  current: Player;
  phase: Phase;
  /** Cell marked in the current turn's mark phase. */
  pendingMark: number | null;
  moves: Move[];
  winner: WinResult | null;
}

export const freshDuck = (): DuckState => ({
  board: createBoard(),
  duck: null,
  current: 'X',
  phase: 'mark',
  pendingMark: null,
  moves: [],
  winner: null,
});

/** A cell is playable only when empty and not occupied by the duck. */
export const isCellFree = (state: DuckState, idx: number): boolean =>
  state.board[idx] === null && state.duck !== idx;

/** Mark phase — places the mover's mark, winning outright on a line. */
export const placeMark = (state: DuckState, idx: number): DuckState => {
  if (state.winner || state.phase !== 'mark' || !isCellFree(state, idx))
    return state;
  const board = [...state.board];
  board[idx] = state.current;
  return {
    ...state,
    board,
    pendingMark: idx,
    phase: 'duck',
    winner: findWinner(board),
  };
};

/** Duck phase — relocates the duck, records the move and passes the turn. */
export const moveDuck = (state: DuckState, idx: number): DuckState => {
  if (state.winner || state.phase !== 'duck' || state.pendingMark === null)
    return state;
  if (
    idx === state.pendingMark ||
    state.board[idx] !== null ||
    state.duck === idx
  ) {
    return state;
  }
  const move: Move = {
    player: state.current,
    markIdx: state.pendingMark,
    duckFrom: state.duck,
    duckTo: idx,
  };
  return {
    ...state,
    duck: idx,
    moves: [...state.moves, move],
    pendingMark: null,
    phase: 'mark',
    current: other(state.current),
  };
};

/**
 * Pops the last recorded move — clears its mark, restores the duck to
 * `duckFrom` and returns to that player's mark phase.
 */
export const undoDuckMove = (state: DuckState): DuckState => {
  if (state.winner) return state;
  if (state.phase === 'duck') {
    const board = [...state.board];
    if (state.pendingMark !== null) board[state.pendingMark] = null;
    return { ...state, board, pendingMark: null, phase: 'mark' };
  }
  if (state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;
  const board = [...state.board];
  board[last.markIdx] = null;
  return {
    ...state,
    board,
    duck: last.duckFrom,
    moves,
    current: last.player,
    phase: 'mark',
    pendingMark: null,
    winner: null,
  };
};

/** Full board with no line ends the game in a draw. */
export const isDraw = (state: DuckState): boolean =>
  !state.winner && isBoardFull(state.board);
