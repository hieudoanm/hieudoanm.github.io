import { Carve, Cell, DIRECTIONS, Move, OPPOSITES, Pos } from './types';

const walledCell = (row: number, col: number): Cell => ({
  row,
  col,
  walls: { top: true, right: true, bottom: true, left: true },
  visited: false,
});

export const createGrid = (rows: number, cols: number): Cell[][] =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => walledCell(row, col))
  );

export const generateMaze = (rows: number, cols: number): Cell[][] => {
  const grid = createGrid(rows, cols);
  const stack: Cell[] = [grid[0][0]];
  grid[0][0].visited = true;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const options = DIRECTIONS.map(([dr, dc, wall]): Carve => ({
      to: grid[current.row + dr]?.[current.col + dc],
      wall,
      opposite: OPPOSITES[wall],
    })).filter((carve) => carve.to && !carve.to.visited) as Carve[];

    const next = options[Math.floor(Math.random() * options.length)];
    if (!next) {
      stack.pop();
      continue;
    }
    current.walls[next.wall] = false;
    next.to.walls[next.opposite] = false;
    next.to.visited = true;
    stack.push(next.to);
  }

  return grid;
};

export const openMoves = (grid: Cell[][], pos: Pos): Move[] =>
  DIRECTIONS.map(([dr, dc, wall]) => {
    const row = pos.row + dr;
    const col = pos.col + dc;
    return {
      from: pos,
      to: { row, col },
      wall,
      opposite: OPPOSITES[wall],
    };
  }).filter(
    (move) =>
      grid[move.to.row]?.[move.to.col] !== undefined &&
      !grid[pos.row][pos.col].walls[move.wall]
  );

export const solveMaze = (
  grid: Cell[][],
  start: Pos,
  end: Pos
): Pos[] | null => {
  const rows = grid.length;
  const cols = grid[0].length;
  const seen = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parents: (Pos | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  const queue: Pos[] = [start];
  seen[start.row][start.col] = true;

  while (queue.length > 0) {
    const current = queue.shift() as Pos;
    if (current.row === end.row && current.col === end.col) {
      const path: Pos[] = [];
      let node: Pos | null = current;
      while (node) {
        path.unshift(node);
        node = parents[node.row][node.col];
      }
      return path;
    }

    for (const move of openMoves(grid, current)) {
      const { row, col } = move.to;
      if (seen[row][col]) continue;
      seen[row][col] = true;
      parents[row][col] = current;
      queue.push(move.to);
    }
  }

  return null;
};

export const pathToMoves = (path: Pos[]): [Pos, Pos][] =>
  path.slice(1).map((to, index) => [path[index], to]);

export const countOpenWalls = (grid: Cell[][]): number =>
  grid.reduce(
    (total, row) =>
      total +
      row.filter((cell) => Object.values(cell.walls).some(Boolean)).length,
    0
  );
