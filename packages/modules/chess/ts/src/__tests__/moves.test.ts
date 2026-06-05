import { boardFromFen, cloneBoard } from '../board';
import {
  legalMoves,
  generatePawnMoves,
  generateKnightMoves,
  generateSlidingMoves,
  generateKingMoves,
  applyMove,
} from '../moves';
import { square, squareName } from '../utils';
import { isInCheck } from '../attack';
import type { CastlingRights } from '../types';

const DEFAULT_CR: CastlingRights = { K: true, Q: true, k: true, q: true };
const NONE_CR: CastlingRights = { K: false, Q: false, k: false, q: false };

const toSquares = (
  moves: { from: number; to: number; promotion?: string | null }[]
): string[] =>
  moves
    .map(
      (m) =>
        `${squareName(m.from)}->${squareName(m.to)}${m.promotion ? `=${m.promotion}` : ''}`
    )
    .sort();

describe('generatePawnMoves', () => {
  it('white pawn on e2 can move to e3 and e4', () => {
    const board = boardFromFen('8/8/8/8/8/8/4P3/8');
    const moves = generatePawnMoves(board, square(1, 4), 'w', null);
    expect(toSquares(moves)).toEqual(['e2->e3', 'e2->e4']);
  });

  it('white pawn on e3 can only move to e4', () => {
    const board = boardFromFen('8/8/8/8/8/4P3/8/8');
    const moves = generatePawnMoves(board, square(2, 4), 'w', null);
    expect(toSquares(moves)).toEqual(['e3->e4']);
  });

  it('white pawn on e7 promotes', () => {
    const board = boardFromFen('8/4P3/8/8/8/8/8/8');
    const moves = generatePawnMoves(board, square(6, 4), 'w', null);
    expect(moves).toHaveLength(4);
    expect(moves.every((m) => m.to === square(7, 4))).toBe(true);
    expect(moves.map((m) => m.promotion).sort()).toEqual(['b', 'n', 'q', 'r']);
  });

  it('black pawn on e7 can move to e6 and e5', () => {
    const board = boardFromFen('8/4p3/8/8/8/8/8/8');
    const moves = generatePawnMoves(board, square(6, 4), 'b', null);
    expect(toSquares(moves)).toContain('e7->e6');
    expect(toSquares(moves)).toContain('e7->e5');
  });

  it('pawn captures diagonally', () => {
    const board = boardFromFen('8/8/8/8/4p3/5P2/8/8');
    const moves = generatePawnMoves(board, square(2, 5), 'w', null);
    expect(toSquares(moves)).toContain('f3->e4');
  });

  it('en passant captures', () => {
    const board = boardFromFen('8/8/8/3Pp3/8/8/8/8');
    const epSquare = square(5, 4); // e6
    const moves = generatePawnMoves(board, square(4, 3), 'w', epSquare);
    expect(toSquares(moves)).toContain('d5->e6');
  });
});

describe('generateKnightMoves', () => {
  it('knight on b1 has 2 moves in start position', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = generateKnightMoves(board, square(0, 1), 'w');
    expect(toSquares(moves)).toEqual(['b1->a3', 'b1->c3']);
  });

  it('knight on d4 has up to 8 moves on empty board', () => {
    const board = boardFromFen('8/8/8/8/3N4/8/8/8');
    const moves = generateKnightMoves(board, square(3, 3), 'w');
    expect(moves).toHaveLength(8);
  });
});

describe('generateSlidingMoves', () => {
  it('rook on a1 on empty rank', () => {
    const board = boardFromFen('8/8/8/8/8/8/8/R7');
    const moves = generateSlidingMoves(board, 0, 'w', [-8, -1, 1, 8]);
    expect(moves).toHaveLength(14);
  });

  it('bishop on c1 in start position is blocked', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = generateSlidingMoves(
      board,
      square(0, 2),
      'w',
      [-9, -7, 7, 9]
    );
    expect(moves).toHaveLength(0);
  });

  it('queen on d4 on empty board', () => {
    const board = boardFromFen('8/8/8/8/3Q4/8/8/8');
    const moves = generateSlidingMoves(
      board,
      square(3, 3),
      'w',
      [-9, -7, -8, -1, 1, 7, 8, 9]
    );
    expect(moves).toHaveLength(27);
  });
});

describe('generateKingMoves', () => {
  it('king on e1 in start position has 0 moves (blocked)', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = generateKingMoves(board, square(0, 4), 'w', NONE_CR);
    expect(moves).toHaveLength(0);
  });

  it('king on e1 can castle kingside and queenside', () => {
    const board = boardFromFen('r3k2r/8/8/8/8/8/8/R3K2R');
    const moves = generateKingMoves(board, square(0, 4), 'w', DEFAULT_CR);
    expect(toSquares(moves)).toContain('e1->g1');
    expect(toSquares(moves)).toContain('e1->c1');
  });

  it('king on e1 cannot castle through check', () => {
    const board = boardFromFen('r3k2r/8/8/8/8/6r1/8/R3K2R');
    const moves = generateKingMoves(board, square(0, 4), 'w', DEFAULT_CR);
    expect(toSquares(moves)).not.toContain('e1->g1');
  });
});

describe('legalMoves', () => {
  it('starting position: 20 legal moves for white', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = legalMoves(board, 'w', DEFAULT_CR, null);
    expect(moves).toHaveLength(20);
  });

  it('starting position: 20 legal moves for black', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = legalMoves(board, 'b', DEFAULT_CR, null);
    expect(moves).toHaveLength(20);
  });

  it('king in check must escape', () => {
    const board = boardFromFen('rnb1kbnr/pppp1ppp/8/8/8/5q2/4K3/8');
    const moves = legalMoves(board, 'w', NONE_CR, null);
    expect(moves.length).toBeGreaterThan(0);
    expect(
      moves.every((m) => {
        const testBoard = cloneBoard(board);
        applyMove(testBoard, m);
        return !isInCheck(testBoard, 'w');
      })
    ).toBe(true);
  });

  it('king capture is illegal', () => {
    const board = boardFromFen('k7/8/8/8/8/8/6K1/7b');
    const moves = legalMoves(board, 'w', NONE_CR, null);
    expect(moves.every((m) => m.to !== 0)).toBe(true);
  });

  it('castling rights are respected', () => {
    const board = boardFromFen('r3k2r/8/8/8/8/8/8/R3K2R');
    const noCastle = legalMoves(board, 'w', NONE_CR, null);
    const withCastle = legalMoves(board, 'w', DEFAULT_CR, null);
    expect(withCastle.length).toBeGreaterThan(noCastle.length);
  });
});
