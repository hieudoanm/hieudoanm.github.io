import {
  createEmptyBoard,
  cloneBoard,
  setPiece,
  getPiece,
  removePiece,
  findKing,
  fromFenBoard,
  toFenBoard,
  PIECE_VALUES,
} from '../board';
import { toSquare } from '../../utils/utils';

const EMPTY = Array(64).fill(null);

describe('createEmptyBoard', () => {
  it('creates board with all nulls', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(64);
    expect(board.every((sq) => sq === null)).toBe(true);
  });
});

describe('cloneBoard', () => {
  it('returns a deep copy', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const cloned = cloneBoard(board);
    expect(cloned).toEqual(board);
    cloned[0] = null;
    expect(cloned).not.toEqual(board);
  });
});

describe('setPiece / getPiece / removePiece', () => {
  it('sets and retrieves a piece', () => {
    const board = createEmptyBoard();
    const piece = { color: 'w' as const, type: 'q' as const };
    setPiece(board, piece, 4);
    expect(getPiece(board, 4)).toEqual(piece);
  });

  it('removes a piece', () => {
    const board = createEmptyBoard();
    const piece = { color: 'b' as const, type: 'k' as const };
    setPiece(board, piece, 60);
    removePiece(board, 60);
    expect(getPiece(board, 60)).toBeNull();
  });

  it('getPiece returns null for empty', () => {
    expect(getPiece(EMPTY, 0)).toBeNull();
  });
});

describe('findKing', () => {
  it('finds white king on e1 in start position', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(findKing(board, 'w')).toBe(toSquare(0, 4));
  });

  it('finds black king on e8 in start position', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(findKing(board, 'b')).toBe(toSquare(7, 4));
  });

  it('returns null when no king', () => {
    const board = createEmptyBoard();
    expect(findKing(board, 'w')).toBeNull();
  });
});

describe('fromFenBoard', () => {
  it('parses starting position', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(board[toSquare(0, 0)]).toEqual({ color: 'w', type: 'r' });
    expect(board[toSquare(0, 4)]).toEqual({ color: 'w', type: 'k' });
    expect(board[toSquare(1, 0)]).toEqual({ color: 'w', type: 'p' });
    expect(board[toSquare(6, 0)]).toEqual({ color: 'b', type: 'p' });
    expect(board[toSquare(7, 4)]).toEqual({ color: 'b', type: 'k' });
    expect(board[toSquare(7, 0)]).toEqual({ color: 'b', type: 'r' });
  });

  it('parses empty ranks', () => {
    const board = fromFenBoard('8/8/8/8/8/8/8/8');
    expect(board.every((sq) => sq === null)).toBe(true);
  });
});

describe('toFenBoard', () => {
  it('stringifies starting position', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(toFenBoard(board)).toBe(
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
      expect(toFenBoard(fromFenBoard(fen))).toBe(fen);
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
