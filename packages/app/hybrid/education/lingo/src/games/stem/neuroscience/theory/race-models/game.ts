import type { RaceParams, RaceSimulationResult, RaceTrial } from './types';

const DT = 0.005; // dt
const MAX_STEPS = 2000;

const sampleNormal = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export const runRaceTrial = (params: RaceParams): RaceTrial => {
  const { v1, v2, noise, boundary, t0 } = params;

  let x1 = 0;
  let x2 = 0;

  const path1 = [x1];
  const path2 = [x2];

  for (let step = 1; step < MAX_STEPS; step++) {
    // Independent accumulation with noise
    x1 += v1 * DT + noise * Math.sqrt(DT) * sampleNormal();
    x2 += v2 * DT + noise * Math.sqrt(DT) * sampleNormal();

    // Typically race models don't go below 0
    x1 = Math.max(0, x1);
    x2 = Math.max(0, x2);

    path1.push(x1);
    path2.push(x2);

    if (x1 >= boundary && x2 >= boundary) {
      const choice = x1 > x2 ? 1 : 2;
      return { path1, path2, choice, rt: Math.round(step * DT * 1000 + t0) };
    }
    if (x1 >= boundary)
      return { path1, path2, choice: 1, rt: Math.round(step * DT * 1000 + t0) };
    if (x2 >= boundary)
      return { path1, path2, choice: 2, rt: Math.round(step * DT * 1000 + t0) };
  }

  return { path1, path2, choice: 1, rt: MAX_STEPS * DT * 1000 };
};

export const runRaceSimulation = (
  params: RaceParams,
  nTrials = 100
): RaceSimulationResult => {
  const trials = Array.from({ length: nTrials }, () => runRaceTrial(params));
  const rts = trials.map((t) => t.rt);
  const meanRT = rts.length ? rts.reduce((a, b) => a + b) / rts.length : 0;
  const accuracy = trials.filter((t) => t.choice === 1).length / nTrials;

  return { trials, meanRT, accuracy };
};
