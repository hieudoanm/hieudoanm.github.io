import type { Board, Square, Color } from './types';
import { rankOf, fileOf, square, isValidSquare } from './utils';
import { findKing } from './board';

export const isSquareAttacked = (
  board: Board,
  sq: Square,
  byColor: Color
): boolean => {
  const rank = rankOf(sq);
  const file = fileOf(sq);

  const knightOffsets = [-17, -15, -10, -6, 6, 10, 15, 17];
  for (const offset of knightOffsets) {
    const target = sq + offset;
    if (!isValidSquare(target)) continue;
    const rDiff = Math.abs(rankOf(target) - rank);
    const fDiff = Math.abs(fileOf(target) - file);
    if ((rDiff === 2 && fDiff === 1) || (rDiff === 1 && fDiff === 2)) {
      const piece = board[target];
      if (piece && piece.color === byColor && piece.type === 'n') return true;
    }
  }

  for (const df of [-1, 1]) {
    const target = square(rank + (byColor === 'w' ? -1 : 1), file + df);
    if (isValidSquare(target)) {
      const piece = board[target];
      if (piece && piece.color === byColor && piece.type === 'p') return true;
    }
  }

  const kingOffsets = [-9, -7, -8, -1, 1, 7, 8, 9];
  for (const offset of kingOffsets) {
    const target = sq + offset;
    if (!isValidSquare(target)) continue;
    const rDiff = Math.abs(rankOf(target) - rank);
    const fDiff = Math.abs(fileOf(target) - file);
    if (rDiff <= 1 && fDiff <= 1) {
      const piece = board[target];
      if (piece && piece.color === byColor && piece.type === 'k') return true;
    }
  }

  const diagonalDirs = [-9, -7, 7, 9];
  for (const dir of diagonalDirs) {
    let target = sq + dir;
    while (isValidSquare(target)) {
      const rDiff = Math.abs(rankOf(target) - rank);
      const fDiff = Math.abs(fileOf(target) - file);
      if (rDiff !== fDiff) break;
      const piece = board[target];
      if (piece) {
        if (
          piece.color === byColor &&
          (piece.type === 'b' || piece.type === 'q')
        )
          return true;
        break;
      }
      target += dir;
    }
  }

  const orthogonalDirs = [-8, -1, 1, 8];
  for (const dir of orthogonalDirs) {
    let target = sq + dir;
    while (isValidSquare(target)) {
      const rDiff = Math.abs(rankOf(target) - rank);
      const fDiff = Math.abs(fileOf(target) - file);
      if (fDiff > 0 && rDiff > 0) break;
      const piece = board[target];
      if (piece) {
        if (
          piece.color === byColor &&
          (piece.type === 'r' || piece.type === 'q')
        )
          return true;
        break;
      }
      target += dir;
    }
  }

  return false;
};

export const isInCheck = (board: Board, color: Color): boolean => {
  const kingSq = findKing(board, color);
  if (kingSq === null) return false;
  return isSquareAttacked(board, kingSq, color === 'w' ? 'b' : 'w');
};
