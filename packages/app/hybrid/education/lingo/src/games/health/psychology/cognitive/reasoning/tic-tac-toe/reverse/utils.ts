import { createBoard, findCompletedLine, isBoardFull } from '../_shared/board';
import type { Board, LoseResult, Move, Player } from './types';

export const other = (player: Player): Player => (player === 'X' ? 'O' : 'X');

export interface ReverseState {
  board: Board;
  moves: Move[];
  current: Player;
  loser: LoseResult | null;
  draw: boolean;
}

export const freshReverse = (): ReverseState => ({
  board: createBoard(),
  moves: [],
  current: 'X',
  loser: null,
  draw: false,
});

/**
 * Pure Reverse move — X and O alternate as usual, but completing a line
 * makes the mover the loser.
 */
export const applyReverseMove = (
  state: ReverseState,
  idx: number
): ReverseState => {
  if (state.loser || state.draw || state.board[idx] !== null) return state;
  const board = [...state.board];
  board[idx] = state.current;
  const moves: Move[] = [...state.moves, { player: state.current, idx }];
  const line = findCompletedLine(board);
  return {
    board,
    moves,
    current: other(state.current),
    loser: line ? { player: state.current, cells: line } : null,
    draw: !line && isBoardFull(board),
  };
};

/** Pops the last mark and restores the previous turn. */
export const undoReverseMove = (state: ReverseState): ReverseState => {
  if (state.loser || state.draw || state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;
  const board = [...state.board];
  board[last.idx] = null;
  return { ...state, board, moves, current: last.player };
};
