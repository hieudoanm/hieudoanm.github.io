export interface RaceParams {
  v1: number; // Mean drift rate 1
  v2: number; // Mean drift rate 2
  noise: number; // Within-trial noise
  boundary: number; // Decision threshold
  t0: number; // Non-decision time
}

export interface RaceTrial {
  path1: number[];
  path2: number[];
  choice: 1 | 2;
  rt: number;
}

export interface RaceSimulationResult {
  trials: RaceTrial[];
  meanRT: number;
  accuracy: number;
}
