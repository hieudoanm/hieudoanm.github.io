export interface LCAParams {
  v1: number; // Input for accumulator 1
  v2: number; // Input for accumulator 2
  lambda: number; // Leakage (λ)
  beta: number; // Lateral inhibition (β)
  noise: number; // Within-trial noise (σ)
  startBias: number; // Initial activation (0-1)
  boundary: number; // Decision threshold
  t0: number; // Non-decision time
}

export interface LCATrial {
  path1: number[];
  path2: number[];
  choice: 1 | 2;
  rt: number;
}

export interface LCASimulationResult {
  trials: LCATrial[];
  meanRT: number;
  accuracy: number;
}
