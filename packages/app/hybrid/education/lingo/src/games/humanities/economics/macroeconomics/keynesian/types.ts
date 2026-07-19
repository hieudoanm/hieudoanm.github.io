export type Phase = 'explore' | 'choose' | 'reveal' | 'done';

export type ExploreField = 'mpc' | 'a' | 'investment' | 'government';

export interface RoundProfile {
  mpc: number;
  a: number;
  investment: number;
  government: number;
  target: number;
}

export interface RoundResult {
  round: number;
  mpc: number;
  a: number;
  investment: number;
  government: number;
  target: number;
  gap: number;
  requiredDeltaG: number;
  chosenDeltaG: number;
  newEquilibrium: number;
  plannedExpenditure: number;
  unplannedInventory: number;
  score: number;
}
