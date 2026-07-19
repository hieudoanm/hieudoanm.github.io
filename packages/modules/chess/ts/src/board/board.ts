import type { Board, Piece, Square, PieceType, Color } from '../types/types';
import { toSquare } from '../utils/utils';

export const createEmptyBoard = (): Board => Array(64).fill(null);

export const cloneBoard = (board: Board): Board => [...board];

export const setPiece = (board: Board, piece: Piece, sq: Square): void => {
  board[sq] = piece;
};

export const getPiece = (board: Board, sq: Square): Piece | null =>
  board[sq] ?? null;

export const removePiece = (board: Board, sq: Square): void => {
  board[sq] = null;
};

export const findKing = (board: Board, color: Color): Square | null => {
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece && piece.color === color && piece.type === 'k') return sq;
  }
  return null;
};

const pieceFromChar = (ch: string): Piece | null => {
  const typeMap: Record<string, PieceType> = {
    p: 'p',
    n: 'n',
    b: 'b',
    r: 'r',
    q: 'q',
    k: 'k',
  };
  const lower = ch.toLowerCase();
  const type = typeMap[lower];
  if (!type) return null;
  return { color: ch === lower ? 'b' : 'w', type };
};

export const fromFenBoard = (boardPart: string): Board => {
  const board = createEmptyBoard();
  const rows = boardPart.split('/');
  for (let r = 0; r < 8; r++) {
    const row = rows[r]!;
    let f = 0;
    for (const ch of row) {
      if (ch >= '1' && ch <= '8') {
        f += parseInt(ch);
      } else {
        const piece = pieceFromChar(ch);
        if (piece) board[toSquare(7 - r, f)] = piece;
        f++;
      }
    }
  }
  return board;
};

export const toFenBoard = (board: Board): string => {
  let fen = '';
  for (let r = 7; r >= 0; r--) {
    let empty = 0;
    for (let f = 0; f < 8; f++) {
      const piece = board[toSquare(r, f)];
      if (piece) {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        fen += piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
      } else {
        empty++;
      }
    }
    if (empty > 0) fen += empty;
    if (r > 0) fen += '/';
  }
  return fen;
};

export const PIECE_VALUES: Record<PieceType, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

export const PIECE_UNICODE: Record<string, string> = {
  K: '♔',
  Q: '♕',
  R: '♖',
  B: '♗',
  N: '♘',
  P: '♙',
  k: '♚',
  q: '♛',
  r: '♜',
  b: '♝',
  n: '♞',
  p: '♟',
};
