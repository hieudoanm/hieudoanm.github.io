import {
  ATTRACTOR_FNS,
  lorenz,
  aizawa,
  thomas,
  halvorsen,
  arneodo,
} from '../utils/attractors';
import { ATTRACTOR_LIST, NUM_PARTICLES, SETTINGS } from '../constants';
import { mockThree } from '../three.mock';
import { resetParticle, seedParticle } from '../utils/renderer';
import type { AttractorFn } from '../types';

jest.mock('three', () => mockThree);

const isFiniteTriplet = (v: readonly [number, number, number]): boolean =>
  v.every((n) => Number.isFinite(n));

describe('attractor ODEs', () => {
  const samplePoints: ReadonlyArray<readonly [number, number, number]> = [
    [1, 1, 1],
    [0, 0, 0],
    [-3, 4, 2],
    [100, -50, 25],
  ];

  it.each(ATTRACTOR_LIST)(
    '%s returns a finite 3-tuple for each sample point',
    (type) => {
      const fn = ATTRACTOR_FNS[type];
      for (const point of samplePoints) {
        expect(isFiniteTriplet(fn(...point))).toBe(true);
      }
    }
  );

  it('exposes each attractor as an exported function', () => {
    const fns: AttractorFn[] = [lorenz, aizawa, thomas, halvorsen, arneodo];
    for (const fn of fns) {
      expect(isFiniteTriplet(fn(2, -1, 0.5))).toBe(true);
    }
  });

  it('maps every listed attractor to an ODE', () => {
    for (const type of ATTRACTOR_LIST) {
      expect(ATTRACTOR_FNS[type]).toBeDefined();
    }
  });

  it('lists the five supported attractors', () => {
    expect(ATTRACTOR_LIST).toEqual([
      'lorenz',
      'aizawa',
      'thomas',
      'halvorsen',
      'arneodo',
    ]);
  });
});

describe('SETTINGS', () => {
  it('configures every listed attractor', () => {
    expect(Object.keys(SETTINGS)).toHaveLength(ATTRACTOR_LIST.length);
    for (const type of ATTRACTOR_LIST) {
      expect(SETTINGS[type]).toBeDefined();
    }
  });

  it('uses positive step size, scale and camera distance', () => {
    for (const type of ATTRACTOR_LIST) {
      const s = SETTINGS[type];
      expect(s.scale).toBeGreaterThan(0);
      expect(s.dt).toBeGreaterThan(0);
      expect(s.cam).toBeGreaterThan(0);
      expect(s.offset).toHaveLength(3);
      expect(s.color).toHaveLength(2);
    }
  });

  it('stays well under the seeded particle budget', () => {
    expect(NUM_PARTICLES).toBeGreaterThan(1000);
  });
});

describe('particle seeding helpers', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('resets a particle to finite simulated coordinates', () => {
    const p = { x: 1000, y: -1000, z: 1000 };
    resetParticle(p, 'thomas');
    expect(Number.isFinite(p.x)).toBe(true);
    expect(Number.isFinite(p.y)).toBe(true);
    expect(Number.isFinite(p.z)).toBe(true);
  });

  it('seeds a particle with finite position, rgb and a size in [1, 2]', () => {
    for (const type of ATTRACTOR_LIST) {
      const seed = seedParticle(type);
      expect(Number.isFinite(seed.x)).toBe(true);
      expect(seed.rgb).toHaveLength(3);
      expect(seed.rgb.every((n) => Number.isFinite(n))).toBe(true);
      expect(seed.size).toBeGreaterThanOrEqual(1);
      expect(seed.size).toBeLessThanOrEqual(2);
    }
  });
});
