import { ROUNDS, TOTAL_ROUNDS } from '../constants';
import {
  isRandomizedStudy,
  meanDiff,
  roundInfo,
  runTrial,
  scoreRound,
  withinTolerance,
} from '../game';

describe('meanDiff', () => {
  it('subtracts the control mean from the treated mean', () => {
    expect(meanDiff(ROUNDS[0].studies[1])).toBeCloseTo(0.31);
    expect(meanDiff(ROUNDS[1].studies[1])).toBeCloseTo(400);
  });
});

describe('isRandomizedStudy', () => {
  it('returns true only for randomly assigned studies', () => {
    expect(isRandomizedStudy(ROUNDS[0].studies[0])).toBe(false);
    expect(isRandomizedStudy(ROUNDS[0].studies[1])).toBe(true);
  });
});

describe('roundInfo', () => {
  it('returns the round by its number', () => {
    expect(roundInfo(1)).toBe(ROUNDS[0]);
    expect(roundInfo(TOTAL_ROUNDS)).toBe(ROUNDS[TOTAL_ROUNDS - 1]);
  });
});

describe('withinTolerance', () => {
  it('accepts estimates within an absolute band', () => {
    const round = roundInfo(1);
    expect(withinTolerance(0.31, round)).toBe(true);
    expect(withinTolerance(0.26, round)).toBe(true);
    expect(withinTolerance(0.25, round)).toBe(false);
  });

  it('accepts estimates within a relative band', () => {
    const round = roundInfo(2);
    expect(withinTolerance(120, round)).toBe(true);
    expect(withinTolerance(108, round)).toBe(true);
    expect(withinTolerance(107, round)).toBe(false);
  });
});

describe('scoreRound', () => {
  it('gives no points to a non-randomized study', () => {
    expect(scoreRound(ROUNDS[0].studies[0], 0.31, roundInfo(1))).toBe(0);
  });

  it('gives 3 points for an accurate randomized study', () => {
    expect(scoreRound(ROUNDS[0].studies[1], 0.31, roundInfo(1))).toBe(3);
  });

  it('gives 1 point for a randomized study outside tolerance', () => {
    expect(scoreRound(ROUNDS[0].studies[1], 0.2, roundInfo(1))).toBe(1);
  });
});

describe('runTrial', () => {
  const study = ROUNDS[0].studies[1];

  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('allocates the sample between treatment and control', () => {
    const trial = runTrial(study, 150, 0.7);
    expect(trial.treatedShare).toBe(0.7);
    expect(trial.treatedN).toBe(105);
    expect(trial.controlN).toBe(45);
    expect(trial.treatedN + trial.controlN).toBe(150);
  });

  it('is deterministic for fixed random noise', () => {
    const first = runTrial(study, 100, 0.5);
    const second = runTrial(study, 100, 0.5);
    expect(first.observedAte).toBeCloseTo(second.observedAte, 10);
    expect(first.observedAte).toBeCloseTo(0.311, 2);
  });

  it('keeps significance consistent with the p-value', () => {
    const trial = runTrial(study, 200, 0.5);
    expect(trial.significant).toBe(trial.pValue < 0.05);
  });

  it('tightens the standard error as the sample grows', () => {
    const small = runTrial(study, 50, 0.5);
    const large = runTrial(study, 200, 0.5);
    expect(large.se).toBeCloseTo(small.se / 2, 1);
  });

  it('centers the confidence interval on the ATE', () => {
    const trial = runTrial(study, 100, 0.5);
    expect(trial.ciLower).toBeCloseTo(trial.observedAte - 1.96 * trial.se, 10);
    expect(trial.ciUpper).toBeCloseTo(trial.observedAte + 1.96 * trial.se, 10);
  });
});
