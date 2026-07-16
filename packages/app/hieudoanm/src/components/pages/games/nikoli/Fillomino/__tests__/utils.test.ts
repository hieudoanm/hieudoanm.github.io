import { SIZE, generatePuzzle, isComplete } from '../utils';
import { Grid } from '../types';

describe('Fillomino utils', () => {
  describe('SIZE', () => {
    it('is 6', () => {
      expect(SIZE).toBe(6);
    });
  });

  describe('generatePuzzle', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns solution and puzzle grids of correct dimensions', () => {
      const { solution, puzzle } = generatePuzzle();
      expect(solution).toHaveLength(SIZE);
      expect(puzzle).toHaveLength(SIZE);
      for (const row of solution) expect(row).toHaveLength(SIZE);
      for (const row of puzzle) expect(row).toHaveLength(SIZE);
    });

    it('solution has no null cells', () => {
      const { solution } = generatePuzzle();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('puzzle has some null cells (clues removed)', () => {
      const { puzzle } = generatePuzzle(0);
      const nullCount = puzzle.flat().filter((c) => c === null).length;
      expect(nullCount).toBeGreaterThan(0);
    });
  });

  describe('isComplete', () => {
    it('returns false for empty grid', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(null)
      );
      expect(isComplete(grid)).toBe(false);
    });

    it('returns false when region size mismatches value', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(null)
      );
      grid[0][0] = 2;
      grid[0][1] = 2;
      grid[0][2] = 2;
      expect(isComplete(grid)).toBe(false);
    });

    it('returns false for grid with null cells', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(1)
      );
      grid[0][0] = null;
      expect(isComplete(grid)).toBe(false);
    });
  });
});
