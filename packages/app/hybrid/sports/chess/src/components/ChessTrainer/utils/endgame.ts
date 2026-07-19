import type {
  Board,
  Color,
  GameState,
  Move,
  PieceType,
  Square,
} from '@chess/ts';
import {
  createEmptyBoard,
  createGame,
  getLegalMoves,
  isSquareAttacked,
  makeMove,
  setPiece,
  toFen,
  toFenBoard,
  toSquareName,
} from '@chess/ts';

const randomSquare = (): number => Math.floor(Math.random() * 64);

const kingsNotAdjacent = (a: number, b: number): boolean => {
  const ar = Math.floor(a / 8);
  const ac = a % 8;
  const br = Math.floor(b / 8);
  const bc = b % 8;
  return Math.max(Math.abs(ar - br), Math.abs(ac - bc)) > 1;
};

const place = (
  board: Board,
  color: Color,
  type: PieceType,
  occupied: Set<number>
): number => {
  let sq: number;
  do {
    sq = randomSquare();
  } while (occupied.has(sq));
  setPiece(board, { color, type }, sq as Square);
  occupied.add(sq);
  return sq;
};

const buildEndgameFen = (material: PieceType[]): string => {
  const board = createEmptyBoard();
  const occupied = new Set<number>();
  const bKing = place(board, 'b', 'k', occupied);
  let wKing: number;
  do {
    wKing = randomSquare();
  } while (occupied.has(wKing) || !kingsNotAdjacent(bKing, wKing));
  setPiece(board, { color: 'w', type: 'k' }, wKing as Square);
  occupied.add(wKing);
  for (const type of material) place(board, 'w', type, occupied);
  return `${toFenBoard(board)} w - - 0 1`;
};

export const generateEndgameFen = (
  material: 'KQ' | 'KR' | 'KBB' | 'KBN',
  tries = 20
): string => {
  const pieces: PieceType[] =
    material === 'KQ'
      ? ['q']
      : material === 'KR'
        ? ['r']
        : material === 'KBB'
          ? ['b', 'b']
          : ['b', 'n'];
  for (let i = 0; i < tries; i += 1) {
    const fen = buildEndgameFen(pieces);
    const state = createGame(fen);
    const blackKing = state.board.findIndex(
      (p) => p?.color === 'b' && p.type === 'k'
    );
    if (blackKing < 0) continue;
    if (isSquareAttacked(state.board, blackKing, 'w')) continue;
    if (
      getLegalMoves(
        state.board,
        state.turn,
        state.castlingRights,
        state.enPassant
      ).length === 0
    )
      continue;
    return toFen(state);
  }
  return '4k3/8/8/8/8/8/4Q3/4K3 w - - 0 1';
};

export const isCheckmate = (state: GameState): boolean =>
  state.status === 'checkmate';

const sqName = (sq: number | string): string =>
  typeof sq === 'number' ? toSquareName(sq) : sq;

export const legalMoveFor = (
  state: GameState,
  from: number | string,
  to: number | string
): Move | null => {
  const legal = getLegalMoves(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant
  );
  return (
    legal.find(
      (m) =>
        sqName(m.from) === sqName(from) &&
        sqName(m.to) === sqName(to) &&
        m.promotion === null
    ) ?? null
  );
};

export const applyUserMove = (
  state: GameState,
  from: number | string,
  to: number | string
): GameState => {
  const move = legalMoveFor(state, from, to);
  if (!move) return state;
  return makeMove(state, move);
};

export const mateInN = (fen: string, n: number): boolean => {
  if (n <= 0) return false;
  const state = createGame(fen);
  const legal = getLegalMoves(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant
  );
  for (const move of legal) {
    const next = makeMove(state, move);
    if (n === 1) {
      if (isCheckmate(next)) return true;
      continue;
    }
    const replies = getLegalMoves(
      next.board,
      next.turn,
      next.castlingRights,
      next.enPassant
    );
    if (replies.length === 0) continue;
    let forced = true;
    for (const reply of replies) {
      if (!mateInN(toFen(makeMove(next, reply)), n - 1)) {
        forced = false;
        break;
      }
    }
    if (forced) return true;
  }
  return false;
};
