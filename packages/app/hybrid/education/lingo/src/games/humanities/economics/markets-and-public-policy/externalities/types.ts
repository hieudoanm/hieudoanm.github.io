export type GamePhase = 'pick' | 'result' | 'done';

export interface RoundResult {
  round: number;
  phase: number;
  q: number;
  price: number;
  revenue: number;
  prodCost: number;
  damage: number;
  taxPaid: number;
  profit: number;
  socialWelfare: number;
  callout: string;
}

export interface GameState {
  phase: GamePhase;
  round: number;
  q: number | null;
  result: RoundResult | null;
  results: RoundResult[];
}
