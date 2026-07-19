import type {
  Board,
  GameState,
  Move,
  Color,
  CastlingRights,
  Square,
  Piece,
} from '../types/types';
import { cloneBoard } from '../board/board';
import { getLegalMoves, applyMove } from '../moves/moves';
import { toSquare, getRank, getFile } from '../utils/utils';
import { toFen, fromFen } from '../notation/notation';
import { isInCheck } from '../moves/attack';

export const STARTING_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const createGame = (fen: string = STARTING_FEN): GameState => {
  const state = fromFen(fen);
  return {
    ...state,
    status: 'playing',
    result: '*',
  };
};

const hasInsufficientMaterial = (board: Board): boolean => {
  const pieces: Piece[] = [];
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece) pieces.push(piece);
  }

  if (pieces.length === 2) return true;

  if (pieces.length === 3) {
    const nonKing = pieces.find((p) => p.type !== 'k')!;
    if (nonKing.type === 'b' || nonKing.type === 'n') return true;
  }

  if (pieces.length === 4) {
    const bishops = pieces.filter((p) => p.type === 'b');
    if (bishops.length === 2) {
      const sq0 = pieces.indexOf(bishops[0]!);
      const sq1 = pieces.indexOf(bishops[1]!);
      const color0 = (getRank(sq0) + getFile(sq0)) % 2;
      const color1 = (getRank(sq1) + getFile(sq1)) % 2;
      if (color0 === color1) return true;
    }
  }

  return false;
};

export const updateCastlingRights = (
  castlingRights: CastlingRights,
  move: Move,
  board: Board
): CastlingRights => {
  const newRights = { ...castlingRights };

  if (move.from === 4 || move.to === 4) newRights.K = newRights.Q = false;
  if (move.from === 60 || move.to === 60) newRights.K = newRights.Q = false;
  if (move.from === 7 || move.to === 7) newRights.K = false;
  if (move.from === 0 || move.to === 0) newRights.Q = false;
  if (move.from === 63 || move.to === 63) newRights.k = false;
  if (move.from === 56 || move.to === 56) newRights.q = false;

  const piece = board[move.from];
  if (piece) {
    if (piece.type === 'k') {
      if (piece.color === 'w') newRights.K = newRights.Q = false;
      else newRights.k = newRights.q = false;
    }
    if (piece.type === 'r') {
      if (move.from === 7) newRights.K = false;
      if (move.from === 0) newRights.Q = false;
      if (move.from === 63) newRights.k = false;
      if (move.from === 56) newRights.q = false;
    }
  }

  return newRights;
};

export const makeMove = (state: GameState, move: Move): GameState => {
  const newBoard = cloneBoard(state.board);
  const piece = state.board[move.from]!;

  applyMove(newBoard, move);

  const capturedPiece = move.captured ?? null;

  const newEnPassant: Square | null =
    piece.type === 'p' && Math.abs(getRank(move.to) - getRank(move.from)) === 2
      ? toSquare(
          (getRank(move.from) + getRank(move.to)) / 2,
          getFile(move.from)
        )
      : null;

  const newCastlingRights = updateCastlingRights(
    state.castlingRights,
    move,
    state.board
  );

  const halfMoveClock =
    piece.type === 'p' || capturedPiece ? 0 : state.halfMoveClock + 1;

  const newTurn: Color = state.turn === 'w' ? 'b' : 'w';
  const fullMoveNumber =
    state.turn === 'b' ? state.fullMoveNumber + 1 : state.fullMoveNumber;

  const stateBeforeFen = toFen(state);

  const newState: GameState = {
    board: newBoard,
    turn: newTurn,
    castlingRights: newCastlingRights,
    enPassant: newEnPassant,
    halfMoveClock,
    fullMoveNumber,
    history: [...state.history, { move, stateBefore: stateBeforeFen }],
    status: 'playing',
    result: '*',
    inCheck: false,
  };

  newState.inCheck = isInCheck(newBoard, newTurn);

  const moves = getLegalMoves(
    newBoard,
    newTurn,
    newCastlingRights,
    newEnPassant
  );

  if (moves.length === 0) {
    if (newState.inCheck) {
      newState.status = 'checkmate';
      newState.result = newTurn === 'w' ? '0-1' : '1-0';
    } else {
      newState.status = 'stalemate';
      newState.result = '1/2-1/2';
    }
  } else if (newState.halfMoveClock >= 100) {
    newState.status = 'draw';
    newState.result = '1/2-1/2';
  } else if (hasInsufficientMaterial(newBoard)) {
    newState.status = 'draw';
    newState.result = '1/2-1/2';
  }

  return newState;
};

export const undoMove = (state: GameState): GameState => {
  if (state.history.length === 0) return state;
  const prev = state.history[state.history.length - 1]!;
  return fromFen(prev.stateBefore);
};

export const getStatusMessage = (state: GameState): string => {
  switch (state.status) {
    case 'checkmate':
      return `Checkmate! ${state.turn === 'w' ? 'Black' : 'White'} wins.`;
    case 'stalemate':
      return 'Stalemate — draw.';
    case 'draw':
      return 'Draw.';
    default:
      return state.inCheck ? 'Check!' : 'Playing.';
  }
};
