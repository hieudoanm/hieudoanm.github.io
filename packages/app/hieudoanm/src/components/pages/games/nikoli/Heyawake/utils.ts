import { Grid, Room } from './types';

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
    Array.from({ length: SIZE }, () => ({ shaded: false, roomId: -1 }))
  );

const generateRooms = (): Room[] => {
  const grid = createEmptyGrid();
  let roomId = 0;
  const rooms: Room[] = [];

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c].roomId !== -1) continue;

      const roomSize = 2 + Math.floor(Math.random() * 3);
      const cells: [number, number][] = [[r, c]];
      grid[r][c].roomId = roomId;

      while (cells.length < roomSize) {
        const last = cells[cells.length - 1];
        const neighbors = DIRS.map(
          ([dr, dc]) => [last[0] + dr, last[1] + dc] as [number, number]
        ).filter(([nr, nc]) => inBounds(nr, nc) && grid[nr][nc].roomId === -1);
        if (neighbors.length === 0) break;
        const [nr, nc] =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        cells.push([nr, nc]);
        grid[nr][nc].roomId = roomId;
      }

      rooms.push({ id: roomId, cells, clue: null });
      roomId++;
    }
  }

  for (const room of rooms) {
    let shaded = 0;
    for (const [r, c] of room.cells) {
      if (Math.random() < 0.3) {
        grid[r][c].shaded = true;
        shaded++;
      }
    }
    room.clue = shaded;
  }

  return rooms;
};

export const generatePuzzle = (): { grid: Grid; rooms: Room[] } => {
  const rooms = generateRooms();
  const grid = createEmptyGrid();

  for (const room of rooms) {
    for (const [r, c] of room.cells) {
      grid[r][c].roomId = room.id;
    }
  }

  return { grid, rooms };
};

export const checkWin = (grid: Grid, rooms: Room[]): boolean => {
  for (const room of rooms) {
    let count = 0;
    for (const [r, c] of room.cells) if (grid[r][c].shaded) count++;
    if (room.clue !== null && count !== room.clue) return false;
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c].shaded) {
        for (const [dr, dc] of DIRS) {
          const nr = r + dr;
          const nc = c + dc;
          if (inBounds(nr, nc) && grid[nr][nc].shaded) return false;
        }
      }
    }
  }

  const whiteCells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c].shaded) whiteCells.push([r, c]);

  if (whiteCells.length === 0) return false;

  const visited = new Set<string>();
  const stack: [number, number][] = [whiteCells[0]];
  visited.add(`${whiteCells[0][0]},${whiteCells[0][1]}`);
  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    for (const [dr, dc] of DIRS) {
      const nr = cr + dr;
      const nc = cc + dc;
      const key = `${nr},${nc}`;
      if (inBounds(nr, nc) && !visited.has(key) && !grid[nr][nc].shaded) {
        visited.add(key);
        stack.push([nr, nc]);
      }
    }
  }
  if (visited.size !== whiteCells.length) return false;

  for (let r = 0; r < SIZE - 1; r++) {
    for (let c = 0; c < SIZE - 1; c++) {
      const block = [
        grid[r][c],
        grid[r][c + 1],
        grid[r + 1][c],
        grid[r + 1][c + 1],
      ];
      if (block.every((cell) => !cell.shaded)) return false;
    }
  }

  return true;
};
