export type Claim = 'myth' | 'fact';
export type Phase = 'playing' | 'reveal' | 'done';

export interface MythFactItem {
  category: string;
  myth: string;
  fact: string;
  isTrue: boolean;
}

export interface RoundResult {
  item: MythFactItem;
  guess: Claim;
  correct: boolean;
}
