import type {
  Board,
  Move,
  Square,
  Color,
  PieceType,
  CastlingRights,
} from '../types/types';
import {
  cloneBoard,
  getPiece,
  removePiece,
  setPiece,
  findKing,
} from '../board/board';
import { getRank, getFile, toSquare, isSquareValid } from '../utils/utils';
import { isSquareAttacked } from './attack';

const applyMoveToBoard = (board: Board, move: Move): void => {
  const piece = getPiece(board, move.from);
  if (!piece) return;

  removePiece(board, move.from);

  if (move.captured) {
    if (move.to === move.from) return;
    removePiece(board, move.to);
  }

  if (move.promotion) {
    setPiece(board, { color: piece.color, type: move.promotion }, move.to);
  } else {
    setPiece(board, piece, move.to);
  }

  const fileDiff = Math.abs(getFile(move.to) - getFile(move.from));

  if (piece.type === 'k' && fileDiff === 2) {
    const rookFrom =
      getFile(move.to) > getFile(move.from) ? move.to + 1 : move.to - 2;
    const rookTo =
      getFile(move.to) > getFile(move.from) ? move.to - 1 : move.to + 1;
    const rank = getRank(move.to);
    const rook = getPiece(board, toSquare(rank, rookFrom));
    if (rook) {
      removePiece(board, toSquare(rank, rookFrom));
      setPiece(board, rook, toSquare(rank, rookTo));
    }
  }

  if (piece.type === 'p' && fileDiff !== 0 && !move.captured) {
    const epRank = getRank(move.from);
    const epFile = getFile(move.to);
    removePiece(board, toSquare(epRank, epFile));
  }
};

export const applyMove = (board: Board, move: Move): void => {
  applyMoveToBoard(board, move);
};

export const getPawnMoves = (
  board: Board,
  sq: Square,
  color: Color,
  enPassant: Square | null
): Move[] => {
  const moves: Move[] = [];
  const dir = color === 'w' ? 1 : -1;
  const startRank = color === 'w' ? 1 : 6;
  const promoRank = color === 'w' ? 7 : 0;
  const rank = getRank(sq);
  const file = getFile(sq);

  const f1 = toSquare(rank + dir, file);
  if (isSquareValid(f1) && !board[f1]) {
    if (rank + dir === promoRank) {
      const promotions: PieceType[] = ['q', 'r', 'b', 'n'];
      for (const p of promotions)
        moves.push({ from: sq, to: f1, promotion: p, captured: null });
    } else {
      moves.push({ from: sq, to: f1, promotion: null, captured: null });
    }

    if (rank === startRank) {
      const f2 = toSquare(rank + 2 * dir, file);
      if (!board[f2]) {
        moves.push({ from: sq, to: f2, promotion: null, captured: null });
      }
    }
  }

  for (const df of [-1, 1]) {
    const f = file + df;
    if (f < 0 || f > 7) continue;
    const to = toSquare(rank + dir, f);
    if (!isSquareValid(to)) continue;

    const target = board[to];
    if (target && target.color !== color) {
      if (rank + dir === promoRank) {
        const promotions: PieceType[] = ['q', 'r', 'b', 'n'];
        for (const p of promotions)
          moves.push({ from: sq, to, promotion: p, captured: target });
      } else {
        moves.push({ from: sq, to, promotion: null, captured: target });
      }
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

export const getKnightMoves = (
  board: Board,
  sq: Square,
  color: Color
): Move[] => {
  const moves: Move[] = [];
  const offsets = [-17, -15, -10, -6, 6, 10, 15, 17];
  const rank = getRank(sq);
  const file = getFile(sq);

  for (const offset of offsets) {
    const to = sq + offset;
    if (!isSquareValid(to)) continue;
    const rDiff = Math.abs(getRank(to) - rank);
    const fDiff = Math.abs(getFile(to) - file);
    if ((rDiff !== 2 || fDiff !== 1) && (rDiff !== 1 || fDiff !== 2)) continue;
    const target = board[to];
    if (target && target.color === color) continue;
    moves.push({ from: sq, to, promotion: null, captured: target ?? null });
  }

  return moves;
};

export const getSlidingMoves = (
  board: Board,
  sq: Square,
  color: Color,
  directions: number[]
): Move[] => {
  const moves: Move[] = [];
  const rank = getRank(sq);
  const file = getFile(sq);

  for (const dir of directions) {
    let to = sq + dir;
    while (isSquareValid(to)) {
      const rDiff = Math.abs(getRank(to) - rank);
      const fDiff = Math.abs(getFile(to) - file);
      if (dir === -8 || dir === 8) {
        if (fDiff !== 0) break;
      } else if (dir === -1 || dir === 1) {
        if (rDiff !== 0) break;
      } else {
        if (rDiff !== fDiff) break;
      }

      const target = board[to];
      if (target) {
        if (target.color !== color)
          moves.push({ from: sq, to, promotion: null, captured: target });
        break;
      }
      moves.push({ from: sq, to, promotion: null, captured: null });
      to += dir;
    }
  }

  return moves;
};

export const getKingMoves = (
  board: Board,
  sq: Square,
  color: Color,
  castlingRights: CastlingRights
): Move[] => {
  const moves: Move[] = [];
  const offsets = [-9, -7, -8, -1, 1, 7, 8, 9];
  const rank = getRank(sq);
  const file = getFile(sq);

  for (const offset of offsets) {
    const to = sq + offset;
    if (!isSquareValid(to)) continue;
    const rDiff = Math.abs(getRank(to) - rank);
    const fDiff = Math.abs(getFile(to) - file);
    if (rDiff > 1 || fDiff > 1) continue;
    const target = board[to];
    if (target && target.color === color) continue;
    moves.push({ from: sq, to, promotion: null, captured: target ?? null });
  }

  const opponent = color === 'w' ? 'b' : 'w';
  const castlingKey = color === 'w' ? 'K' : 'k';
  const castlingQueenKey = color === 'w' ? 'Q' : 'q';
  const startRank = color === 'w' ? 0 : 7;

  if (castlingRights[castlingKey as keyof CastlingRights]) {
    const kingDest = toSquare(startRank, 6);
    const rookSq = toSquare(startRank, 7);
    const rook = board[rookSq];
    if (
      rook &&
      rook.type === 'r' &&
      rook.color === color &&
      !board[toSquare(startRank, 5)] &&
      !board[toSquare(startRank, 6)] &&
      !isSquareAttacked(board, sq, opponent) &&
      !isSquareAttacked(board, toSquare(startRank, 5), opponent) &&
      !isSquareAttacked(board, toSquare(startRank, 6), opponent)
    ) {
      moves.push({ from: sq, to: kingDest, promotion: null, captured: null });
    }
  }

  if (castlingRights[castlingQueenKey as keyof CastlingRights]) {
    const kingDest = toSquare(startRank, 2);
    const rookSq = toSquare(startRank, 0);
    const rook = board[rookSq];
    if (
      rook &&
      rook.type === 'r' &&
      rook.color === color &&
      !board[toSquare(startRank, 1)] &&
      !board[toSquare(startRank, 2)] &&
      !board[toSquare(startRank, 3)] &&
      !isSquareAttacked(board, sq, opponent) &&
      !isSquareAttacked(board, toSquare(startRank, 3), opponent) &&
      !isSquareAttacked(board, toSquare(startRank, 2), opponent)
    ) {
      moves.push({ from: sq, to: kingDest, promotion: null, captured: null });
    }
  }

  return moves;
};

export const getPseudoLegalMoves = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): Move[] => {
  const moves: Move[] = [];
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (!piece || piece.color !== turn) continue;

    switch (piece.type) {
      case 'p':
        moves.push(...getPawnMoves(board, sq, turn, enPassant));
        break;
      case 'n':
        moves.push(...getKnightMoves(board, sq, turn));
        break;
      case 'b':
        moves.push(...getSlidingMoves(board, sq, turn, [-9, -7, 7, 9]));
        break;
      case 'r':
        moves.push(...getSlidingMoves(board, sq, turn, [-8, -1, 1, 8]));
        break;
      case 'q':
        moves.push(
          ...getSlidingMoves(board, sq, turn, [-9, -7, -8, -1, 1, 7, 8, 9])
        );
        break;
      case 'k':
        moves.push(...getKingMoves(board, sq, turn, castlingRights));
        break;
    }
  }
  return moves;
};

export const getLegalMoves = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): Move[] => {
  const pseudo = getPseudoLegalMoves(board, turn, castlingRights, enPassant);
  const opponent = turn === 'w' ? 'b' : 'w';
  return pseudo.filter((move) => {
    const testBoard = cloneBoard(board);
    applyMove(testBoard, move);
    const kingSq = findKing(testBoard, turn);
    if (kingSq === null) return false;
    if (findKing(testBoard, opponent) === null) return false;
    return !isSquareAttacked(testBoard, kingSq, opponent);
  });
};
