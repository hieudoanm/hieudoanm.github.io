export type Category =
  | 'war'
  | 'science'
  | 'politics'
  | 'sports'
  | 'music'
  | 'film'
  | 'technology'
  | 'space'
  | 'culture'
  | 'medicine';

export type Region =
  'world' | 'asia' | 'europe' | 'africa' | 'oceania' | 'americas';

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface HistoricalEvent {
  id: string;
  title: string;
  year: number;
  description: string;
  category: Category;
  region: Region;
  difficulty: Difficulty;
  source: string;
}

export type GameMode =
  'practice' | 'classic' | 'endless' | 'hardcore' | 'blitz';

export type DeckId =
  | 'world'
  | 'united-kingdom'
  | 'united-states'
  | 'vietnam'
  | 'china'
  | 'egypt'
  | 'greece'
  | 'india'
  | 'iraq'
  | 'italy'
  | 'south-africa'
  | 'mexico'
  | 'japan'
  | 'france'
  | 'germany';

export type GamePhase = 'menu' | 'playing' | 'reveal' | 'gameover' | 'browse';

export type HintLevel = 0 | 1 | 2 | 3;

export interface PlacementResult {
  correct: boolean;
  correctIndex: number;
  event: HistoricalEvent;
}

export interface GameStats {
  totalEvents: number;
  correctCount: number;
  currentStreak: number;
  bestStreak: number;
  score: number;
  hintsUsed: number;
}
