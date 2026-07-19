import { Cell, Pos } from './types';

export const createGrid = (rows: number, cols: number): Cell[][] =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      walls: { top: true, right: true, bottom: true, left: true },
      visited: false,
    }))
  );

export const generateMaze = (rows: number, cols: number): Cell[][] => {
  const grid = createGrid(rows, cols);
  const stack: Cell[] = [];
  const start = grid[0][0];
  start.visited = true;
  stack.push(start);

  const dirs = [
    [-1, 0, 'top', 'bottom'] as const,
    [0, 1, 'right', 'left'] as const,
    [1, 0, 'bottom', 'top'] as const,
    [0, -1, 'left', 'right'] as const,
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors: {
      cell: Cell;
      wall: 'top' | 'right' | 'bottom' | 'left';
      opp: 'top' | 'right' | 'bottom' | 'left';
    }[] = [];

    for (const [dr, dc, w, opp] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !grid[nr][nc].visited
      ) {
        neighbors.push({ cell: grid[nr][nc], wall: w, opp });
      }
    }

    if (neighbors.length > 0) {
      const { cell, wall, opp } =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      current.walls[wall] = false;
      cell.walls[opp] = false;
      cell.visited = true;
      stack.push(cell);
    } else {
      stack.pop();
    }
  }

  return grid;
};

export const solveMaze = (
  grid: Cell[][],
  start: Pos,
  end: Pos
): Pos[] | null => {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: (Pos | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  const queue: Pos[] = [start];
  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr.row === end.row && curr.col === end.col) {
      const path: Pos[] = [];
      let c: Pos | null = curr;
      while (c) {
        path.unshift(c);
        c = parent[c.row][c.col];
      }
      return path;
    }

    const cell = grid[curr.row][curr.col];
    const dirs: [number, number, keyof Cell['walls'], keyof Cell['walls']][] = [
      [-1, 0, 'top', 'bottom'],
      [0, 1, 'right', 'left'],
      [1, 0, 'bottom', 'top'],
      [0, -1, 'left', 'right'],
    ];

    for (const [dr, dc, w, opp] of dirs) {
      const nr = curr.row + dr;
      const nc = curr.col + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        !cell.walls[w] &&
        !grid[nr][nc].walls[opp]
      ) {
        visited[nr][nc] = true;
        parent[nr][nc] = curr;
        queue.push({ row: nr, col: nc });
      }
    }
  }

  return null;
};
