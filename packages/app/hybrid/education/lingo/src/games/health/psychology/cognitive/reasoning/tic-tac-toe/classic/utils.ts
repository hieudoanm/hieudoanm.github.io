import {
  createBoard,
  findWinner,
  isBoardFull,
  type WinResult,
} from '../_shared/board';
import type { Board, Move, Player } from './types';

export const other = (player: Player): Player => (player === 'X' ? 'O' : 'X');

export interface ClassicState {
  board: Board;
  moves: Move[];
  current: Player;
  winner: WinResult | null;
  draw: boolean;
}

export const freshClassic = (): ClassicState => ({
  board: createBoard(),
  moves: [],
  current: 'X',
  winner: null,
  draw: false,
});

/** Pure classic move — places the mover's mark and evaluates the outcome. */
export const applyClassicMove = (
  state: ClassicState,
  idx: number
): ClassicState => {
  if (state.winner || state.draw || state.board[idx] !== null) return state;
  const board = [...state.board];
  board[idx] = state.current;
  const moves: Move[] = [...state.moves, { player: state.current, idx }];
  const winner = findWinner(board);
  return {
    board,
    moves,
    current: other(state.current),
    winner,
    draw: !winner && isBoardFull(board),
  };
};

/** Pops the last move, restoring the previous board and turn. */
export const undoClassicMove = (state: ClassicState): ClassicState => {
  if (state.winner || state.draw || state.moves.length === 0) return state;
  const moves = [...state.moves];
  const last = moves.pop();
  if (!last) return state;
  const board = [...state.board];
  board[last.idx] = null;
  return { ...state, board, moves, current: last.player };
};
