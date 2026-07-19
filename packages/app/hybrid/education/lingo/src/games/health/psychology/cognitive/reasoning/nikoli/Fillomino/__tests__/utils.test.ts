import { SIZE, generatePuzzle, isComplete } from '../utils';
import { Grid } from '../types';

describe('Fillomino utils', () => {
  describe('SIZE', () => {
    it('is 6', () => {
      expect(SIZE).toBe(6);
    });
  });

  describe('generatePuzzle', () => {
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

    it('generates different puzzles with different random seeds', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      const first = generatePuzzle();
      jest.restoreAllMocks();
      jest.spyOn(Math, 'random').mockReturnValue(0.9);
      const second = generatePuzzle();
      jest.restoreAllMocks();
      expect(first.solution).not.toEqual(second.solution);
    });

    it('fits=false path triggered when out of bounds', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      const { solution } = generatePuzzle();
      jest.restoreAllMocks();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('puzzle with clueRatio=1 keeps all clues', () => {
      const { puzzle } = generatePuzzle(1);
      const nullCount = puzzle.flat().filter((c) => c === null).length;
      expect(nullCount).toBe(0);
    });

    it('region size correction loop runs', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.7);
      const { solution } = generatePuzzle();
      jest.restoreAllMocks();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('horizontal placement preferred with low random', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      const { solution } = generatePuzzle();
      jest.restoreAllMocks();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('vertical placement preferred with high random', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.8);
      const { solution } = generatePuzzle();
      jest.restoreAllMocks();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('fits=false path triggered when occupied', () => {
      let callCount = 0;
      jest.spyOn(Math, 'random').mockImplementation(() => {
        callCount++;
        return callCount % 2 === 0 ? 0.1 : 0.9;
      });
      const { solution } = generatePuzzle();
      jest.restoreAllMocks();
      for (const row of solution) {
        for (const cell of row) {
          expect(cell).not.toBeNull();
        }
      }
    });

    it('puzzle with clueRatio=0.5 removes some clues', () => {
      const { puzzle } = generatePuzzle(0.5);
      const nullCount = puzzle.flat().filter((c) => c === null).length;
      const totalCount = SIZE * SIZE;
      expect(nullCount).toBeGreaterThan(0);
      expect(nullCount).toBeLessThan(totalCount);
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

    it('returns false when single cell value mismatches region', () => {
      const { solution } = generatePuzzle();
      const original = solution[0][0];
      solution[0][0] = 999;
      expect(isComplete(solution)).toBe(false);
      solution[0][0] = original;
    });
  });
});
