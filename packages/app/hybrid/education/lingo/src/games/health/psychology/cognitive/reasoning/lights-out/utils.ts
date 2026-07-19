export type Board = boolean[][];

export type Pos = [number, number];

export interface Puzzle {
  board: Board;
  solution: Pos[];
}

const DIRECTIONS: [number, number][] = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const createBoard = (size: number): Board =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => false));

export const getNeighbors = (row: number, col: number, size: number): Pos[] =>
  DIRECTIONS.map(([dr, dc]) => [row + dr, col + dc] as Pos).filter(
    ([r, c]) => r >= 0 && r < size && c >= 0 && c < size
  );

export const toggleCell = (board: Board, row: number, col: number): Board => {
  const next = board.map((cells) => [...cells]);
  for (const [r, c] of getNeighbors(row, col, board.length)) {
    next[r][c] = !next[r][c];
  }
  return next;
};

export const isSolved = (board: Board): boolean =>
  board.every((row) => row.every((cell) => !cell));

export const countLit = (board: Board): number =>
  board.reduce((total, row) => total + row.filter(Boolean).length, 0);

export const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const generatePuzzle = (size: number, moves: number): Puzzle => {
  const positions = shuffle(
    Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => [row, col] as Pos)
    ).flat()
  );

  const solution: Pos[] = [];
  let board = createBoard(size);
  for (const [row, col] of positions.slice(
    0,
    Math.min(moves, positions.length)
  )) {
    board = toggleCell(board, row, col);
    solution.push([row, col]);
  }

  return { board, solution };
};
