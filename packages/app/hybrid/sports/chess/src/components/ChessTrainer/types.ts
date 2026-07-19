export type TrainerTab =
  | 'tactics'
  | 'endgame'
  | 'mate'
  | 'opening'
  | 'coordinates'
  | 'perft'
  | 'variants';

export interface TacticsPuzzle {
  id: string;
  fen: string;
  rating: number;
  hint: string;
}

export interface EndgamePreset {
  id: string;
  label: string;
  material: 'KQ' | 'KR' | 'KBB' | 'KBN';
}

export interface OpeningCard {
  eco: string;
  name: string;
  pgn: string;
}

export type ReviewRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface ScheduleEntry {
  eco: string;
  name: string;
  reps: number;
  ease: number;
  interval: number;
  due: number;
}

export type VariantKind = 'three-check' | 'horde' | 'crazyhouse';
