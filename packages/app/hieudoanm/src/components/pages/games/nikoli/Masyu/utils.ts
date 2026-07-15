import { Grid, Pearl, PearlColor } from './types';

export const SIZE = 7;

const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const inBounds = (r: number, c: number): boolean =>
  r >= 0 && r < SIZE && c >= 0 && c < SIZE;

const areOpposite = (d1: number, d2: number): boolean => (d1 + 2) % 4 === d2;

const arePerpendicular = (d1: number, d2: number): boolean =>
  Math.abs(d1 - d2) % 2 === 1;

const generateLoop = (): boolean[][] => {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  const r = Math.floor(SIZE / 2);
  const c = Math.floor(SIZE / 2);
  grid[r][c] = true;

  const cells: [number, number][] = [[r, c]];
  let attempts = 0;

  while (cells.length < SIZE * 2 && attempts < 200) {
    attempts++;
    const [cr, cc] = cells[Math.floor(Math.random() * cells.length)];
    const dir = DIRS[Math.floor(Math.random() * 4)];
    const len = 1 + Math.floor(Math.random() * 3);
    const newCells: [number, number][] = [];
    let valid = true;

    for (let i = 1; i <= len; i++) {
      const nr = cr + dir[0] * i;
      const nc = cc + dir[1] * i;
      if (!inBounds(nr, nc)) {
        valid = false;
        break;
      }
      if (grid[nr][nc]) break;
      const neighbors = DIRS.filter(([dr, dc]) => {
        const nnr = nr + dr;
        const nnc = nc + dc;
        return (
          inBounds(nnr, nnc) && grid[nnr][nnc] && !(nnr === cr && nnc === cc)
        );
      });
      if (neighbors.length > 1) {
        valid = false;
        break;
      }
      newCells.push([nr, nc]);
    }

    if (valid && newCells.length > 0) {
      for (const [nr, nc] of newCells) {
        grid[nr][nc] = true;
        cells.push([nr, nc]);
      }
    }
  }

  return grid;
};

const placePearls = (loop: Grid): Pearl[] => {
  const pearls: Pearl[] = [];
  const loopCells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (loop[r][c]) loopCells.push([r, c]);

  for (const [r, c] of loopCells) {
    const neighbors = DIRS.filter(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      return inBounds(nr, nc) && loop[nr][nc];
    });

    if (neighbors.length === 2) {
      const d1 = DIRS.findIndex(
        ([dr, dc]) => dr === neighbors[0][0] && dc === neighbors[0][1]
      );
      const d2 = DIRS.findIndex(
        ([dr, dc]) => dr === neighbors[1][0] && dc === neighbors[1][1]
      );

      let color: PearlColor;
      if (areOpposite(d1, d2)) {
        color = 'white';
      } else if (arePerpendicular(d1, d2)) {
        color = 'black';
      } else {
        continue;
      }

      if (Math.random() < 0.25) {
        pearls.push({ row: r, col: c, color });
      }
    }
  }

  if (pearls.length < 4) {
    const candidates = loopCells.filter(
      ([r, c]) => !pearls.some((p) => p.row === r && p.col === c)
    );
    const shuffled = candidates.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(6, shuffled.length); i++) {
      const [r, c] = shuffled[i];
      const neighbors = DIRS.filter(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        return inBounds(nr, nc) && loop[nr][nc];
      });
      if (neighbors.length === 2) {
        const d1 = DIRS.findIndex(
          ([dr, dc]) => dr === neighbors[0][0] && dc === neighbors[0][1]
        );
        const d2 = DIRS.findIndex(
          ([dr, dc]) => dr === neighbors[1][0] && dc === neighbors[1][1]
        );
        const color: PearlColor = areOpposite(d1, d2) ? 'white' : 'black';
        pearls.push({ row: r, col: c, color });
      }
    }
  }

  return pearls;
};

export const generatePuzzle = (): { pearls: Pearl[]; solution: Grid } => {
  const solution = generateLoop();
  const pearls = placePearls(solution);
  return { pearls, solution };
};

export const checkWin = (grid: Grid, pearls: Pearl[]): boolean => {
  const loopCells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (grid[r][c]) loopCells.push([r, c]);

  for (const pearl of pearls) {
    if (!grid[pearl.row][pearl.col]) return false;
  }

  if (loopCells.length === 0) return false;

  for (const [r, c] of loopCells) {
    const neighbors = DIRS.filter(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      return inBounds(nr, nc) && grid[nr][nc];
    });
    if (neighbors.length !== 2) return false;
  }

  const visited = new Set<string>();
  const stack: [number, number][] = [loopCells[0]];
  visited.add(`${loopCells[0][0]},${loopCells[0][1]}`);
  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    for (const [dr, dc] of DIRS) {
      const nr = cr + dr;
      const nc = cc + dc;
      const key = `${nr},${nc}`;
      if (inBounds(nr, nc) && !visited.has(key) && grid[nr][nc]) {
        visited.add(key);
        stack.push([nr, nc]);
      }
    }
  }
  if (visited.size !== loopCells.length) return false;

  for (const pearl of pearls) {
    const neighbors = DIRS.filter(([dr, dc]) => {
      const nr = pearl.row + dr;
      const nc = pearl.col + dc;
      return inBounds(nr, nc) && grid[nr][nc];
    });

    if (neighbors.length !== 2) return false;

    const d1 = DIRS.findIndex(
      ([dr, dc]) => dr === neighbors[0][0] && dc === neighbors[0][1]
    );
    const d2 = DIRS.findIndex(
      ([dr, dc]) => dr === neighbors[1][0] && dc === neighbors[1][1]
    );

    if (pearl.color === 'white') {
      if (!areOpposite(d1, d2)) return false;
    } else {
      if (!arePerpendicular(d1, d2)) return false;
      const straightDirs = DIRS.filter(([dr, dc]) => {
        const nr = pearl.row + dr;
        const nc = pearl.col + dc;
        return inBounds(nr, nc) && grid[nr][nc];
      });
      for (const [dr, dc] of straightDirs) {
        const nr2 = pearl.row + dr * 2;
        const nc2 = pearl.col + dc * 2;
        if (inBounds(nr2, nc2) && !grid[nr2][nc2]) return false;
      }
    }
  }

  return true;
};
