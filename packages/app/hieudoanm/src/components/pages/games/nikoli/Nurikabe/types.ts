export type CellState = 'empty' | 'shaded' | 'numbered';
export type Grid = {
  state: CellState;
  value: number | null;
  islandId: number;
}[][];
