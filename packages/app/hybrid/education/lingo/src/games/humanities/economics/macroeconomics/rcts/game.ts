import { ALPHA, ROUNDS, Z_CRIT } from './constants';
import type { Round, Study, TrialRun } from './types';

export const meanDiff = (study: Study): number =>
  study.treatedMean - study.controlMean;

export const isRandomizedStudy = (study: Study): boolean => study.randomized;

export const roundInfo = (round: number): Round => ROUNDS[round - 1];

export const withinTolerance = (estimate: number, round: Round): boolean => {
  const tolerance =
    round.toleranceKind === 'relative'
      ? Math.abs(round.trueEffect * round.tolerance)
      : round.tolerance;
  return Math.abs(estimate - round.trueEffect) <= tolerance;
};

export const scoreRound = (
  chosenStudy: Study,
  estimate: number,
  round: Round
): number => {
  if (!isRandomizedStudy(chosenStudy)) return 0;
  return withinTolerance(estimate, round) ? 3 : 1;
};

const gauss = (): number => {
  const u = Math.max(Math.random(), 1e-9);
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const erf = (x: number): number => {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  return x < 0 ? -1 * (1 - p * Math.exp(-x * x)) : 1 - p * Math.exp(-x * x);
};

const normCdf = (z: number): number => 0.5 * (1 + erf(z / Math.SQRT2));

const clampPower = (value: number): number => Math.max(0, Math.min(1, value));

export const runTrial = (
  study: Study,
  n: number,
  treatedShare: number
): TrialRun => {
  const treatedN = Math.max(2, Math.round(n * treatedShare));
  const controlN = n - treatedN;
  const treated =
    study.treatedMean + (study.treatedSd * gauss()) / Math.sqrt(treatedN);
  const control =
    study.controlMean + (study.controlSd * gauss()) / Math.sqrt(controlN);
  const observedAte = treated - control;
  const se = Math.sqrt(
    study.treatedSd ** 2 / treatedN + study.controlSd ** 2 / controlN
  );
  const t = observedAte / se;
  const pValue = 2 * (1 - normCdf(Math.abs(t)));
  const effect = Math.abs(meanDiff(study));
  const power = clampPower(
    normCdf(effect / se - Z_CRIT) + normCdf(-(effect / se) - Z_CRIT)
  );
  return {
    treatedShare,
    treatedN,
    controlN,
    observedAte,
    se,
    t,
    pValue,
    ciLower: observedAte - Z_CRIT * se,
    ciUpper: observedAte + Z_CRIT * se,
    significant: pValue < ALPHA,
    power,
  };
};
