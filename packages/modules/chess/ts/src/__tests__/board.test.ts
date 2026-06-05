import {
  emptyBoard,
  cloneBoard,
  putPiece,
  getPiece,
  removePiece,
  findKing,
  boardFromFen,
  boardToFen,
  PIECE_VALUES,
} from '../board';
import { square } from '../utils';

const EMPTY = Array(64).fill(null);

describe('emptyBoard', () => {
  it('creates board with all nulls', () => {
    const board = emptyBoard();
    expect(board).toHaveLength(64);
    expect(board.every((sq) => sq === null)).toBe(true);
  });
});

describe('cloneBoard', () => {
  it('returns a deep copy', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const cloned = cloneBoard(board);
    expect(cloned).toEqual(board);
    cloned[0] = null;
    expect(cloned).not.toEqual(board);
  });
});

describe('putPiece / getPiece / removePiece', () => {
  it('sets and retrieves a piece', () => {
    const board = emptyBoard();
    const piece = { color: 'w' as const, type: 'q' as const };
    putPiece(board, piece, 4);
    expect(getPiece(board, 4)).toEqual(piece);
  });

  it('removes a piece', () => {
    const board = emptyBoard();
    const piece = { color: 'b' as const, type: 'k' as const };
    putPiece(board, piece, 60);
    removePiece(board, 60);
    expect(getPiece(board, 60)).toBeNull();
  });

  it('getPiece returns null for empty', () => {
    expect(getPiece(EMPTY, 0)).toBeNull();
  });
});

describe('findKing', () => {
  it('finds white king on e1 in start position', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(findKing(board, 'w')).toBe(square(0, 4));
  });

  it('finds black king on e8 in start position', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(findKing(board, 'b')).toBe(square(7, 4));
  });

  it('returns null when no king', () => {
    const board = emptyBoard();
    expect(findKing(board, 'w')).toBeNull();
  });
});

describe('boardFromFen', () => {
  it('parses starting position', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(board[square(0, 0)]).toEqual({ color: 'w', type: 'r' });
    expect(board[square(0, 4)]).toEqual({ color: 'w', type: 'k' });
    expect(board[square(1, 0)]).toEqual({ color: 'w', type: 'p' });
    expect(board[square(6, 0)]).toEqual({ color: 'b', type: 'p' });
    expect(board[square(7, 4)]).toEqual({ color: 'b', type: 'k' });
    expect(board[square(7, 0)]).toEqual({ color: 'b', type: 'r' });
  });

  it('parses empty ranks', () => {
    const board = boardFromFen('8/8/8/8/8/8/8/8');
    expect(board.every((sq) => sq === null)).toBe(true);
  });
});

describe('boardToFen', () => {
  it('stringifies starting position', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(boardToFen(board)).toBe(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    );
  });

  it('round-trips', () => {
    const fens = [
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      '8/8/8/8/8/8/8/8',
      'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R',
    ];
    for (const fen of fens) {
      expect(boardToFen(boardFromFen(fen))).toBe(fen);
    }
  });
});

describe('PIECE_VALUES', () => {
  it('has correct values', () => {
    expect(PIECE_VALUES.p).toBe(100);
    expect(PIECE_VALUES.n).toBe(320);
    expect(PIECE_VALUES.b).toBe(330);
    expect(PIECE_VALUES.r).toBe(500);
    expect(PIECE_VALUES.q).toBe(900);
    expect(PIECE_VALUES.k).toBe(20000);
  });
});
