export interface LBAParams {
  v1: number; // Mean drift rate for accumulator 1
  v2: number; // Mean drift rate for accumulator 2
  s: number; // Standard deviation of drift rates across trials
  A: number; // Maximum starting point (U[0, A])
  b: number; // Decision threshold
  t0: number; // Non-decision time
}

export interface LBATrial {
  path1: number[]; // For drawing the trace
  path2: number[]; // For drawing the trace
  choice: 1 | 2;
  rt: number;
}

export interface LBASimulationResult {
  trials: LBATrial[];
  meanRT: number;
  accuracy: number;
}
