import { Clue, Point, Region } from './types';

export const ROWS = 6;
export const COLS = 6;

const COLORS = [
  'oklch(0.85 0.15 250)',
  'oklch(0.85 0.15 30)',
  'oklch(0.85 0.15 150)',
  'oklch(0.85 0.15 280)',
  'oklch(0.85 0.15 60)',
  'oklch(0.85 0.15 330)',
  'oklch(0.85 0.15 200)',
  'oklch(0.85 0.15 100)',
  'oklch(0.85 0.15 210)',
  'oklch(0.85 0.15 350)',
  'oklch(0.85 0.15 170)',
  'oklch(0.85 0.15 80)',
];

export const getRegionColor = (regionId: number): string =>
  COLORS[regionId % COLORS.length];

let regionCounter = 0;

const STOP_THRESHOLD = 8;

const split = (
  row: number,
  col: number,
  width: number,
  height: number,
  regions: Region[]
): void => {
  const area = width * height;

  if (area <= STOP_THRESHOLD && Math.random() < 0.6) {
    regions.push({ id: regionCounter++, row, col, width, height });
    return;
  }

  const canSplitH = width > 1;
  const canSplitV = height > 1;

  if (!canSplitH && !canSplitV) {
    regions.push({ id: regionCounter++, row, col, width, height });
    return;
  }

  const splitH = canSplitH && (!canSplitV || Math.random() < 0.5);

  if (splitH) {
    const pos = 1 + Math.floor(Math.random() * (width - 1));
    split(row, col, pos, height, regions);
    split(row, col + pos, width - pos, height, regions);
  } else {
    const pos = 1 + Math.floor(Math.random() * (height - 1));
    split(row, col, width, pos, regions);
    split(row + pos, col, width, height - pos, regions);
  }
};

export const generateRegions = (rows: number, cols: number): Region[] => {
  regionCounter = 0;
  const regions: Region[] = [];
  split(0, 0, cols, rows, regions);
  return regions;
};

export const placeClues = (regions: Region[]): Clue[] =>
  regions.map((r) => ({
    row: r.row + Math.floor(r.height / 2),
    col: r.col + Math.floor(r.width / 2),
    value: r.width * r.height,
  }));

export const getRectangleCells = (a: Point, b: Point): Point[] => {
  const minR = Math.min(a[0], b[0]);
  const maxR = Math.max(a[0], b[0]);
  const minC = Math.min(a[1], b[1]);
  const maxC = Math.max(a[1], b[1]);
  const cells: Point[] = [];
  for (let r = minR; r <= maxR; r++)
    for (let c = minC; c <= maxC; c++) cells.push([r, c]);
  return cells;
};

export const validateRegion = (
  clues: Clue[],
  start: Point,
  end: Point,
  assigned: boolean[][]
): { valid: boolean; clue?: Clue } => {
  const cells = getRectangleCells(start, end);
  const area = cells.length;

  const cluesInRect = clues.filter(
    (cl) =>
      cl.row >= Math.min(start[0], end[0]) &&
      cl.row <= Math.max(start[0], end[0]) &&
      cl.col >= Math.min(start[1], end[1]) &&
      cl.col <= Math.max(start[1], end[1])
  );

  if (cluesInRect.length !== 1) return { valid: false };
  if (cluesInRect[0].value !== area) return { valid: false };

  for (const [r, c] of cells) {
    if (assigned[r]?.[c]) return { valid: false };
  }

  return { valid: true, clue: cluesInRect[0] };
};
