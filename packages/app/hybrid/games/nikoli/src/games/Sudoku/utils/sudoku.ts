import { Size, Grid } from '../types';

export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const createEmptyGrid = (size: Size): Grid =>
  Array.from({ length: size * size }, () => Array(size * size).fill(0));

export const isValid = (
  grid: Grid,
  row: number,
  col: number,
  num: number,
  size: Size
): boolean => {
  const N = size * size;
  for (let c = 0; c < N; c++) if (grid[row][c] === num) return false;
  for (let r = 0; r < N; r++) if (grid[r][col] === num) return false;
  const sr = Math.floor(row / size) * size,
    sc = Math.floor(col / size) * size;
  for (let r = sr; r < sr + size; r++)
    for (let c = sc; c < sc + size; c++) if (grid[r][c] === num) return false;
  return true;
};

export const solve = (grid: Grid, size: Size): Grid | null => {
  const N = size * size;
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 0) {
        for (let num = 1; num <= N; num++) {
          if (isValid(grid, r, c, num, size)) {
            grid[r][c] = num;
            if (solve(grid, size)) return grid;
            grid[r][c] = 0;
          }
        }
        return null;
      }
    }
  return grid;
};

export const countSolutions = (
  grid: Grid,
  size: Size,
  limit: number
): number => {
  const N = size * size;
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 0) {
        let count = 0;
        for (let num = 1; num <= N; num++) {
          if (!isValid(grid, r, c, num, size)) continue;
          grid[r][c] = num;
          count += countSolutions(grid, size, limit - count);
          grid[r][c] = 0;
          if (count >= limit) return count;
        }
        return count;
      }
    }
  return 1;
};

export const generatePuzzle = (
  size: Size,
  difficulty: number
): { puzzle: Grid; solution: Grid } => {
  const N = size * size;
  const grid: Grid = Array.from({ length: N }, () => Array(N).fill(0));
  const nums = shuffle(Array.from({ length: N }, (_, i) => i + 1));
  for (let c = 0; c < N; c++) grid[0][c] = nums[c];
  for (let r = 1; r < N; r++)
    for (let c = 0; c < N; c++) {
      const boxRow = Math.floor(r / size) * size + Math.floor(c / size);
      const offset = (r % size) * size + (c % size);
      grid[r][(boxRow * size + offset) % N] = grid[0][c];
    }
  for (let i = 0; i < N * N * 2; i++) {
    const r1 = Math.floor(Math.random() * N),
      c1 = Math.floor(Math.random() * N);
    const r2 = Math.floor(Math.random() * N),
      c2 = Math.floor(Math.random() * N);
    if (r1 !== r2 && c1 !== c2 && grid[r1][c1] !== 0 && grid[r2][c2] !== 0) {
      const t = grid[r1][c1];
      grid[r1][c1] = grid[r2][c2];
      grid[r2][c2] = t;
    }
  }
  const solution: Grid = grid.map((r) => [...r]);
  const puzzle: Grid = grid.map((r) => [...r]);
  const toRemove = Math.floor(N * N * (0.4 + difficulty * 0.35));
  let removed = 0;
  const cells = shuffle(
    Array.from({ length: N * N }, (_, i) => [Math.floor(i / N), i % N] as const)
  );
  for (const [r, c] of cells) {
    if (removed >= toRemove) break;
    const saved = puzzle[r][c];
    puzzle[r][c] = 0;
    const test = puzzle.map((row) => [...row]);
    if (countSolutions(test, size, 2) === 1) {
      removed++;
    } else {
      puzzle[r][c] = saved;
    }
  }
  return { puzzle, solution };
};

export const formatTime = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};
