export interface DDMParams {
  driftRate: number; // v: evidence quality (-3 to 3)
  boundary: number; // a: decision threshold (0.5 to 3)
  startBias: number; // z: starting point fraction (0 to 1, 0.5 = unbiased)
  noise: number; // σ: within-trial noise (0.1 to 2)
  nonDecisionTime: number; // t0 in ms (0 to 500)
}

export interface DDMTrial {
  path: number[]; // accumulator values at each step
  correct: boolean;
  rt: number; // reaction time in ms
  boundary: 'upper' | 'lower';
}

export interface SimulationResult {
  trials: DDMTrial[];
  meanRT: number;
  accuracy: number;
  meanCorrectRT: number;
  meanErrorRT: number;
}
