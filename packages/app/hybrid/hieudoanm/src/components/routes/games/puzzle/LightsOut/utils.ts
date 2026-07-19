export type Board = boolean[][];

export const createBoard = (n: number): Board =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => false));

const DIRS: [number, number][] = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const getNeighbors = (
  row: number,
  col: number,
  n: number
): [number, number][] =>
  DIRS.map(([dr, dc]) => [row + dr, col + dc] as [number, number]).filter(
    ([r, c]) => r >= 0 && r < n && c >= 0 && c < n
  );

export const toggleCell = (board: Board, row: number, col: number): Board => {
  const n = board.length;
  const next = board.map((r) => [...r]);
  for (const [r, c] of getNeighbors(row, col, n)) {
    next[r][c] = !next[r][c];
  }
  return next;
};

export const isSolved = (board: Board): boolean =>
  board.every((row) => row.every((cell) => !cell));

export const generatePuzzle = (
  n: number,
  moves = 8
): { board: Board; solution: [number, number][] } => {
  const solution: [number, number][] = [];
  let board = createBoard(n);
  const positions: [number, number][] = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) positions.push([r, c]);

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const count = Math.min(moves, positions.length);
  for (let i = 0; i < count; i++) {
    const [r, c] = positions[i];
    board = toggleCell(board, r, c);
    solution.push([r, c]);
  }

  return { board, solution };
};
