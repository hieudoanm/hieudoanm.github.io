import { PRESETS } from '../constants';
import {
  isConverged,
  normalizeShare,
  payoffSnapshot,
  stepGeneration,
  stepsFrom,
} from '../game';

const tr = (v: number): number => Math.round(v * 10000) / 10000;

describe('payoffSnapshot', () => {
  it('computes fitness for both strategies and the population mean', () => {
    const { fA, fB, mean } = payoffSnapshot(0.5, PRESETS['hawk-dove'].matrix);
    expect(tr(fA)).toBe(1.5);
    expect(tr(fB)).toBe(1);
    expect(tr(mean)).toBe(1.25);
  });

  it('clamps the share into [0, 1]', () => {
    const snap = payoffSnapshot(2, PRESETS['hawk-dove'].matrix);
    const snapLow = payoffSnapshot(-1, PRESETS['hawk-dove'].matrix);
    expect(snap.fA).toBe(PRESETS['hawk-dove'].matrix.aA);
    expect(snapLow.fA).toBe(PRESETS['hawk-dove'].matrix.aB);
  });
});

describe('stepGeneration', () => {
  it('is a fixed point at the hawk-dove interior ESS p = V/C = 2/3', () => {
    const p = 2 / 3;
    expect(stepGeneration(p, PRESETS['hawk-dove'].matrix)).toBeCloseTo(p, 10);
  });

  it('pushes a mixed hawk-dove population toward the interior ESS', () => {
    const next = stepGeneration(0.5, PRESETS['hawk-dove'].matrix);
    expect(next).toBeGreaterThan(0.5);
    expect(stepGeneration(0.75, PRESETS['hawk-dove'].matrix)).toBeLessThan(
      0.75
    );
  });

  it('drives cooperators to zero in the prisoner dilemma', () => {
    const matrix = PRESETS['prisoner'].matrix;
    let p = 0.5;
    for (let i = 0; i < 50; i += 1) p = stepGeneration(p, matrix);
    expect(p).toBeLessThan(0.001);
  });

  it('freezes the population when the mean payoff is not positive', () => {
    expect(stepGeneration(0, PRESETS['hawk-dove'].matrix)).toBe(0);
    expect(stepGeneration(1, PRESETS['hawk-dove'].matrix)).toBe(1);
  });
});

describe('stepsFrom', () => {
  it('returns a trace with one entry per generation plus the start', () => {
    const trace = stepsFrom(0.5, PRESETS['hawk-dove'].matrix, 10);
    expect(trace).toHaveLength(11);
    expect(trace[0]).toBe(0.5);
  });

  it('converges hawk and dove shares on the interior ESS after 100 steps', () => {
    const trace = stepsFrom(0.5, PRESETS['hawk-dove'].matrix, 100);
    expect(trace[trace.length - 1]).toBeCloseTo(2 / 3, 2);
  });

  it('reaches the defector equilibrium for the prisoner dilemma', () => {
    const trace = stepsFrom(0.5, PRESETS['prisoner'].matrix, 100);
    expect(trace[trace.length - 1]).toBeLessThan(0.001);
  });

  it('guards NaN inputs', () => {
    const trace = stepsFrom(Number.NaN, PRESETS['hawk-dove'].matrix, 5);
    expect(trace[0]).toBe(0);
    expect(stepGeneration(Number.NaN, PRESETS['hawk-dove'].matrix)).toBe(0);
    expect(stepsFrom(0.5, PRESETS['hawk-dove'].matrix, Number.NaN)).toEqual([
      0.5,
    ]);
  });
});

describe('normalizeShare', () => {
  it('clamps out-of-range and NaN shares to safe values', () => {
    expect(normalizeShare(-0.2)).toBe(0);
    expect(normalizeShare(1.4)).toBe(1);
    expect(normalizeShare(Number.NaN)).toBe(0);
  });
});

describe('isConverged', () => {
  it('detects small moves and absorbing boundaries', () => {
    expect(isConverged(0.5, 0.5004)).toBe(true);
    expect(isConverged(0.5, 0.51)).toBe(false);
    expect(isConverged(0.4, 0)).toBe(true);
    expect(isConverged(0.6, 1)).toBe(true);
  });
});
