export type GamePhase = 'choose' | 'reveal' | 'done';

export type Guidance = 'below-optimum' | 'above-optimum' | 'optimal';

export interface RoundResult {
  round: number;
  q: number;
  price: number;
  tr: number;
  tc: number;
  profit: number;
  dwl: number;
  guidance: Guidance;
}
