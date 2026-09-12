import { SIZE, generatePuzzle, checkWin } from '../utils';
import { Grid } from '../types';

describe('Masyu utils', () => {
  describe('SIZE', () => {
    it('is 7', () => {
      expect(SIZE).toBe(7);
    });
  });

  describe('generatePuzzle', () => {
    it('returns pearls and solution', () => {
      const { pearls, solution } = generatePuzzle();
      expect(Array.isArray(pearls)).toBe(true);
      expect(solution).toHaveLength(SIZE);
    });

    it('solution grid has correct dimensions', () => {
      const { solution } = generatePuzzle();
      for (const row of solution) expect(row).toHaveLength(SIZE);
    });

    it('pearls have valid coordinates', () => {
      const { pearls } = generatePuzzle();
      for (const pearl of pearls) {
        expect(pearl.row).toBeGreaterThanOrEqual(0);
        expect(pearl.row).toBeLessThan(SIZE);
        expect(pearl.col).toBeGreaterThanOrEqual(0);
        expect(pearl.col).toBeLessThan(SIZE);
        expect(['black', 'white']).toContain(pearl.color);
      }
    });

    it('solution is a valid loop', () => {
      const { solution } = generatePuzzle();
      const loopCells: [number, number][] = [];
      for (let r = 0; r < SIZE; r++)
        for (let c = 0; c < SIZE; c++)
          if (solution[r][c]) loopCells.push([r, c]);

      if (loopCells.length > 0) {
        const DIRS: [number, number][] = [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
        ];
        for (const [r, c] of loopCells) {
          const neighbors = DIRS.filter(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;
            return (
              nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && solution[nr][nc]
            );
          });
          expect(neighbors.length).toBe(2);
        }
      }
    });
  });

  describe('checkWin', () => {
    it('returns false for empty grid', () => {
      const grid: Grid = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
      );
      expect(checkWin(grid, [])).toBe(false);
    });

    it('returns true for correct solution against pearls', () => {
      const { pearls, solution } = generatePuzzle();
      if (pearls.length > 0) {
        expect(checkWin(solution, pearls)).toBe(true);
      }
    });
  });
});
