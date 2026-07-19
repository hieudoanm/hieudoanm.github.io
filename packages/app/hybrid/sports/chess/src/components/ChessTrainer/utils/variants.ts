import type {
  Board,
  Color,
  GameState,
  Move,
  Piece,
  PieceType,
  Square,
} from '@chess/ts';
import {
  cloneBoard,
  createGame,
  findKing,
  getPiece,
  getPseudoLegalMoves,
  isInCheck,
  isSquareAttacked,
  isSquareValid,
  makeMove,
  removePiece,
  setPiece,
  toFen,
  toSquare,
  toSquareName,
} from '@chess/ts';

export const THREE_CHECK_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const HORDE_FEN =
  'k7/pppppppp/8/1PP2PP1/PPPPPPPP/PPPPPPPP/PPPPPPPP/PKPPPPPP w - - 0 1';

export const CRAZYHOUSE_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export interface CheckCounts {
  w: number;
  b: number;
}

export const THREE_CHECK_WIN = 3;

export const updateThreeCheck = (
  state: GameState,
  move: Move,
  counts: CheckCounts
): CheckCounts => {
  const next = makeMove(state, move);
  if (isInCheck(next.board, next.turn)) {
    const mover: Color = state.turn;
    return { ...counts, [mover]: counts[mover] + 1 };
  }
  return counts;
};

export const threeCheckWinner = (counts: CheckCounts): Color | null => {
  if (counts.w >= THREE_CHECK_WIN) return 'w';
  if (counts.b >= THREE_CHECK_WIN) return 'b';
  return null;
};

const getHordePawnMoves = (
  board: Board,
  sq: number,
  enPassant: Square | null
): Move[] => {
  const moves: Move[] = [];
  const rank = Math.floor(sq / 8);
  const file = sq % 8;
  const startRank = 1;

  const push = toSquare(rank + 1, file);
  if (isSquareValid(push) && !board[push]) {
    moves.push({ from: sq, to: push, promotion: null, captured: null });
    if (rank === startRank) {
      const push2 = toSquare(rank + 2, file);
      if (isSquareValid(push2) && !board[push2]) {
        moves.push({ from: sq, to: push2, promotion: null, captured: null });
      }
    }
  }

  for (const df of [-1, 1]) {
    const f = file + df;
    if (f < 0 || f > 7) continue;
    const to = toSquare(rank + 1, f);
    if (!isSquareValid(to)) continue;
    const target = board[to];
    if (target && target.color === 'b') {
      moves.push({ from: sq, to, promotion: null, captured: target });
    }
    if (to === enPassant) {
      moves.push({
        from: sq,
        to,
        promotion: null,
        captured: board[toSquare(rank, f)] ?? null,
      });
    }
  }

  return moves;
};

export const getHordeMoves = (
  board: Board,
  color: Color,
  castlingRights: GameState['castlingRights'],
  enPassant: Square | null
): Move[] => {
  if (color === 'b') {
    const pseudo = getPseudoLegalMoves(board, color, castlingRights, enPassant);
    const blackKing = findKing(board, 'b');
    if (blackKing === null) return pseudo;
    return pseudo.filter((move) => {
      const testBoard = cloneBoard(board);
      const mover = getPiece(board, move.from);
      if (!mover) return false;
      removePiece(testBoard, move.from);
      if (move.captured) removePiece(testBoard, move.to);
      setPiece(
        testBoard,
        move.promotion ? { color: mover.color, type: move.promotion } : mover,
        move.to
      );
      return !isSquareAttacked(testBoard, blackKing, 'w');
    });
  }
  const moves: Move[] = [];
  for (let sq = 0; sq < 64; sq += 1) {
    const piece = board[sq];
    if (piece && piece.color === 'w') {
      moves.push(...getHordePawnMoves(board, sq, enPassant));
    }
  }
  return moves;
};

export const applyHordeMove = (state: GameState, move: Move): GameState => {
  const newBoard = cloneBoard(state.board);
  const piece = getPiece(newBoard, move.from);
  if (piece) {
    removePiece(newBoard, move.from);
    if (move.captured) removePiece(newBoard, move.to);
    setPiece(newBoard, piece, move.to);
  }
  const fileDiff = Math.abs((move.to % 8) - (move.from % 8));
  if (piece?.type === 'p' && fileDiff !== 0 && !move.captured) {
    removePiece(newBoard, toSquare(Math.floor(move.from / 8), move.to % 8));
  }
  const newEnPassant: Square | null =
    piece?.type === 'p' &&
    Math.abs(Math.floor(move.to / 8) - Math.floor(move.from / 8)) === 2
      ? toSquare(
          (Math.floor(move.from / 8) + Math.floor(move.to / 8)) / 2,
          move.from % 8
        )
      : null;
  const turn: Color = state.turn === 'w' ? 'b' : 'w';
  const fullMoveNumber =
    state.turn === 'b' ? state.fullMoveNumber + 1 : state.fullMoveNumber;
  const blackKing = findKing(newBoard, 'b');
  const inCheck =
    blackKing !== null && isSquareAttacked(newBoard, blackKing, 'w');
  return {
    ...state,
    board: newBoard,
    turn,
    enPassant: newEnPassant,
    fullMoveNumber,
    history: [...state.history, { move, stateBefore: toFen(state) }],
    status: 'playing',
    inCheck,
    result: '*',
  };
};

export type PocketPiece = PieceType;

export interface Pocket {
  w: Record<PieceType, number>;
  b: Record<PieceType, number>;
}

export const emptyPocket = (): Pocket => ({
  w: { q: 0, r: 0, b: 0, n: 0, p: 0, k: 0 },
  b: { q: 0, r: 0, b: 0, n: 0, p: 0, k: 0 },
});

export const collectCapture = (state: GameState, move: Move): Piece | null => {
  if (!move.captured) return null;
  const capturer = getPiece(state.board, move.from);
  if (!capturer) return null;
  return { color: capturer.color, type: move.captured.type };
};

export const addToPocket = (pocket: Pocket, captured: Piece): Pocket => {
  const side = captured.color;
  return {
    ...pocket,
    [side]: {
      ...pocket[side],
      [captured.type]: pocket[side][captured.type] + 1,
    },
  };
};

export const pocketList = (
  pocket: Pocket,
  color: Color
): { type: PieceType; count: number }[] =>
  (Object.keys(pocket[color]) as PieceType[])
    .filter((t) => pocket[color][t] > 0)
    .map((t) => ({ type: t, count: pocket[color][t] }));

export const dropIsLegal = (
  board: Board,
  square: number,
  piece: PieceType,
  color: Color
): boolean => {
  if (board[square]) return false;
  if (piece === 'p') {
    const rank = Math.floor(square / 8);
    if (rank === 0 || rank === 7) return false;
  }
  if (piece === 'k') return false;
  return isSquareValid(square);
};

export const applyDrop = (
  board: Board,
  square: number,
  piece: PieceType,
  color: Color
): Board => {
  const newBoard = cloneBoard(board);
  setPiece(newBoard, { color, type: piece }, square as Square);
  return newBoard;
};

export const dropMove = (
  square: number,
  piece: PieceType
): { from: number; to: number; promotion: null; captured: null } => ({
  from: square,
  to: square,
  promotion: null,
  captured: null,
});

export const squareName = (sq: number): string => toSquareName(sq);

export const hordeMoveFor = (
  state: GameState,
  from: number | string,
  to: number | string
): Move | null => {
  const moves = getHordeMoves(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant
  );
  const name = (sq: number | string): string =>
    typeof sq === 'number' ? toSquareName(sq) : sq;
  return (
    moves.find((m) => name(m.from) === name(from) && name(m.to) === name(to)) ??
    null
  );
};

export const gameFromFen = (fen: string): GameState => createGame(fen);
