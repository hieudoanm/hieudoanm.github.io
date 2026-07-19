import type { DDMParams } from './types';

export const DEFAULT_PARAMS: DDMParams = {
  driftRate: 1.5,
  boundary: 1.5,
  startBias: 0.5,
  noise: 1.0,
  nonDecisionTime: 200,
};

export const N_SIM_TRIALS = 100;
