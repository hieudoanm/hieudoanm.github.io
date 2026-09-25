export type PresetId = 'hawk-dove' | 'prisoner' | 'coordination';

export interface PayoffMatrix {
  aA: number;
  aB: number;
  bA: number;
  bB: number;
}

export interface FitnessSnapshot {
  fA: number;
  fB: number;
  mean: number;
}
