import { Grid } from './types';

export const SIZE = 6;

const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const inBounds = (r: number, c: number): boolean =>
  r >= 0 && r < SIZE && c >= 0 && c < SIZE;

const createEmptyGrid = (): Grid =>
  Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({
      state: 'empty' as const,
      value: null,
      islandId: -1,
    }))
  );

export const generatePuzzle = (): Grid => {
  const grid = createEmptyGrid();
  let islandId = 0;
  const sizes = [1, 1, 2, 2, 3, 3, 4];

  for (const size of sizes) {
    let placed = false;
    for (let attempt = 0; attempt < 50 && !placed; attempt++) {
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      if (grid[r][c].islandId !== -1) continue;

      const cells: [number, number][] = [[r, c]];
      const used = new Set<string>([`${r},${c}`]);

      while (cells.length < size) {
        const last = cells[cells.length - 1];
        const neighbors = DIRS.map(
          ([dr, dc]) => [last[0] + dr, last[1] + dc] as [number, number]
        ).filter(
          ([nr, nc]) =>
            inBounds(nr, nc) &&
            !used.has(`${nr},${nc}`) &&
            grid[nr][nc].islandId === -1
        );
        if (neighbors.length === 0) break;
        const [nr, nc] =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        cells.push([nr, nc]);
        used.add(`${nr},${nc}`);
      }

      if (cells.length === size) {
        for (const [cr, cc] of cells) {
          grid[cr][cc].islandId = islandId;
          grid[cr][cc].state = 'numbered';
          grid[cr][cc].value = size;
        }
        placed = true;
      }
    }
    if (placed) islandId++;
  }

  return grid;
};

export const checkWin = (grid: Grid): boolean => {
  const numberedCells = grid.flatMap((row, r) =>
    row
      .map((cell, c) => ({ ...cell, r, c }))
      .filter((cell) => cell.state === 'numbered')
  );

  const visited = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  for (const nc of numberedCells) {
    const val = nc.value!;
    const cells: [number, number][] = [[nc.r, nc.c]];
    const used = new Set<string>([`${nc.r},${nc.c}`]);
    let count = 0;

    while (cells.length > 0) {
      const [cr, cc] = cells.pop()!;
      count++;
      for (const [dr, dc] of DIRS) {
        const nr = cr + dr;
        const nc2 = cc + dc;
        const key = `${nr},${nc2}`;
        if (
          inBounds(nr, nc2) &&
          !used.has(key) &&
          grid[nr][nc2].state === 'numbered' &&
          grid[nr][nc2].value === val
        ) {
          used.add(key);
          cells.push([nr, nc2]);
        }
      }
    }

    if (count !== val) return false;
    for (const [cr, cc] of used)
      visited[+cr.split(',')[0]][+cc.split(',')[1]] = true;
  }

  const shaded = grid.flatMap((row, r) =>
    row
      .map((cell, c) => ({ ...cell, r, c }))
      .filter((cell) => cell.state === 'shaded')
  );

  for (const s of shaded) {
    for (const [dr, dc] of DIRS) {
      const nr = s.r + dr;
      const nc = s.c + dc;
      if (inBounds(nr, nc) && grid[nr][nc].state === 'numbered') return false;
    }
  }

  if (shaded.length === 0) return true;

  const shadeVisited = new Set<string>();
  const stack: [number, number][] = [[shaded[0].r, shaded[0].c]];
  shadeVisited.add(`${shaded[0].r},${shaded[0].c}`);
  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    for (const [dr, dc] of DIRS) {
      const nr = cr + dr;
      const nc = cc + dc;
      const key = `${nr},${nc}`;
      if (
        inBounds(nr, nc) &&
        !shadeVisited.has(key) &&
        grid[nr][nc].state === 'shaded'
      ) {
        shadeVisited.add(key);
        stack.push([nr, nc]);
      }
    }
  }
  if (shadeVisited.size !== shaded.length) return false;

  for (let r = 0; r < SIZE - 1; r++) {
    for (let c = 0; c < SIZE - 1; c++) {
      const block = [
        grid[r][c],
        grid[r][c + 1],
        grid[r + 1][c],
        grid[r + 1][c + 1],
      ];
      if (block.every((cell) => cell.state === 'shaded')) return false;
    }
  }

  return true;
};
