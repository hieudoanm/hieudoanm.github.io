export interface Components {
  consumption: number;
  investment: number;
  government: number;
  netExports: number;
}

export interface RoundResult {
  round: number;
  target: number;
  actual: number;
  solved: boolean;
}

export type Phase = 'explore' | 'round' | 'summary';
