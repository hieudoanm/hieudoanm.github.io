export interface MarketParams {
  a: number;
  b: number;
  c: number;
}

export interface ExplorerState extends MarketParams {
  price: number;
  floorEnabled: boolean;
  ceilingEnabled: boolean;
  floor: number;
  ceiling: number;
}

export type MarketCondition = 'shortage' | 'surplus' | 'equilibrium';
