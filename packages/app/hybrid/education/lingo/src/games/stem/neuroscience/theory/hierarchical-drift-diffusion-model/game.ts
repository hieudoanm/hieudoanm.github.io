import type { HDDMParams, HDDMSimulationResult, HDDMSubject } from './types';

const DT = 0.005; // Slightly larger for performance
const MAX_STEPS = 2000;
const TRIALS_PER_SUBJECT = 50;

const sampleNormal = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

// Internal standard DDM trial just to get RT/Accuracy
const runStandardTrial = (
  v: number,
  a: number,
  noise: number,
  t0: number
): { rt: number; correct: boolean } => {
  let x = a / 2; // Start unbiased (z=0.5)
  for (let step = 1; step < MAX_STEPS; step++) {
    x += v * DT + noise * Math.sqrt(DT) * sampleNormal();
    if (x >= a) return { rt: step * DT * 1000 + t0, correct: v >= 0 };
    if (x <= 0) return { rt: step * DT * 1000 + t0, correct: v < 0 };
  }
  return { rt: MAX_STEPS * DT * 1000 + t0, correct: false };
};

export const runHDDMSimulation = (
  params: HDDMParams,
  nSubjects = 20
): HDDMSimulationResult => {
  const subjects: HDDMSubject[] = [];
  let totalRT = 0;
  let totalCorrect = 0;

  for (let i = 0; i < nSubjects; i++) {
    // 1. Draw subject parameters from the hierarchical population distributions
    // Use absolute for boundary to avoid negative thresholds
    const subjectV = params.popDriftMu + sampleNormal() * params.popDriftSigma;
    const subjectA = Math.max(
      0.5,
      params.popBoundaryMu + sampleNormal() * params.popBoundarySigma
    );

    // 2. Simulate trials for this specific subject
    let subjTotalRT = 0;
    let subjTotalCorrect = 0;

    for (let t = 0; t < TRIALS_PER_SUBJECT; t++) {
      const trial = runStandardTrial(
        subjectV,
        subjectA,
        params.noise,
        params.nonDecisionTime
      );
      subjTotalRT += trial.rt;
      if (trial.correct) subjTotalCorrect++;
    }

    const subjMeanRT = subjTotalRT / TRIALS_PER_SUBJECT;
    const subjAccuracy = subjTotalCorrect / TRIALS_PER_SUBJECT;

    subjects.push({
      id: i + 1,
      driftRate: subjectV,
      boundary: subjectA,
      meanRT: subjMeanRT,
      accuracy: subjAccuracy,
    });

    totalRT += subjTotalRT;
    totalCorrect += subjTotalCorrect;
  }

  return {
    subjects,
    popMeanRT: totalRT / (nSubjects * TRIALS_PER_SUBJECT),
    popAccuracy: totalCorrect / (nSubjects * TRIALS_PER_SUBJECT),
  };
};
