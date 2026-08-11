import {
  allSquares,
  bestScore,
  fileOf,
  parseSquare,
  rankOf,
  roundStats,
  saveBestScore,
  shuffle,
  squareLabel,
} from '../coordinates';

describe('coordinates utils', () => {
  it('parses square names to indices', () => {
    expect(parseSquare('e4')).toBe(28);
    expect(parseSquare('a1')).toBe(0);
    expect(parseSquare('h8')).toBe(63);
    expect(parseSquare('zz')).toBe(-1);
  });

  it('formats square indices to names', () => {
    expect(squareLabel(28)).toBe('e4');
    expect(squareLabel(0)).toBe('a1');
    expect(squareLabel(63)).toBe('h8');
  });

  it('derives rank and file', () => {
    expect(rankOf(28)).toBe(4);
    expect(fileOf(28)).toBe('e');
  });

  it('lists all 64 squares', () => {
    const squares = allSquares();
    expect(squares).toHaveLength(64);
    expect(squares).toContain('a1');
    expect(squares).toContain('h8');
  });

  it('shuffles without losing items', () => {
    const source = allSquares();
    const shuffled = shuffle(source);
    expect(shuffled.sort()).toEqual(source.sort());
  });

  it('computes round statistics', () => {
    const stats = roundStats([
      { target: 'a1', answered: 'a1', correct: true, timeMs: 500 },
      { target: 'b2', answered: 'c3', correct: false, timeMs: 1500 },
    ]);
    expect(stats.total).toBe(2);
    expect(stats.correct).toBe(1);
    expect(stats.avgMs).toBe(1000);
  });

  it('round-trips the best score', () => {
    saveBestScore(12, 980);
    expect(bestScore()).toEqual({ score: 12, avgMs: 980 });
  });
});
