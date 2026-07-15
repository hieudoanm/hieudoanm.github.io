export type Room = {
  id: number;
  cells: [number, number][];
  clue: number | null;
};

export type Grid = { shaded: boolean; roomId: number }[][];
