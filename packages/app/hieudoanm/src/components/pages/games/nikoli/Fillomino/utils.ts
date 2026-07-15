import { Grid } from './types';

export const SIZE = 6;

const createEmpty = (): Grid =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const inBounds = (r: number, c: number): boolean =>
  r >= 0 && r < SIZE && c >= 0 && c < SIZE;

const getRegion = (grid: Grid, r: number, c: number): [number, number][] => {
  const val = grid[r][c];
  if (val === null) return [];
  const visited = new Set<string>();
  const cells: [number, number][] = [];
  const stack: [number, number][] = [[r, c]];
  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    const key = `${cr},${cc}`;
    if (visited.has(key)) continue;
    if (!inBounds(cr, cc) || grid[cr][cc] !== val) continue;
    visited.add(key);
    cells.push([cr, cc]);
    for (const [dr, dc] of DIRS) stack.push([cr + dr, cc + dc]);
  }
  return cells;
};

const isValidPlacement = (
  grid: Grid,
  r: number,
  c: number,
  val: number
): boolean => {
  const temp = grid.map((row) => [...row]);
  temp[r][c] = val;
  const region = getRegion(temp, r, c);
  if (region.length > val) return false;
  for (const [rr, cc] of region) {
    const neighbors = DIRS.map(
      ([dr, dc]) => [rr + dr, cc + dc] as [number, number]
    ).filter(([nr, nc]) => inBounds(nr, nc));
    const sameCount = neighbors.filter(
      ([nr, nc]) => temp[nr][nc] === val
    ).length;
    if (sameCount > 2) return false;
  }
  return true;
};

export const generatePuzzle = (
  clueRatio = 0.35
): { solution: Grid; puzzle: Grid } => {
  const solution = createEmpty();

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (solution[r][c] !== null) continue;

      const maxLen = Math.min(SIZE - c, SIZE - r, 5);
      const len = 1 + Math.floor(Math.random() * maxLen);
      const horizontal = Math.random() < 0.5;

      let fits = true;
      const cells: [number, number][] = [];
      for (let i = 0; i < len; i++) {
        const nr = horizontal ? r : r + i;
        const nc = horizontal ? c + i : c;
        if (!inBounds(nr, nc) || solution[nr][nc] !== null) {
          fits = false;
          break;
        }
        cells.push([nr, nc]);
      }

      if (fits) {
        for (const [nr, nc] of cells) solution[nr][nc] = len;
      } else {
        solution[r][c] = 1;
      }
    }
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = solution[r][c]!;
      const region = getRegion(solution, r, c);
      if (region.length !== val) {
        for (const [rr, cc] of region) solution[rr][cc] = region.length;
      }
    }
  }

  const puzzle = solution.map((row) => [...row]);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (Math.random() > clueRatio) puzzle[r][c] = null;
    }
  }

  return { solution, puzzle };
};

export const isComplete = (grid: Grid): boolean => {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (grid[r][c] === null) return false;

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const region = getRegion(grid, r, c);
      const val = grid[r][c];
      if (region.length !== val) return false;
    }
  }
  return true;
};
