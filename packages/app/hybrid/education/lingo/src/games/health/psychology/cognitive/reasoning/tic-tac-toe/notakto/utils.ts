import { createBoard, findCompletedLine, isBoardFull } from '../_shared/board';
import type { Board, Move, PlayerNumber } from './types';
import { other } from './types';

export interface NotaktoState {
  board: Board;
  moves: Move[];
  current: PlayerNumber;
  /** Cells of the completed line that lost the game, if any. */
  loserCells: number[] | null;
  draw: boolean;
}

export const freshNotakto = (): NotaktoState => ({
  board: createBoard(),
  moves: [],
  current: 1,
  loserCells: null,
  draw: false,
});

/**
 * Pure Notakto move — both players share X marks; whoever completes a
 * three-in-a-row loses. The losing player stays on turn.
 */
export const applyNotaktoMove = (
  state: NotaktoState,
  idx: number
): NotaktoState => {
  if (state.loserCells || state.draw || state.board[idx] !== null) return state;
  const board = [...state.board];
  board[idx] = 'X';
  const moves: Move[] = [...state.moves, { idx }];
  const line = findCompletedLine(board);
  return {
    ...state,
    board,
    moves,
    current: line ? state.current : other(state.current),
    loserCells: line,
    draw: !line && isBoardFull(board),
  };
};

/** Pops the last placed X, restoring the previous turn. */
export const undoNotaktoMove = (state: NotaktoState): NotaktoState => {
  if (state.loserCells || state.draw || state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;
  const board = [...state.board];
  board[last.idx] = null;
  return { ...state, board, moves, current: other(state.current) };
};
