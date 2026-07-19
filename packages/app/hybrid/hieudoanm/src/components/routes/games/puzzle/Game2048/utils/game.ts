import { Grid, Dir } from '../types';
import { SIZE } from '../constants';

export const empty = (): Grid =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
export const clone = (g: Grid): Grid => g.map((r) => [...r]);

export const randomEmpty = (g: Grid): [number, number] | null => {
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) cells.push([r, c]);
  if (cells.length === 0) return null;
  return cells[Math.floor(Math.random() * cells.length)];
};

export const spawn = (g: Grid): Grid => {
  const cell = randomEmpty(g);
  if (!cell) return g;
  const [r, c] = cell;
  const next = clone(g);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
};

export const init = (): Grid => spawn(spawn(empty()));

const slideRow = (row: number[]): { row: number[]; score: number } => {
  const filtered = row.filter((v) => v !== 0);
  const result: number[] = [];
  let score = 0;
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      score += filtered[i] * 2;
      i += 2;
    } else {
      result.push(filtered[i]);
      i++;
    }
  }
  while (result.length < SIZE) result.push(0);
  return { row: result, score };
};

export const move = (
  g: Grid,
  dir: Dir
): { grid: Grid; score: number; moved: boolean } => {
  const rotated = dir === 'UP' || dir === 'DOWN';
  const reverse = dir === 'DOWN' || dir === 'RIGHT';
  const rows: number[][] = [];
  for (let i = 0; i < SIZE; i++) {
    let row: number[];
    if (rotated) {
      row = [];
      for (let j = 0; j < SIZE; j++) row.push(g[j][i]);
    } else row = [...g[i]];
    if (reverse) row.reverse();
    rows.push(row);
  }
  let totalScore = 0;
  const slid = rows.map((r) => {
    const { row, score } = slideRow(r);
    totalScore += score;
    return reverse ? row.reverse() : row;
  });
  const result = clone(g);
  for (let i = 0; i < SIZE; i++)
    for (let j = 0; j < SIZE; j++) {
      if (rotated) result[j][i] = slid[i][j];
      else result[i][j] = slid[i][j];
    }
  const moved = JSON.stringify(result) !== JSON.stringify(g);
  return { grid: result, score: totalScore, moved };
};

export const canMove = (g: Grid): boolean => {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return true;
      if (c + 1 < SIZE && g[r][c] === g[r][c + 1]) return true;
      if (r + 1 < SIZE && g[r][c] === g[r + 1][c]) return true;
    }
  return false;
};
