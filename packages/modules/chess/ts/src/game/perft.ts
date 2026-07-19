import type { GameState } from '../types/types';
import { cloneBoard } from '../board/board';
import { getLegalMoves, applyMove } from '../moves/moves';
import { toUci } from '../notation/notation';
import { getRank, getFile, toSquare } from '../utils/utils';

export const perft = (state: GameState, depth: number): number => {
  if (depth === 0) return 1;

  const moves = getLegalMoves(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant
  );

  if (depth === 1) return moves.length;

  let count = 0;

  for (const move of moves) {
    const newBoard = cloneBoard(state.board);
    applyMove(newBoard, move);

    const newTurn = state.turn === 'w' ? 'b' : 'w';

    const nextRights = { ...state.castlingRights };
    if (move.from === 4 || move.to === 4) nextRights.K = nextRights.Q = false;
    if (move.from === 60 || move.to === 60) nextRights.K = nextRights.Q = false;
    if (move.from === 7 || move.to === 7) nextRights.K = false;
    if (move.from === 0 || move.to === 0) nextRights.Q = false;
    if (move.from === 63 || move.to === 63) nextRights.k = false;
    if (move.from === 56 || move.to === 56) nextRights.q = false;

    const piece = state.board[move.from]!;
    if (piece.type === 'k') {
      if (piece.color === 'w') nextRights.K = nextRights.Q = false;
      else nextRights.k = nextRights.q = false;
    }
    if (piece.type === 'r') {
      if (move.from === 7) nextRights.K = false;
      if (move.from === 0) nextRights.Q = false;
      if (move.from === 63) nextRights.k = false;
      if (move.from === 56) nextRights.q = false;
    }

    const fromRank = getRank(move.from);
    const toRank = getRank(move.to);
    const toFile = getFile(move.to);

    const nextEnPassant =
      piece.type === 'p' && Math.abs(toRank - fromRank) === 2
        ? toSquare((fromRank + toRank) / 2, toFile)
        : null;

    const nextState: GameState = {
      board: newBoard,
      turn: newTurn,
      castlingRights: nextRights,
      enPassant: nextEnPassant,
      halfMoveClock: 0,
      fullMoveNumber: 1,
      history: [],
      status: 'playing',
      result: '*',
      inCheck: false,
    };

    count += perft(nextState, depth - 1);
  }

  return count;
};

export const divide = (
  state: GameState,
  depth: number
): Record<string, number> => {
  const result: Record<string, number> = {};
  const moves = getLegalMoves(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant
  );

  for (const move of moves) {
    const uci = toUci(move);

    const newBoard = cloneBoard(state.board);
    applyMove(newBoard, move);

    const newTurn = state.turn === 'w' ? 'b' : 'w';

    const nextRights = { ...state.castlingRights };
    if (move.from === 4 || move.to === 4) nextRights.K = nextRights.Q = false;
    if (move.from === 60 || move.to === 60) nextRights.K = nextRights.Q = false;
    if (move.from === 7 || move.to === 7) nextRights.K = false;
    if (move.from === 0 || move.to === 0) nextRights.Q = false;
    if (move.from === 63 || move.to === 63) nextRights.k = false;
    if (move.from === 56 || move.to === 56) nextRights.q = false;

    const piece = state.board[move.from]!;
    if (piece.type === 'k') {
      if (piece.color === 'w') nextRights.K = nextRights.Q = false;
      else nextRights.k = nextRights.q = false;
    }
    if (piece.type === 'r') {
      if (move.from === 7) nextRights.K = false;
      if (move.from === 0) nextRights.Q = false;
      if (move.from === 63) nextRights.k = false;
      if (move.from === 56) nextRights.q = false;
    }

    const fromRank = getRank(move.from);
    const toRank = getRank(move.to);
    const toFile = getFile(move.to);

    const nextEnPassant =
      piece.type === 'p' && Math.abs(toRank - fromRank) === 2
        ? toSquare((fromRank + toRank) / 2, toFile)
        : null;

    const nextState: GameState = {
      board: newBoard,
      turn: newTurn,
      castlingRights: nextRights,
      enPassant: nextEnPassant,
      halfMoveClock: 0,
      fullMoveNumber: 1,
      history: [],
      status: 'playing',
      result: '*',
      inCheck: false,
    };

    result[uci] = depth > 1 ? perft(nextState, depth - 1) : 1;
  }

  return result;
};
