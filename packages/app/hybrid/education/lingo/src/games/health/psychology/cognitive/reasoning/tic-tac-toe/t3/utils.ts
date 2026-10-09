import { createBoard, findWinner, type WinResult } from '../_shared/board';
import type { Board, MarkHistory, Move, Player } from './types';

/** Each player may keep at most three marks; the fourth removes the oldest. */
export const MAX_MARKS = 3;

export interface T3State {
  board: Board;
  moves: Move[];
  history: MarkHistory;
  current: Player;
  winner: WinResult | null;
}

export const freshT3 = (): T3State => ({
  board: createBoard(),
  moves: [],
  history: { X: [], O: [] },
  current: 'X',
  winner: null,
});

const other = (player: Player): Player => (player === 'X' ? 'O' : 'X');

/**
 * Pure T3 move — placing a mark beyond three per player removes that
 * player's oldest mark, then the board is checked for a winner.
 */
export const applyT3Move = (state: T3State, idx: number): T3State => {
  if (state.winner || state.board[idx] !== null) return state;

  const board = [...state.board];
  const history: MarkHistory = {
    X: [...state.history.X],
    O: [...state.history.O],
  };
  const moves: Move[] = [...state.moves];

  board[idx] = state.current;
  history[state.current].push(idx);
  moves.push({ player: state.current, idx });

  if (history[state.current].length > MAX_MARKS) {
    const removed = history[state.current].shift() as number;
    board[removed] = null;
    for (let k = moves.length - 1; k >= 0; k -= 1) {
      if (moves[k].player === state.current && moves[k].idx === removed) {
        moves.splice(k, 1);
        break;
      }
    }
  }

  return {
    board,
    moves,
    history,
    current: other(state.current),
    winner: findWinner(board),
  };
};

const removeLastOccurrence = (cells: number[], idx: number): number[] => {
  const next = [...cells];
  for (let i = next.length - 1; i >= 0; i -= 1) {
    if (next[i] === idx) {
      next.splice(i, 1);
      break;
    }
  }
  return next;
};

/** Pops the last move, clearing its cell and returning to the mover's turn. */
export const undoT3Move = (state: T3State): T3State => {
  if (state.winner || state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;

  const board = [...state.board];
  if (board[last.idx] === last.player) board[last.idx] = null;

  return {
    ...state,
    board,
    moves,
    history: {
      ...state.history,
      [last.player]: removeLastOccurrence(state.history[last.player], last.idx),
    },
    current: last.player,
    winner: null,
  };
};

/** Oldest mark of `player` when they already hold three — shown as fading. */
export const aboutToDisappear = (
  history: MarkHistory,
  player: Player
): number | null =>
  history[player].length >= MAX_MARKS ? history[player][0] : null;
