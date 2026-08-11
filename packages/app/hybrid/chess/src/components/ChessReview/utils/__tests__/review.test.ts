import { reviewPgn, sanToMove } from '../review';
import { createGame } from '@chess/ts';

describe('reviewPgn', () => {
  it('returns null for an empty PGN', () => {
    expect(reviewPgn('')).toBeNull();
    expect(reviewPgn('[Event "x"]')).toBeNull();
  });

  it('builds a reviewed move list from SAN moves', () => {
    const result = reviewPgn('1. e4 e5 2. Nf3');
    expect(result).not.toBeNull();
    expect(result!.moves.map((m) => m.san)).toEqual(['e4', 'e5', 'Nf3']);
    expect(result!.moves[0].color).toBe('w');
    expect(result!.moves[1].color).toBe('b');
    expect(result!.moves.every((m) => m.fen.length > 0)).toBe(true);
  });

  it('classifies every move against the best move', () => {
    const result = reviewPgn('1. e4 e5');
    expect(result!.moves.every((m) => m.bestSan)).toBe(true);
    expect(result!.moves.every((m) => m.accuracy >= 0 && m.accuracy <= 100)).toBe(true);
  });

  it('reports per-side accuracy', () => {
    const result = reviewPgn('1. e4 e5 2. Nf3 Nc6 3. Bb5');
    expect(result!.white.accuracy).toBeGreaterThanOrEqual(0);
    expect(result!.white.accuracy).toBeLessThanOrEqual(100);
    expect(result!.black.accuracy).toBeGreaterThanOrEqual(0);
    expect(result!.black.accuracy).toBeLessThanOrEqual(100);
  });

  it('parses result tokens and move numbers', () => {
    const result = reviewPgn('1. e4 e5 2. Nf3 1-0');
    expect(result!.moves.length).toBe(3);
  });
});

describe('sanToMove', () => {
  it('returns null for illegal SAN', () => {
    const game = createGame();
    expect(sanToMove(game, 'zz')).toBeNull();
  });
});
