export type ElasticityClass = 'inelastic' | 'unit' | 'elastic';

export type Phase = 'choose' | 'reveal';

export interface Trial {
  price: number;
  quantity: number;
  revenue: number;
  guidance: string;
  optimal: boolean;
}

export interface RoundState {
  round: number;
  epsilon: number;
  trials: Trial[];
  bestRevenue: number;
  bestPrice: number;
  done: boolean;
}
