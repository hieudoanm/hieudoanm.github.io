import {
  ambientAt,
  bestSensor,
  fieldAt,
  runOpmSimulation,
  snrAt,
} from '../game';
import type { OPMParams } from '../types';

const DEFAULTS: OPMParams = {
  sourceDepthCm: 2,
  sensorGapCm: 0.5,
  sourceStrength: 0.6,
  ambientNT: 180,
  sensorNoiseNT: 0.00005,
  sensorCount: 100,
  shielded: false,
};

describe('fieldAt', () => {
  it('falls off as the cube of distance', () => {
    expect(fieldAt(1, 1) / fieldAt(1, 2)).toBeCloseTo(8, 6);
  });

  it('scales linearly with source moment', () => {
    expect(fieldAt(2, 3)).toBeCloseTo(2 * fieldAt(1, 3), 6);
  });
});

describe('ambientAt', () => {
  it('passes the open-field value through unshielded', () => {
    expect(ambientAt(DEFAULTS)).toBe(180);
  });

  it('collapses inside a shield', () => {
    expect(ambientAt({ ...DEFAULTS, shielded: true })).toBeLessThan(1);
  });
});

describe('snrAt', () => {
  it('rises as the source gets stronger', () => {
    expect(snrAt(2, 3, 1)).toBeGreaterThan(snrAt(1, 3, 1));
  });

  it('falls as the noise grows', () => {
    expect(snrAt(1, 3, 2)).toBeLessThan(snrAt(1, 3, 1));
  });

  it('never divides by zero', () => {
    expect(snrAt(1, 1, 0)).toBeGreaterThan(0);
  });
});

describe('runOpmSimulation', () => {
  it('samples a monotone distance curve', () => {
    const { curve } = runOpmSimulation(DEFAULTS);
    expect(curve.length).toBeGreaterThan(10);
    expect(curve[curve.length - 1].snr).toBeLessThan(curve[0].snr);
  });

  it('reports the residual ambient field', () => {
    expect(
      runOpmSimulation({ ...DEFAULTS, shielded: true }).residualAmbientNT
    ).toBeLessThan(1);
  });

  it('leaves the OPM advantage essentially geometric under shielding', () => {
    const open = runOpmSimulation(DEFAULTS);
    const shielded = runOpmSimulation({ ...DEFAULTS, shielded: true });
    // Shielding collapses the absolute noise floor on both sides, so the
    // distance-cubed advantage survives nearly intact.
    expect(shielded.gain).toBeCloseTo(open.gain, 1);
  });

  it('raises the OPM advantage as the sensor closes the gap', () => {
    const near = runOpmSimulation({ ...DEFAULTS, sensorGapCm: 0.5 });
    const far = runOpmSimulation({ ...DEFAULTS, sensorGapCm: 3 });
    expect(near.gain).toBeGreaterThan(far.gain);
  });

  it('matches the cubic distance ratio between OPM and helmet', () => {
    const params = { ...DEFAULTS, sourceDepthCm: 2, sensorGapCm: 1 };
    const result = runOpmSimulation(params);
    const expected = ((2 + 4) / (2 + 1)) ** 3;
    expect(result.gain).toBeCloseTo(expected, 2);
  });

  it('raises the absolute OPM SNR once shielded', () => {
    const open = runOpmSimulation(DEFAULTS);
    const shielded = runOpmSimulation({ ...DEFAULTS, shielded: true });
    expect(shielded.opmSnr).toBeGreaterThan(open.opmSnr);
  });

  it('leaves the cortical signal undetectable while unshielded', () => {
    expect(runOpmSimulation(DEFAULTS).opmSnr).toBeLessThan(1e-3);
  });

  it('picks the closest sensor as the best one', () => {
    const { curve } = runOpmSimulation(DEFAULTS);
    expect(bestSensor(curve).distanceCm).toBe(curve[0].distanceCm);
  });
});
