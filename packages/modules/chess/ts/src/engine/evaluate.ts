import type { Board, Color, PieceType, Square } from '../types/types';
import { findKing } from '../board/board';
import { getFile, getRank, toSquare } from '../utils/utils';

const PAWN_VALUE = 100;
const KNIGHT_VALUE = 320;
const BISHOP_VALUE = 330;
const ROOK_VALUE = 500;
const QUEEN_VALUE = 900;

const PAWN_TABLE: readonly number[] = [
  0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30,
  20, 10, 10, 5, 5, 10, 27, 27, 10, 5, 5, 0, 0, 0, 25, 25, 0, 0, 0, 5, -5, -10,
  0, 0, -10, -5, 5, 5, 10, 10, -25, -25, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0,
];

const KNIGHT_TABLE: readonly number[] = [
  -50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30,
  0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20,
  15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];

const BISHOP_TABLE: readonly number[] = [
  -20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5,
  10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0,
  -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10,
  -10, -10, -10, -10, -10, -20,
];

const ROOK_TABLE: readonly number[] = [
  0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0,
  -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0,
  -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0,
];

const QUEEN_TABLE: readonly number[] = [
  -20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5,
  5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5,
  5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10,
  -20,
];

const KING_TABLE: readonly number[] = [
  -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40,
  -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40,
  -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20,
  -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20,
];

const PST: Record<PieceType, readonly number[]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_TABLE,
};

const PIECE_TYPE_VALUES: Record<PieceType, number> = {
  p: PAWN_VALUE,
  n: KNIGHT_VALUE,
  b: BISHOP_VALUE,
  r: ROOK_VALUE,
  q: QUEEN_VALUE,
  k: 0,
};

const indexForColor = (sq: Square, color: Color): Square =>
  color === 'w' ? sq : 63 - sq;

const materialScore = (board: Board, color: Color): number => {
  let score = 0;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece && piece.color === color) {
      score += PIECE_TYPE_VALUES[piece.type];
    }
  }
  return score;
};

const pstScore = (board: Board, color: Color): number => {
  let score = 0;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece && piece.color === color) {
      const pst = PST[piece.type];
      if (pst) score += pst[indexForColor(sq, color)] ?? 0;
    }
  }
  return score;
};

const doubledPawnPenalty = (board: Board, color: Color): number => {
  let penalty = 0;
  for (let f = 0; f < 8; f++) {
    let count = 0;
    for (let r = 0; r < 8; r++) {
      const sq = color === 'w' ? r * 8 + f : (7 - r) * 8 + f;
      const piece = board[sq];
      if (piece && piece.color === color && piece.type === 'p') {
        count++;
      }
    }
    if (count > 1) penalty += (count - 1) * 20;
  }
  return penalty;
};

const isolatedPawnPenalty = (board: Board, color: Color): number => {
  let penalty = 0;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (!piece || piece.color !== color || piece.type !== 'p') continue;
    const f = getFile(sq);
    const left = f > 0 ? f - 1 : -1;
    const right = f < 7 ? f + 1 : -1;
    let hasNeighbor = false;
    for (let r = 0; r < 8; r++) {
      for (const nf of [left, right]) {
        if (nf === -1) continue;
        const nsq = color === 'w' ? r * 8 + nf : (7 - r) * 8 + nf;
        const np = board[nsq];
        if (np && np.color === color && np.type === 'p') {
          hasNeighbor = true;
        }
      }
    }
    if (!hasNeighbor) penalty += 20;
  }
  return penalty;
};

const bishopPairBonus = (board: Board, color: Color): number => {
  let count = 0;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece && piece.color === color && piece.type === 'b') count++;
  }
  return count >= 2 ? 30 : 0;
};

const passedPawnBonus = (board: Board, color: Color): number => {
  let bonus = 0;
  const forward = color === 'w' ? 1 : -1;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (!piece || piece.color !== color || piece.type !== 'p') continue;
    const f = getFile(sq);
    const r = getRank(sq);
    let passed = true;
    for (let df = -1; df <= 1; df++) {
      const nf = f + df;
      if (nf < 0 || nf > 7) continue;
      for (let dr = 1; dr <= 7; dr++) {
        const nr = r + forward * dr;
        if (nr < 0 || nr > 7) break;
        const nsq = toSquare(nr, nf);
        const np = board[nsq];
        if (np && np.type === 'p' && np.color !== color) {
          passed = false;
          break;
        }
      }
      if (!passed) break;
    }
    if (passed) {
      bonus += color === 'w' ? r * 10 : (7 - r) * 10;
    }
  }
  return bonus;
};

const kingSafetyScore = (board: Board, color: Color): number => {
  const kingSq = findKing(board, color);
  if (kingSq === null) return 0;
  const kf = getFile(kingSq);
  const kr = getRank(kingSq);
  if ((color === 'w' && kr !== 0) || (color === 'b' && kr !== 7)) return 0;
  const shieldRank = color === 'w' ? 1 : 6;
  let shield = 0;
  for (let df = -1; df <= 1; df++) {
    const nf = kf + df;
    if (nf < 0 || nf > 7) continue;
    const nsq = toSquare(shieldRank, nf);
    const np = board[nsq];
    if (np && np.color === color && np.type === 'p') shield += 15;
  }
  return shield;
};

const rookOpenFileBonus = (board: Board, color: Color): number => {
  let bonus = 0;
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (!piece || piece.color !== color || piece.type !== 'r') continue;
    const f = getFile(sq);
    let myPawn = false;
    let anyPawn = false;
    for (let r = 0; r < 8; r++) {
      const p = board[toSquare(r, f)];
      if (p && p.type === 'p') {
        anyPawn = true;
        if (p.color === color) myPawn = true;
      }
    }
    if (!anyPawn) bonus += 20;
    else if (!myPawn) bonus += 10;
  }
  return bonus;
};

const evaluate = (board: Board, color: Color, opponent: Color): number => {
  const myMaterial = materialScore(board, color);
  const oppMaterial = materialScore(board, opponent);
  const myPst = pstScore(board, color);
  const oppPst = pstScore(board, opponent);
  const myDoubled = doubledPawnPenalty(board, color);
  const oppDoubled = doubledPawnPenalty(board, opponent);
  const myIsolated = isolatedPawnPenalty(board, color);
  const oppIsolated = isolatedPawnPenalty(board, opponent);
  const myBishopPair = bishopPairBonus(board, color);
  const oppBishopPair = bishopPairBonus(board, opponent);
  const myPassed = passedPawnBonus(board, color);
  const oppPassed = passedPawnBonus(board, opponent);
  const myKingSafety = kingSafetyScore(board, color);
  const oppKingSafety = kingSafetyScore(board, opponent);
  const myRookOpen = rookOpenFileBonus(board, color);
  const oppRookOpen = rookOpenFileBonus(board, opponent);

  const score =
    myMaterial -
    oppMaterial +
    (myPst - oppPst) -
    (myDoubled - oppDoubled) -
    (myIsolated - oppIsolated) +
    (myBishopPair - oppBishopPair) +
    (myPassed - oppPassed) +
    (myKingSafety - oppKingSafety) +
    (myRookOpen - oppRookOpen);

  return score;
};

export const evaluateBoard = (board: Board, turn: Color): number => {
  const opponent = turn === 'w' ? 'b' : 'w';
  return evaluate(board, turn, opponent);
};
