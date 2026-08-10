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
  });
});
