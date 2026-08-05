import { scaleBarSpec } from '@/lib/canvas/scale';

describe('scaleBarSpec', () => {
  it('returns null when calibration is missing', () => {
    expect(scaleBarSpec(1, 0)).toBeNull();
    expect(scaleBarSpec(0, 10)).toBeNull();
    expect(scaleBarSpec(1, -5)).toBeNull();
  });

  it('picks a nice micron length near the target width', () => {
    const spec = scaleBarSpec(1, 10);
    expect(spec).not.toBeNull();
    expect(spec!.lengthMicrons).toBe(10);
    expect(spec!.lengthPx).toBe(100);
    expect(spec!.label).toBe('10 µm');
  });

  it('adapts the micron length to the zoom level', () => {
    const atOne = scaleBarSpec(1, 2.5);
    const atFour = scaleBarSpec(4, 2.5);
    expect(atOne!.lengthMicrons).toBe(50);
    expect(atFour!.lengthMicrons).toBe(10);
  });

  it('keeps the on-screen length near the target at any zoom', () => {
    const target = 96;
    const atOne = scaleBarSpec(1, 4, target);
    const atThree = scaleBarSpec(3, 4, target);
    for (const spec of [atOne, atThree]) {
      expect(spec!.lengthPx).toBeGreaterThanOrEqual(target);
      expect(spec!.lengthPx).toBeLessThanOrEqual(target * 2.6);
    }
  });

  it('supports sub-micron lengths', () => {
    const spec = scaleBarSpec(1, 1000, 96);
    expect(spec!.lengthMicrons).toBe(0.1);
    expect(spec!.lengthPx).toBeCloseTo(100);
  });
});
