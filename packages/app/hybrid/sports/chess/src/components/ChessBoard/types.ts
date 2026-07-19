export type BoardMode = 'explore' | 'play';
export type SidePanel = 'position' | 'engine' | 'export' | 'openings' | 'setup';
export type Side = 'white' | 'black' | 'random';
export type Odds = 'none' | 'queen' | 'rook' | 'knight' | 'bishop';
export type BoardTheme = 'dark' | 'green' | 'blue';

export interface MoveRecord {
  san: string;
  fen: string;
}
