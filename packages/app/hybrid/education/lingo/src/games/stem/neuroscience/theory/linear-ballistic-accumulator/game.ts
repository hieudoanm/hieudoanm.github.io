import type { LBAParams, LBASimulationResult, LBATrial } from './types';

const DT = 0.001;
const MAX_STEPS = 5000;

const sampleNormal = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const sampleUniform = (max: number): number => {
  return Math.random() * max;
};

export const runLBATrial = (params: LBAParams): LBATrial => {
  const { v1, v2, s, A, b, t0 } = params;

  // Sample starting points U[0, A]
  const start1 = sampleUniform(A);
  const start2 = sampleUniform(A);

  // Sample drift rates N(v, s) - must be > 0 in LBA, usually truncated but we'll take absolute for simplicity
  const drift1 = Math.max(0.01, v1 + sampleNormal() * s);
  const drift2 = Math.max(0.01, v2 + sampleNormal() * s);

  const path1 = [start1];
  const path2 = [start2];

  let x1 = start1;
  let x2 = start2;

  for (let step = 1; step < MAX_STEPS; step++) {
    x1 += drift1 * DT;
    x2 += drift2 * DT;
    path1.push(x1);
    path2.push(x2);

    if (x1 >= b && x2 >= b) {
      // Tie goes to the one that crossed by more (or random)
      const choice = x1 > x2 ? 1 : 2;
      return { path1, path2, choice, rt: Math.round(step * DT * 1000 + t0) };
    }
    if (x1 >= b)
      return { path1, path2, choice: 1, rt: Math.round(step * DT * 1000 + t0) };
    if (x2 >= b)
      return { path1, path2, choice: 2, rt: Math.round(step * DT * 1000 + t0) };
  }

  // Timeout fallback
  return { path1, path2, choice: 1, rt: MAX_STEPS };
};

export const runLBASimulation = (
  params: LBAParams,
  nTrials = 100
): LBASimulationResult => {
  const trials = Array.from({ length: nTrials }, () => runLBATrial(params));
  const rts = trials.map((t) => t.rt);
  const meanRT = rts.length ? rts.reduce((a, b) => a + b) / rts.length : 0;
  const accuracy = trials.filter((t) => t.choice === 1).length / nTrials;

  return { trials, meanRT, accuracy };
};
