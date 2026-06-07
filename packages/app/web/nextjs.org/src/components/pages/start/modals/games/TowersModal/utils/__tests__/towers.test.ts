import { generateMoves } from '../towers';

describe('generateMoves', () => {
  it('returns empty array for n <= 0', () => {
    expect(generateMoves(0, 0, 2, 1)).toEqual([]);
    expect(generateMoves(-1, 0, 2, 1)).toEqual([]);
  });

  it('generates 1 move for n=1', () => {
    expect(generateMoves(1, 0, 2, 1)).toEqual([[0, 2]]);
  });

  it('generates 3 moves for n=2', () => {
    const moves = generateMoves(2, 0, 2, 1);
    expect(moves).toHaveLength(3);
    expect(moves).toEqual([
      [0, 1],
      [0, 2],
      [1, 2],
    ]);
  });

  it('generates 7 moves for n=3', () => {
    const moves = generateMoves(3, 0, 2, 1);
    expect(moves).toHaveLength(7);
  });

  it('uses provided result array', () => {
    const existing: [number, number][] = [[0, 2]];
    const result = generateMoves(1, 0, 2, 1, existing);
    expect(result).toBe(existing);
    expect(result).toHaveLength(2);
  });
});
