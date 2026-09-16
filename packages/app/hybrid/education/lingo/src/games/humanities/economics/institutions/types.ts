export interface Institutions {
  propertyRights: number;
  contracts: number;
  stability: number;
}

export type CountryPreset = 'extractive' | 'crony' | 'inclusive';

export type Phase = 'configure' | 'result';

export interface YearRecord {
  year: number;
  tfp: number;
  capital: number;
  gdp: number;
}

export interface SimulationResult {
  years: YearRecord[];
  gdpPerCapita: number;
  growthPct: number;
  investmentRate: number;
  tfp: number;
}

export interface GameState {
  phase: Phase;
  round: number;
  preset: CountryPreset | null;
  institutions: Institutions;
  targetGrowth: number;
  initialGdp: number;
  result: SimulationResult | null;
  success: boolean;
  roundsWon: number;
}

export type GameAction =
  | { type: 'SELECT_PRESET'; preset: CountryPreset }
  | { type: 'SET_INSTITUTION'; which: keyof Institutions; value: number }
  | { type: 'SIMULATE' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };
