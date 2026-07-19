import { fromFenBoard, cloneBoard } from '../../board/board';
import {
  getLegalMoves,
  getPawnMoves,
  getKnightMoves,
  getSlidingMoves,
  getKingMoves,
  applyMove,
} from '../moves';
import { toSquare, toSquareName } from '../../utils/utils';
import { isInCheck } from '../attack';
import type { CastlingRights } from '../../types/types';

const DEFAULT_CR: CastlingRights = { K: true, Q: true, k: true, q: true };
const NONE_CR: CastlingRights = { K: false, Q: false, k: false, q: false };

const toSquares = (
  moves: { from: number; to: number; promotion?: string | null }[]
): string[] =>
  moves
    .map(
      (m) =>
        `${toSquareName(m.from)}->${toSquareName(m.to)}${m.promotion ? `=${m.promotion}` : ''}`
    )
    .sort();

describe('getPawnMoves', () => {
  it('white pawn on e2 can move to e3 and e4', () => {
    const board = fromFenBoard('8/8/8/8/8/8/4P3/8');
    const moves = getPawnMoves(board, toSquare(1, 4), 'w', null);
    expect(toSquares(moves)).toEqual(['e2->e3', 'e2->e4']);
  });

  it('white pawn on e3 can only move to e4', () => {
    const board = fromFenBoard('8/8/8/8/8/4P3/8/8');
    const moves = getPawnMoves(board, toSquare(2, 4), 'w', null);
    expect(toSquares(moves)).toEqual(['e3->e4']);
  });

  it('white pawn on e7 promotes', () => {
    const board = fromFenBoard('8/4P3/8/8/8/8/8/8');
    const moves = getPawnMoves(board, toSquare(6, 4), 'w', null);
    expect(moves).toHaveLength(4);
    expect(moves.every((m) => m.to === toSquare(7, 4))).toBe(true);
    expect(moves.map((m) => m.promotion).sort()).toEqual(['b', 'n', 'q', 'r']);
  });

  it('black pawn on e7 can move to e6 and e5', () => {
    const board = fromFenBoard('8/4p3/8/8/8/8/8/8');
    const moves = getPawnMoves(board, toSquare(6, 4), 'b', null);
    expect(toSquares(moves)).toContain('e7->e6');
    expect(toSquares(moves)).toContain('e7->e5');
  });

  it('pawn captures diagonally', () => {
    const board = fromFenBoard('8/8/8/8/4p3/5P2/8/8');
    const moves = getPawnMoves(board, toSquare(2, 5), 'w', null);
    expect(toSquares(moves)).toContain('f3->e4');
  });

  it('en passant captures', () => {
    const board = fromFenBoard('8/8/8/3Pp3/8/8/8/8');
    const epSquare = toSquare(5, 4); // e6
    const moves = getPawnMoves(board, toSquare(4, 3), 'w', epSquare);
    expect(toSquares(moves)).toContain('d5->e6');
  });
});

describe('getKnightMoves', () => {
  it('knight on b1 has 2 moves in start position', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = getKnightMoves(board, toSquare(0, 1), 'w');
    expect(toSquares(moves)).toEqual(['b1->a3', 'b1->c3']);
  });

  it('knight on d4 has up to 8 moves on empty board', () => {
    const board = fromFenBoard('8/8/8/8/3N4/8/8/8');
    const moves = getKnightMoves(board, toSquare(3, 3), 'w');
    expect(moves).toHaveLength(8);
  });
});

describe('getSlidingMoves', () => {
  it('rook on a1 on empty rank', () => {
    const board = fromFenBoard('8/8/8/8/8/8/8/R7');
    const moves = getSlidingMoves(board, 0, 'w', [-8, -1, 1, 8]);
    expect(moves).toHaveLength(14);
  });

  it('bishop on c1 in start position is blocked', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = getSlidingMoves(board, toSquare(0, 2), 'w', [-9, -7, 7, 9]);
    expect(moves).toHaveLength(0);
  });

  it('queen on d4 on empty board', () => {
    const board = fromFenBoard('8/8/8/8/3Q4/8/8/8');
    const moves = getSlidingMoves(
      board,
      toSquare(3, 3),
      'w',
      [-9, -7, -8, -1, 1, 7, 8, 9]
    );
    expect(moves).toHaveLength(27);
  });
});

describe('getKingMoves', () => {
  it('king on e1 in start position has 0 moves (blocked)', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = getKingMoves(board, toSquare(0, 4), 'w', NONE_CR);
    expect(moves).toHaveLength(0);
  });

  it('king on e1 can castle kingside and queenside', () => {
    const board = fromFenBoard('r3k2r/8/8/8/8/8/8/R3K2R');
    const moves = getKingMoves(board, toSquare(0, 4), 'w', DEFAULT_CR);
    expect(toSquares(moves)).toContain('e1->g1');
    expect(toSquares(moves)).toContain('e1->c1');
  });

  it('king on e1 cannot castle through check', () => {
    const board = fromFenBoard('r3k2r/8/8/8/8/6r1/8/R3K2R');
    const moves = getKingMoves(board, toSquare(0, 4), 'w', DEFAULT_CR);
    expect(toSquares(moves)).not.toContain('e1->g1');
  });
});

describe('getLegalMoves', () => {
  it('starting position: 20 legal moves for white', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = getLegalMoves(board, 'w', DEFAULT_CR, null);
    expect(moves).toHaveLength(20);
  });

  it('starting position: 20 legal moves for black', () => {
    const board = fromFenBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const moves = getLegalMoves(board, 'b', DEFAULT_CR, null);
    expect(moves).toHaveLength(20);
  });

  it('king in check must escape', () => {
    const board = fromFenBoard('rnb1kbnr/pppp1ppp/8/8/8/5q2/4K3/8');
    const moves = getLegalMoves(board, 'w', NONE_CR, null);
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
    const board = fromFenBoard('k7/8/8/8/8/8/6K1/7b');
    const moves = getLegalMoves(board, 'w', NONE_CR, null);
    expect(moves.every((m) => m.to !== 0)).toBe(true);
  });

  it('castling rights are respected', () => {
    const board = fromFenBoard('r3k2r/8/8/8/8/8/8/R3K2R');
    const noCastle = getLegalMoves(board, 'w', NONE_CR, null);
    const withCastle = getLegalMoves(board, 'w', DEFAULT_CR, null);
    expect(withCastle.length).toBeGreaterThan(noCastle.length);
  });
});
