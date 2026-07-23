import { SIZE, generatePuzzle, isAdjacentToShaded, validate } from '../utils';
import { Grid } from '../types';

describe('Norinori utils', () => {
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

    it('returns solution and clues', () => {
      const { solution, clues } = generatePuzzle();
      expect(solution).toHaveLength(SIZE);
      expect(clues.rows).toHaveLength(SIZE);
      expect(clues.cols).toHaveLength(SIZE);
    });

    it('solution has correct dimensions', () => {
      const { solution } = generatePuzzle();
      for (const row of solution) expect(row).toHaveLength(SIZE);
    });

    it('clue counts are non-negative', () => {
      const { clues } = generatePuzzle();
      for (const r of clues.rows) expect(r).toBeGreaterThanOrEqual(0);
      for (const c of clues.cols) expect(c).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isAdjacentToShaded', () => {
    it('returns false when no adjacent shaded cells', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      expect(isAdjacentToShaded(grid, 2, 2)).toBe(false);
    });

    it('returns true when left neighbor is shaded', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      grid[2][1] = true;
      expect(isAdjacentToShaded(grid, 2, 2)).toBe(true);
    });

    it('returns false at boundary', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      expect(isAdjacentToShaded(grid, 0, 0)).toBe(false);
    });
  });

  describe('validate', () => {
    it('returns true for empty grid with 0 clues', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      const clues = { rows: Array(SIZE).fill(0), cols: Array(SIZE).fill(0) };
      expect(validate(grid, clues)).toBe(true);
    });

    it('returns false when row count mismatches', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      grid[0][0] = true;
      const clues = { rows: [0, 0, 0, 0, 0, 0], cols: [1, 0, 0, 0, 0, 0] };
      expect(validate(grid, clues)).toBe(false);
    });

    it('returns false when adjacent shaded cells exist', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      grid[0][0] = true;
      grid[0][1] = true;
      const clues = {
        rows: [2, 0, 0, 0, 0, 0],
        cols: [1, 1, 0, 0, 0, 0],
      };
      expect(validate(grid, clues)).toBe(false);
    });

    it('returns true for valid non-adjacent layout', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      grid[0][0] = true;
      grid[1][2] = true;
      const clues = {
        rows: [1, 1, 0, 0, 0, 0],
        cols: [1, 0, 1, 0, 0, 0],
      };
      expect(validate(grid, clues)).toBe(true);
    });
  });
});
