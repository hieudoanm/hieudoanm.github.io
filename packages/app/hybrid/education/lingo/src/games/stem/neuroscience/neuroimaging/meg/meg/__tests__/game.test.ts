import { fieldAtDistance, onScalpGain, runForwardModel } from '../game';
import type { DipoleParams } from '../types';

const DEFAULTS: DipoleParams = {
  depthCm: 1,
  orientationDeg: 0,
  sensorGapCm: 4,
  skullRatio: 1,
  sampleRate: 1000,
};

describe('fieldAtDistance', () => {
  it('falls off as the cube of distance', () => {
    expect(fieldAtDistance(1) / fieldAtDistance(2)).toBeCloseTo(8, 6);
  });

  it('is 64x stronger at 1 cm than at 4 cm', () => {
    expect(fieldAtDistance(1) / fieldAtDistance(4)).toBeCloseTo(64, 6);
  });
});

describe('onScalpGain', () => {
  it('is 64x for a 1 cm sensor against a 4 cm helmet', () => {
    expect(onScalpGain(4, 1)).toBeCloseTo(64, 6);
  });

  it('is unity for identical distances', () => {
    expect(onScalpGain(3, 3)).toBeCloseTo(1, 6);
  });
});

describe('runForwardModel', () => {
  it('returns one sample per sensor', () => {
    const result = runForwardModel(DEFAULTS, 64);
    expect(result.samples).toHaveLength(64);
  });

  it('leaves the scalp potential unchanged with a transparent skull', () => {
    const result = runForwardModel(DEFAULTS, 64);
    result.samples.forEach((s) => {
      expect(s.volumeConducted).toBeCloseTo(s.electric, 6);
    });
  });

  it('blurs the scalp potential when the skull conducts less', () => {
    const result = runForwardModel({ ...DEFAULTS, skullRatio: 0.3 }, 64);
    const smeared = result.samples.filter(
      (s) => Math.abs(s.volumeConducted - s.electric) > 1e-9
    );
    expect(smeared.length).toBeGreaterThan(0);
  });

  it('cannot widen the dynamic range of the scalp map, because blur is a convex mix', () => {
    const result = runForwardModel({ ...DEFAULTS, skullRatio: 0.3 }, 64);
    const range = (key: 'electric' | 'volumeConducted') => {
      const values = result.samples.map((s) => s[key]);
      return Math.max(...values) - Math.min(...values);
    };
    expect(range('volumeConducted')).toBeLessThanOrEqual(
      range('electric') + 1e-12
    );
  });

  it('attenuates the magnetic field as the source gets deeper', () => {
    const shallow = runForwardModel(DEFAULTS, 64);
    const deep = runForwardModel({ ...DEFAULTS, depthCm: 5 }, 64);
    expect(deep.peakMagnetic).toBeLessThan(shallow.peakMagnetic);
  });

  it('increases the source-to-sensor distance as the source deepens', () => {
    const shallow = runForwardModel(DEFAULTS, 64);
    const deep = runForwardModel({ ...DEFAULTS, depthCm: 5 }, 64);
    expect(deep.minDistanceCm).toBeGreaterThan(shallow.minDistanceCm);
  });

  it('grows the magnetic field as the sensors move closer to the scalp', () => {
    const far = runForwardModel({ ...DEFAULTS, sensorGapCm: 6 }, 64);
    const near = runForwardModel({ ...DEFAULTS, sensorGapCm: 1 }, 64);
    expect(near.peakMagnetic).toBeGreaterThan(far.peakMagnetic);
  });

  it('produces a tangential field pattern stronger than a radial one', () => {
    const radial = runForwardModel({ ...DEFAULTS, orientationDeg: 0 }, 64);
    const tangential = runForwardModel({ ...DEFAULTS, orientationDeg: 90 }, 64);
    expect(radial.peakMagnetic).toBeLessThan(tangential.peakMagnetic);
  });
});
