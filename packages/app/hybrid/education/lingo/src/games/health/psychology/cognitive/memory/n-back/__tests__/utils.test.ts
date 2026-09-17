import {
  DEFAULT_N,
  GRID_POSITIONS,
  GRID_SIZE,
  INTERVAL_DURATION,
  LETTERS,
  N_OPTIONS,
  STIMULUS_DURATION,
  STRONG_ACCURACY,
  TOTAL_STIMULI,
} from '../constants';
import { countTargets, generateTrials, hitRate, isStrong } from '../utils';

describe('n-back constants', () => {
  it('exposes a 3x3 grid of positions', () => {
    expect(GRID_SIZE).toBe(3);
    expect(GRID_POSITIONS).toHaveLength(9);
    expect(GRID_POSITIONS).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('runs twenty trials of 1.5s with a 0.5s gap', () => {
    expect(TOTAL_STIMULI).toBe(20);
    expect(STIMULUS_DURATION).toBe(1500);
    expect(INTERVAL_DURATION).toBe(500);
  });

  it('defaults to 2-back and offers 1, 2 and 3', () => {
    expect(DEFAULT_N).toBe(2);
    expect(N_OPTIONS).toEqual([1, 2, 3]);
  });

  it('uses an unambiguous alphabet', () => {
    expect(LETTERS).not.toMatch(/[IO]/);
    expect(LETTERS).toHaveLength(24);
  });

  it('treats 70% as the strong-accuracy line', () => {
    expect(STRONG_ACCURACY).toBe(0.7);
  });
});

describe('generateTrials', () => {
  it('produces the requested number of trials', () => {
    expect(generateTrials(2, 20)).toHaveLength(20);
  });

  it('never marks a trial before n as a target', () => {
    const trials = generateTrials(3, 30);

    expect(trials.slice(0, 3).every((trial) => !trial.isTarget)).toBe(true);
  });

  it('flags a target only when the position repeats after n steps', () => {
    const n = 2;
    const trials = generateTrials(n, 200);

    const consistent = trials.every((trial, index) => {
      if (index < n) return !trial.isTarget;

      const repeats =
        trial.stimulus.position === trials[index - n].stimulus.position;

      return trial.isTarget === repeats;
    });

    expect(consistent).toBe(true);
    expect(trials.some((trial) => trial.isTarget)).toBe(true);
  });

  it('keeps every stimulus on the grid and in the alphabet', () => {
    for (const { stimulus } of generateTrials(2, 50)) {
      expect(GRID_POSITIONS).toContain(stimulus.position);
      expect(LETTERS).toContain(stimulus.letter);
    }
  });

  it('generates at least one target when the run is long enough', () => {
    expect(countTargets(generateTrials(2, 400))).toBeGreaterThan(0);
  });
});

describe('hitRate', () => {
  it('is zero before any response', () => {
    expect(hitRate(0, 0)).toBe(0);
  });

  it('divides hits by hits plus false alarms', () => {
    expect(hitRate(8, 2)).toBe(0.8);
  });

  it('reaches one with perfect hits and no false alarms', () => {
    expect(hitRate(5, 0)).toBe(1);
  });
});

describe('isStrong', () => {
  it('needs more than the strong-accuracy line', () => {
    expect(isStrong(0.7)).toBe(false);
    expect(isStrong(0.71)).toBe(true);
    expect(isStrong(0)).toBe(false);
  });
});
