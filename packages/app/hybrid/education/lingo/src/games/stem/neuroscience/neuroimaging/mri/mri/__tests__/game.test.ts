import { hrfAt, simulateBold } from '../game';
import type { BOLDParams } from '../types';

const DEFAULTS: BOLDParams = {
  hrf: {
    peakTimeS: 5,
    dispersionS: 1.5,
    undershootRatio: 0.35,
    undershootTimeS: 12,
  },
  blockS: 20,
  isiS: 20,
  blockHz: 0,
  trS: 1,
  neuralNoise: 0,
  physioNoise: 0,
};

describe('hrfAt', () => {
  it('is zero at and before the onset', () => {
    expect(hrfAt(0, DEFAULTS.hrf)).toBe(0);
    expect(hrfAt(-1, DEFAULTS.hrf)).toBe(0);
  });

  it('is positive near the peak time', () => {
    expect(hrfAt(5, DEFAULTS.hrf)).toBeGreaterThan(0);
  });

  it('is still positive just past the peak', () => {
    expect(hrfAt(8, DEFAULTS.hrf)).toBeGreaterThan(0);
  });

  it('lags a shorter time-to-peak', () => {
    const fast = simulateBold({
      ...DEFAULTS,
      hrf: { ...DEFAULTS.hrf, peakTimeS: 3 },
    });
    const slow = simulateBold({
      ...DEFAULTS,
      hrf: { ...DEFAULTS.hrf, peakTimeS: 8 },
    });
    expect(fast.boldLagS).toBeLessThan(slow.boldLagS);
  });
});

describe('simulateBold', () => {
  it('samples one point per TR', () => {
    const result = simulateBold({ ...DEFAULTS, trS: 1 }, 30);
    expect(result.samples).toHaveLength(30);
  });

  it('samples more often with a shorter TR', () => {
    const slow = simulateBold({ ...DEFAULTS, trS: 2 }, 30);
    const fast = simulateBold({ ...DEFAULTS, trS: 0.5 }, 30);
    expect(fast.samples.length).toBeGreaterThan(slow.samples.length);
  });

  it('lags the neural drive by seconds, not milliseconds', () => {
    const result = simulateBold(DEFAULTS, 30);
    expect(result.boldLagS).toBeGreaterThan(1);
  });

  it('rises after a longer block lasts longer', () => {
    const short = simulateBold({ ...DEFAULTS, blockS: 2 }, 30);
    const long = simulateBold({ ...DEFAULTS, blockS: 20 }, 30);
    expect(long.peakBold).toBeGreaterThan(short.peakBold);
  });

  it('produces a positive peak response to an active block', () => {
    expect(simulateBold(DEFAULTS, 30).peakBold).toBeGreaterThan(0);
  });

  it('exposes the BOLD T1 of blood at 3 T', () => {
    expect(simulateBold(DEFAULTS, 30).t1S).toBeCloseTo(0.82, 6);
  });

  it('has a shorter effective T2* than T1', () => {
    const result = simulateBold(DEFAULTS, 30);
    expect(result.t2StarS).toBeLessThan(result.t1S);
  });

  it('adds noise to the sampled series but not the clean BOLD', () => {
    const clean = simulateBold(DEFAULTS, 30);
    const noisy = simulateBold({ ...DEFAULTS, physioNoise: 0.2 }, 30);
    expect(noisy.peakBold).toBeCloseTo(clean.peakBold, 6);
    const spread = (r: typeof clean) =>
      Math.max(...r.samples.map((s) => s.sampled)) -
      Math.min(...r.samples.map((s) => s.sampled));
    expect(spread(noisy)).toBeGreaterThan(spread(clean));
  });

  it('drives an impulse train when blocks repeat', () => {
    const result = simulateBold({ ...DEFAULTS, blockHz: 0.05 }, 30);
    const peak = result.peakBold;
    expect(peak).toBeGreaterThan(0);
    expect(result.samples.length).toBeGreaterThan(0);
  });
});
