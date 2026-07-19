import {
  CEREBELLUM,
  LOBES,
  PAD,
  SULCI,
  toX,
  toY,
  nearestAnchor,
} from '../outline-geometry';
import type { BrainRegion } from '../types';

const anchored = (id: string, x: number, y: number): BrainRegion => ({
  id,
  name: id,
  parentId: null,
  depth: 0.5,
  summary: '',
  function: '',
  note: '',
  anchor: { x, y },
});
describe('outline geometry', () => {
  it('maps normalised coordinates inside the padded drawing area', () => {
    expect(toX(0)).toBe(PAD);
    expect(toY(0)).toBe(PAD);
    expect(toX(1)).toBeGreaterThan(toX(0.5));
    expect(toY(1)).toBeGreaterThan(toY(0.5));
  });

  it('keeps every landmark inside the canvas', () => {
    const points = [...LOBES.flat(), ...SULCI.flat()];
    points.forEach(([x, y]) => {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(1);
    });
  });

  it('draws the cerebellum behind and below the cerebrum', () => {
    const cerebellumY = CEREBELLUM.map(([, y]) => y);
    const cerebrumY = LOBES[0].map(([, y]) => y);
    expect(Math.min(...cerebellumY)).toBeGreaterThanOrEqual(
      Math.min(...cerebrumY)
    );
  });
});

describe('nearestAnchor', () => {
  const regions = [anchored('a', 0.2, 0.2), anchored('b', 0.8, 0.8)];

  it('returns the structure under the pointer', () => {
    expect(nearestAnchor(regions, toX(0.2), toY(0.2))?.id).toBe('a');
  });

  it('picks the closer of two candidates', () => {
    expect(nearestAnchor(regions, toX(0.24), toY(0.24))?.id).toBe('a');
    expect(nearestAnchor(regions, toX(0.76), toY(0.76))?.id).toBe('b');
  });

  it('returns null when the pointer misses every hotspot', () => {
    expect(nearestAnchor(regions, toX(0.5), toY(0.05))).toBeNull();
  });

  it('ignores structures without an anchor', () => {
    const unanchored: BrainRegion = {
      ...anchored('c', 0.5, 0.5),
      anchor: undefined,
    };
    expect(nearestAnchor([unanchored], toX(0.5), toY(0.5))).toBeNull();
  });
});
