export type Door = 0 | 1 | 2;

export type Phase = 'pick' | 'reveal' | 'decide' | 'done';

export interface Tally {
  switchWins: number;
  stayWins: number;
  total: number;
}

export interface TrialResult {
  trial: number;
  prize: Door;
  picked: Door;
  revealed: Door;
  stayed: boolean;
  switchWon: boolean;
  stayWon: boolean;
}
