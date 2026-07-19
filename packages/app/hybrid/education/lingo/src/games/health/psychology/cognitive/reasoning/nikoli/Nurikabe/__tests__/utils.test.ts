import { SIZE, generatePuzzle, checkWin } from '../utils';
import { Grid } from '../types';

describe('Nurikabe utils', () => {
  describe('SIZE', () => {
    it('is 6', () => {
      expect(SIZE).toBe(6);
    });
  });

  describe('generatePuzzle', () => {
    it('returns grid of correct dimensions', () => {
      const grid = generatePuzzle();
      expect(grid).toHaveLength(SIZE);
      for (const row of grid) expect(row).toHaveLength(SIZE);
    });

    it('grid cells have valid state values', () => {
      const grid = generatePuzzle();
      for (const row of grid) {
        for (const cell of row) {
          expect(['empty', 'shaded', 'numbered']).toContain(cell.state);
        }
      }
    });

    it('generates numbered islands', () => {
      const grid = generatePuzzle();
      const numberedCells = grid.flat().filter((c) => c.state === 'numbered');
      expect(numberedCells.length).toBeGreaterThan(0);
    });

    it('numbered cells have values', () => {
      const grid = generatePuzzle();
      const numberedCells = grid.flat().filter((c) => c.state === 'numbered');
      for (const cell of numberedCells) {
        expect(cell.value).toBeGreaterThanOrEqual(1);
      }
    });

    it('numbered cells have island ids', () => {
      const grid = generatePuzzle();
      const numberedCells = grid.flat().filter((c) => c.state === 'numbered');
      for (const cell of numberedCells) {
        expect(cell.islandId).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('checkWin', () => {
    it('returns true for empty grid with no numbered cells', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      expect(checkWin(grid)).toBe(true);
    });

    it('returns false when island count does not match', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 3, islandId: 0 };
      grid[0][1] = { state: 'numbered', value: 3, islandId: 0 };
      expect(checkWin(grid)).toBe(false);
    });

    it('returns false when shaded cell adjacent to numbered', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 1, islandId: 0 };
      grid[0][1] = { state: 'shaded', value: null, islandId: -1 };
      expect(checkWin(grid)).toBe(false);
    });

    it('returns false when shaded cells not connected', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 1, islandId: 0 };
      grid[0][1] = { state: 'shaded', value: null, islandId: -1 };
      grid[5][5] = { state: 'shaded', value: null, islandId: -1 };
      expect(checkWin(grid)).toBe(false);
    });

    it('returns false when 2x2 shaded block exists', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 1, islandId: 0 };
      grid[2][2] = { state: 'shaded', value: null, islandId: -1 };
      grid[2][3] = { state: 'shaded', value: null, islandId: -1 };
      grid[3][2] = { state: 'shaded', value: null, islandId: -1 };
      grid[3][3] = { state: 'shaded', value: null, islandId: -1 };
      expect(checkWin(grid)).toBe(false);
    });

    it('returns true for valid single-island puzzle', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 1, islandId: 0 };
      expect(checkWin(grid)).toBe(true);
    });

    it('returns true for connected shaded cells without 2x2', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 1, islandId: 0 };
      grid[3][0] = { state: 'shaded', value: null, islandId: -1 };
      grid[3][1] = { state: 'shaded', value: null, islandId: -1 };
      grid[3][2] = { state: 'shaded', value: null, islandId: -1 };
      expect(checkWin(grid)).toBe(true);
    });

    it('returns false when island size does not match value', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({
          state: 'empty' as const,
          value: null,
          islandId: -1,
        }))
      );
      grid[0][0] = { state: 'numbered', value: 2, islandId: 0 };
      grid[0][1] = { state: 'numbered', value: 2, islandId: 0 };
      grid[0][2] = { state: 'numbered', value: 2, islandId: 0 };
      expect(checkWin(grid)).toBe(false);
    });
  });
});
