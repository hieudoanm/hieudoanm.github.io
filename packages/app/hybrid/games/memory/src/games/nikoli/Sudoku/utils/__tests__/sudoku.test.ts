import {
  shuffle,
  createEmptyGrid,
  isValid,
  solve,
  countSolutions,
  generatePuzzle,
  formatTime,
} from '../sudoku';
import { Size, Grid } from '../../types';

describe('shuffle', () => {
  it('returns array of same length', () => {
    expect(shuffle([1, 2, 3, 4])).toHaveLength(4);
  });

  it('contains same elements', () => {
    expect(shuffle([1, 2, 3, 4]).sort()).toEqual([1, 2, 3, 4]);
  });
});

describe('createEmptyGrid', () => {
  it('creates a 9x9 grid for size=3', () => {
    const grid = createEmptyGrid(3);
    expect(grid).toHaveLength(9);
    grid.forEach((row) => expect(row).toHaveLength(9));
    expect(grid[0][0]).toBe(0);
  });
});

describe('isValid', () => {
  it('returns true for valid placement', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    expect(isValid(grid, 0, 0, 5, 3)).toBe(true);
  });

  it('returns false for duplicate in row', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    grid[0][1] = 5;
    expect(isValid(grid, 0, 3, 5, 3)).toBe(false);
  });

  it('returns false for duplicate in col', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    grid[1][0] = 5;
    expect(isValid(grid, 3, 0, 5, 3)).toBe(false);
  });
});

describe('solve', () => {
  it('solves a valid puzzle', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    grid[0] = [5, 3, 0, 0, 7, 0, 0, 0, 0];
    grid[1] = [6, 0, 0, 1, 9, 5, 0, 0, 0];
    grid[2] = [0, 9, 8, 0, 0, 0, 0, 6, 0];
    grid[3] = [8, 0, 0, 0, 6, 0, 0, 0, 3];
    grid[4] = [4, 0, 0, 8, 0, 3, 0, 0, 1];
    grid[5] = [7, 0, 0, 0, 2, 0, 0, 0, 6];
    grid[6] = [0, 6, 0, 0, 0, 0, 2, 8, 0];
    grid[7] = [0, 0, 0, 4, 1, 9, 0, 0, 5];
    grid[8] = [0, 0, 0, 0, 8, 0, 0, 7, 9];
    const result = solve(grid, 3);
    expect(result).not.toBeNull();
    expect(result![0][0]).toBe(5);
  });

  it('returns null for unsolvable puzzle', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    grid[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    grid[1] = [1, 0, 0, 0, 0, 0, 0, 0, 0];
    const result = solve(grid, 3);
    expect(result).toBeNull();
  });
});

describe('countSolutions', () => {
  it('counts solutions in empty grid', () => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    expect(countSolutions(grid, 3, 10)).toBeGreaterThanOrEqual(1);
  });
});

describe('generatePuzzle', () => {
  it('generates puzzle with solution', () => {
    const { puzzle, solution } = generatePuzzle(3, 0.5);
    expect(solution.length).toBe(9);
    expect(puzzle.length).toBe(9);
  });
});

describe('formatTime', () => {
  it('formats zero seconds', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('formats 125 seconds', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('formats 3600 seconds', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
});
