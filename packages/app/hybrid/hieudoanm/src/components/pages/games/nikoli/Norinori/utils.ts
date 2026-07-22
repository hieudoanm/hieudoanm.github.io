import { ClueCounts, Grid } from './types';

export const SIZE = 6;

const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const inBounds = (r: number, c: number): boolean =>
  r >= 0 && r < SIZE && c >= 0 && c < SIZE;

export const generatePuzzle = (): {
  solution: Grid;
  clues: ClueCounts;
} => {
  const dominoId = Array.from({ length: SIZE }, () => Array(SIZE).fill(-1));
  let id = 0;

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (dominoId[r][c] !== -1) continue;

      const horizontal = c + 1 < SIZE && dominoId[r][c + 1] === -1;
      const vertical = r + 1 < SIZE && dominoId[r + 1][c] === -1;

      let placed = false;
      if (horizontal && (!vertical || Math.random() < 0.5)) {
        dominoId[r][c] = id;
        dominoId[r][c + 1] = id;
        placed = true;
      } else if (vertical) {
        dominoId[r][c] = id;
        dominoId[r + 1][c] = id;
        placed = true;
      }

      if (!placed) dominoId[r][c] = id;
      id++;
    }
  }

  const shaded = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  for (let rid = 0; rid < id; rid++) {
    const cells: [number, number][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (dominoId[r][c] === rid) cells.push([r, c]);
    if (cells.length === 2) {
      const idx = Math.random() < 0.5 ? 0 : 1;
      shaded[cells[idx][0]][cells[idx][1]] = true;
    }
  }

  const rows = Array(SIZE).fill(0);
  const cols = Array(SIZE).fill(0);
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (shaded[r][c]) {
        rows[r]++;
        cols[c]++;
      }

  return { solution: shaded, clues: { rows, cols } };
};

export const isAdjacentToShaded = (grid: Grid, r: number, c: number): boolean =>
  DIRS.some(([dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    return inBounds(nr, nc) && grid[nr][nc];
  });

export const validate = (grid: Grid, clues: ClueCounts): boolean => {
  for (let r = 0; r < SIZE; r++) {
    let count = 0;
    for (let c = 0; c < SIZE; c++) if (grid[r][c]) count++;
    if (count !== clues.rows[r]) return false;
  }
  for (let c = 0; c < SIZE; c++) {
    let count = 0;
    for (let r = 0; r < SIZE; r++) if (grid[r][c]) count++;
    if (count !== clues.cols[c]) return false;
  }
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] && isAdjacentToShaded(grid, r, c)) return false;
  return true;
};
