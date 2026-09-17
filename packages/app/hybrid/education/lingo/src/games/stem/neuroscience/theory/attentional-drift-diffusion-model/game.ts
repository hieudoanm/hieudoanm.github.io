import type {
  ADDMParams,
  ADDMSimulationResult,
  ADDMTrial,
  FixationTarget,
} from './types';

const DT = 0.001; // dt
const MAX_STEPS = 10000;

const sampleNormal = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

// Generates alternating fixations (e.g. L, R, L...) with some random duration
const generateFixations = (): {
  target: FixationTarget;
  durationSteps: number;
}[] => {
  const fixations: { target: FixationTarget; durationSteps: number }[] = [];
  let currentTarget: FixationTarget = Math.random() < 0.5 ? 'left' : 'right';

  // Create enough fixations to cover MAX_STEPS (average 400ms per fixation = 400 steps)
  for (let i = 0; i < 30; i++) {
    const durationMs = 200 + Math.random() * 400; // 200-600ms
    fixations.push({
      target: currentTarget,
      durationSteps: Math.round(durationMs),
    });
    currentTarget = currentTarget === 'left' ? 'right' : 'left';
  }
  return fixations;
};

export const runADDMTrial = (params: ADDMParams): ADDMTrial => {
  const { valueLeft, valueRight, d, theta, noise, boundary, t0 } = params;

  let x = 0; // Starts at 0, boundary is [-b, +b]. Left is +b, Right is -b.
  const path = [x];

  const fixationsSequence = generateFixations();
  const trialFixations: {
    target: FixationTarget;
    startStep: number;
    endStep: number;
  }[] = [];

  let currentFixationIdx = 0;
  let stepsInCurrentFixation = 0;

  for (let step = 1; step < MAX_STEPS; step++) {
    const currentFixation = fixationsSequence[currentFixationIdx];

    // Record fixation start
    if (stepsInCurrentFixation === 0) {
      trialFixations.push({
        target: currentFixation.target,
        startStep: step,
        endStep: step,
      });
    }

    // Calculate drift based on current fixation
    // If looking Left: d * (V_L - theta * V_R)
    // If looking Right: d * (theta * V_L - V_R)
    // Positive drift goes to Left boundary (+b), negative to Right boundary (-b)
    let drift = 0;
    if (currentFixation.target === 'left') {
      drift = d * (valueLeft - theta * valueRight);
    } else {
      drift = d * (theta * valueLeft - valueRight);
    }

    x += drift * DT + noise * Math.sqrt(DT) * sampleNormal();
    path.push(x);
    trialFixations[trialFixations.length - 1].endStep = step;

    if (x >= boundary) {
      return {
        path,
        fixations: trialFixations,
        choice: 'left',
        rt: Math.round(step * DT * 1000 + t0),
      };
    }
    if (x <= -boundary) {
      return {
        path,
        fixations: trialFixations,
        choice: 'right',
        rt: Math.round(step * DT * 1000 + t0),
      };
    }

    stepsInCurrentFixation++;
    if (stepsInCurrentFixation >= currentFixation.durationSteps) {
      currentFixationIdx++;
      stepsInCurrentFixation = 0;
    }
  }

  return {
    path,
    fixations: trialFixations,
    choice: x > 0 ? 'left' : 'right',
    rt: MAX_STEPS * DT * 1000,
  };
};

export const runADDMSimulation = (
  params: ADDMParams,
  nTrials = 100
): ADDMSimulationResult => {
  const trials = Array.from({ length: nTrials }, () => runADDMTrial(params));
  const rts = trials.map((t) => t.rt);
  const meanRT = rts.length ? rts.reduce((a, b) => a + b) / rts.length : 0;
  const probLeft = trials.filter((t) => t.choice === 'left').length / nTrials;

  return { trials, meanRT, probLeft };
};
