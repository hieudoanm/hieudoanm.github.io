export interface PuzzleGroup {
  label: string;
  members: [string, string, string, string];
}

export interface Puzzle {
  id: number;
  groups: PuzzleGroup[];
}

export type Tile = { country: string };

export interface SolvedGroup extends PuzzleGroup {
  color: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';
