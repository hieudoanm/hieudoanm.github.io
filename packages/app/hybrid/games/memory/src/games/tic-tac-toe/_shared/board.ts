export type Player = 'X' | 'O';

export type Cell = Player | null;

export type Board = Cell[];

export interface WinResult {
  player: Player;
  cells: number[];
}

export const BOARD_SIZE = 9;

export const WIN: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createBoard = (): Board =>
  new Array<Player | null>(BOARD_SIZE).fill(null);

export const isBoardFull = (board: Board): boolean =>
  board.every((cell) => cell !== null);

/** Returns the winning line if any player owns three cells in a row. */
export const findWinner = (board: Board): WinResult | null => {
  for (const combo of WIN) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a] as Player, cells: combo };
    }
  }
  return null;
};

/**
 * Returns a completed line regardless of owner — used by misere variants
 * (Notakto / Reverse) where completing a row means losing.
 */
export const findCompletedLine = (board: Board): number[] | null => {
  for (const combo of WIN) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
};
