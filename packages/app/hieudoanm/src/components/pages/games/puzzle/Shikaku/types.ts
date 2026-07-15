export type Point = [number, number];

export type Region = {
  id: number;
  row: number;
  col: number;
  width: number;
  height: number;
};

export type Clue = {
  row: number;
  col: number;
  value: number;
};

export type PlacedRegion = {
  id: number;
  cells: Point[];
  clue: Clue;
};
