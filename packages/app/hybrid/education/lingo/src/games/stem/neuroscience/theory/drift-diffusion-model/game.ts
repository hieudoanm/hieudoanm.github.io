import type { DDMParams, DDMTrial, SimulationResult } from './types';

const DT = 0.001; // time step in seconds
const MAX_STEPS = 10_000;

/** Box–Muller transform — standard normal sample */
const sampleNormal = (): number => {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
};

const arrayMean = (arr: number[]): number => {
  return arr.length === 0 ? 0 : arr.reduce((s, v) => s + v, 0) / arr.length;
};

/** Run one DDM trial via Euler–Maruyama integration */
export const runTrial = (params: DDMParams): DDMTrial => {
  const { driftRate, boundary, startBias, noise, nonDecisionTime } = params;
  const upper = boundary;
  const lower = 0;
  let x = lower + startBias * boundary;
  const path: number[] = [x];

  for (let step = 0; step < MAX_STEPS; step++) {
    x += driftRate * DT + noise * Math.sqrt(DT) * sampleNormal();
    path.push(x);

    if (x >= upper) {
      return {
        path,
        correct: driftRate >= 0,
        rt: Math.round((step + 1) * DT * 1000 + nonDecisionTime),
        boundary: 'upper',
      };
    }
    if (x <= lower) {
      return {
        path,
        correct: driftRate < 0,
        rt: Math.round((step + 1) * DT * 1000 + nonDecisionTime),
        boundary: 'lower',
      };
    }
  }

  return {
    path,
    correct: false,
    rt: Math.round(MAX_STEPS * DT * 1000 + nonDecisionTime),
    boundary: 'lower',
  };
};

/** Aggregate N trials into summary statistics */
export const runSimulation = (
  params: DDMParams,
  nTrials: number = 100
): SimulationResult => {
  const trials = Array.from({ length: nTrials }, () => runTrial(params));
  const rts = trials.map((t) => t.rt);
  const correctRTs = trials.filter((t) => t.correct).map((t) => t.rt);
  const errorRTs = trials.filter((t) => !t.correct).map((t) => t.rt);

  return {
    trials,
    meanRT: arrayMean(rts),
    accuracy: trials.filter((t) => t.correct).length / nTrials,
    meanCorrectRT: arrayMean(correctRTs),
    meanErrorRT: arrayMean(errorRTs),
  };
};
