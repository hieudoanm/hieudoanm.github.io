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

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateLoop = (): boolean[][] => {
  for (let attempt = 0; attempt < 20; attempt++) {
    const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
    const path: [number, number][] = [];
    const visited = new Set<string>();

    const startR = Math.floor(SIZE / 2);
    const startC = Math.floor(SIZE / 2);
    path.push([startR, startC]);
    visited.add(`${startR},${startC}`);

    let steps = 0;
    while (path.length < SIZE * 2 && steps < 500) {
      steps++;
      const last = path[path.length - 1];
      const shuffledDirs = shuffle(DIRS);
      let extended = false;
      for (const [dr, dc] of shuffledDirs) {
        const nr = last[0] + dr;
        const nc = last[1] + dc;
        const key = `${nr},${nc}`;
        if (inBounds(nr, nc) && !visited.has(key)) {
          let neighborCount = 0;
          for (const [ddr, ddc] of DIRS) {
            const nnr = nr + ddr;
            const nnc = nc + ddc;
            if (inBounds(nnr, nnc) && visited.has(`${nnr},${nnc}`))
              neighborCount++;
          }
          if (neighborCount <= 1) {
            path.push([nr, nc]);
            visited.add(key);
            extended = true;
            break;
          }
        }
      }
      if (!extended) break;
    }

    if (path.length < 4) continue;

    const lastCell = path[path.length - 1];
    const firstCell = path[0];
    const closingDist =
      Math.abs(lastCell[0] - firstCell[0]) +
      Math.abs(lastCell[1] - firstCell[1]);
    if (closingDist > 2) continue;

    for (const [r, c] of path) grid[r][c] = true;

    let changed = true;
    while (changed) {
      changed = false;
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          if (!grid[r][c]) continue;
          const neighborCount = DIRS.filter(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;
            return inBounds(nr, nc) && grid[nr][nc];
          }).length;
          if (neighborCount !== 2) {
            grid[r][c] = false;
            changed = true;
          }
        }
      }
    }

    const loopCells: [number, number][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++) if (grid[r][c]) loopCells.push([r, c]);

    if (loopCells.length < 4) continue;

    const connVisited = new Set<string>();
    const stack: [number, number][] = [loopCells[0]];
    connVisited.add(`${loopCells[0][0]},${loopCells[0][1]}`);
    while (stack.length > 0) {
      const [cr, cc] = stack.pop()!;
      for (const [dr, dc] of DIRS) {
        const nr = cr + dr;
        const nc = cc + dc;
        const key = `${nr},${nc}`;
        if (inBounds(nr, nc) && grid[nr][nc] && !connVisited.has(key)) {
          connVisited.add(key);
          stack.push([nr, nc]);
        }
      }
    }
    if (connVisited.size !== loopCells.length) continue;

    return grid;
  }

  const fallback = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  for (let r = 1; r < SIZE - 1; r++) fallback[r][1] = true;
  for (let c = 1; c < SIZE - 1; c++) fallback[SIZE - 2][c] = true;
  fallback[1][SIZE - 2] = true;
  for (let r = 1; r < SIZE - 1; r++) fallback[r][SIZE - 2] = true;
  for (let c = 1; c < SIZE - 1; c++) fallback[1][c] = true;
  return fallback;
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
