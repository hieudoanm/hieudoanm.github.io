export interface ADDMParams {
  valueLeft: number; // Value of left option
  valueRight: number; // Value of right option
  d: number; // Scaling parameter for drift rate
  theta: number; // Attentional discount factor (0 = full bias, 1 = no bias)
  noise: number; // Within-trial noise
  boundary: number; // Decision threshold
  t0: number; // Non-decision time
}

export type FixationTarget = 'left' | 'right';

export interface ADDMTrial {
  path: number[];
  fixations: { target: FixationTarget; startStep: number; endStep: number }[];
  choice: 'left' | 'right';
  rt: number;
}

export interface ADDMSimulationResult {
  trials: ADDMTrial[];
  meanRT: number;
  probLeft: number;
}
