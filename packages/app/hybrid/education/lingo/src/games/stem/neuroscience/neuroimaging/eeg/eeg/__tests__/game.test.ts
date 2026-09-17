import {
  evidenceToDrift,
  scaleComponentsForEvidence,
  simulateErp,
  sumComponents,
} from '../game';
import type { ArtefactSettings, ErpComponent, ErpParams } from '../types';

const COMPONENTS: ErpComponent[] = [
  { name: 'N170', latency: 170, amplitude: -9, width: 32 },
  { name: 'P300', latency: 380, amplitude: 12, width: 90 },
];

const NO_ARTEFACTS: ArtefactSettings = {
  blink: 0,
  emg: 0,
  lineNoise: 0,
  drift: 0,
};

const params = (artefacts: ArtefactSettings = NO_ARTEFACTS): ErpParams => ({
  components: COMPONENTS,
  artefacts,
  sampleRate: 250,
  windowMs: 800,
});

describe('sumComponents', () => {
  it('returns one value per sample', () => {
    const times = [0, 100, 200, 300];
    expect(sumComponents(COMPONENTS, times)).toHaveLength(times.length);
  });

  it('is near zero far from every component latency', () => {
    expect(Math.abs(sumComponents(COMPONENTS, [5])[0])).toBeLessThan(0.01);
  });

  it('goes negative at a negative component peak', () => {
    const atN170 = sumComponents(COMPONENTS, [170])[0];
    expect(atN170).toBeLessThan(0);
  });

  it('sums to zero for an empty component set', () => {
    expect(sumComponents([], [10, 20, 30])).toEqual([0, 0, 0]);
  });
});

describe('evidenceToDrift', () => {
  it('is clamped to the unit interval of coherence', () => {
    expect(evidenceToDrift(-1)).toBeCloseTo(evidenceToDrift(0), 6);
    expect(evidenceToDrift(2)).toBeCloseTo(evidenceToDrift(1), 6);
  });

  it('increases monotonically with evidence', () => {
    expect(evidenceToDrift(0.8)).toBeGreaterThan(evidenceToDrift(0.2));
  });
});

describe('scaleComponentsForEvidence', () => {
  it('advances latency as evidence grows', () => {
    const low = scaleComponentsForEvidence(COMPONENTS, 0);
    const high = scaleComponentsForEvidence(COMPONENTS, 1);
    expect(high[0].latency).toBeLessThan(low[0].latency);
  });

  it('scales amplitude with evidence', () => {
    const low = scaleComponentsForEvidence(COMPONENTS, 0);
    const high = scaleComponentsForEvidence(COMPONENTS, 1);
    expect(Math.abs(high[0].amplitude)).toBeGreaterThan(
      Math.abs(low[0].amplitude)
    );
  });

  it('preserves the number of components', () => {
    expect(scaleComponentsForEvidence(COMPONENTS, 0.5)).toHaveLength(
      COMPONENTS.length
    );
  });
});

describe('simulateErp', () => {
  it('samples the window at the requested rate', () => {
    const result = simulateErp(params(), 4);
    expect(result.times).toHaveLength(200);
  });

  it('reduces noise by roughly the square root of the trial count', () => {
    const few = simulateErp(params(), 1);
    const many = simulateErp(params(), 100);
    expect(many.noiseAfter).toBeLessThan(few.noiseAfter);
    expect(few.noiseAfter / many.noiseAfter).toBeGreaterThan(5);
  });

  it('is deterministic for a fixed seed', () => {
    const a = simulateErp(params(), 10, 7);
    const b = simulateErp(params(), 10, 7);
    expect(a.signal).toEqual(b.signal);
  });

  it('leaves the clean trace untouched when no artefacts are injected', () => {
    const result = simulateErp(params(), 2);
    const peak = sumComponents(COMPONENTS, [380])[0];
    expect(peak).toBeGreaterThan(0);
    const last = result.contaminated[result.contaminated.length - 1];
    expect(Math.abs(last)).toBeLessThan(0.01);
  });

  it('injects blink artefact on the frontal slow component', () => {
    const clean = simulateErp(params(), 1);
    const blinked = simulateErp(params({ ...NO_ARTEFACTS, blink: 1 }), 1);
    const idxAt250 = Math.round(250 / (1000 / 250));
    expect(blinked.contaminated[idxAt250]).toBeLessThan(
      clean.contaminated[idxAt250] - 10
    );
  });

  it('reports noise after averaging as the square root reduction', () => {
    const result = simulateErp(params(), 400);
    expect(result.noiseBefore / result.noiseAfter).toBeCloseTo(20, 1);
  });
});
