import { applyCrosshair, diffStats, diffToRgba } from '@/lib/compare';

const sliceBuffer = (values: number[], signed = false): ArrayBuffer => {
  const buffer = new ArrayBuffer(values.length * 2);
  const view = new DataView(buffer);
  values.forEach((value, index) => {
    if (signed) {
      view.setInt16(index * 2, value, true);
    } else {
      view.setUint16(index * 2, value, true);
    }
  });
  return buffer;
};

describe('diffStats', () => {
  it('returns zero statistics for identical slices', () => {
    const stats = diffStats(
      sliceBuffer([10, 20, 30]),
      sliceBuffer([10, 20, 30]),
      false
    );
    expect(stats.meanAbsDiff).toBe(0);
    expect(stats.maxDiff).toBe(0);
    expect(stats.rmse).toBe(0);
  });

  it('computes mean, max and rmse of absolute differences', () => {
    const stats = diffStats(
      sliceBuffer([0, 0, 0]),
      sliceBuffer([1, 3, 5]),
      false
    );
    expect(stats.meanAbsDiff).toBeCloseTo(3);
    expect(stats.maxDiff).toBe(5);
    expect(stats.rmse).toBeCloseTo(Math.sqrt((1 + 9 + 25) / 3));
  });

  it('handles signed slices', () => {
    const stats = diffStats(
      sliceBuffer([-5], true),
      sliceBuffer([5], true),
      true
    );
    expect(stats.maxDiff).toBe(10);
  });
});

describe('diffToRgba', () => {
  it('maps differences to greyscale pixels', () => {
    const rgba = diffToRgba(
      sliceBuffer([0, 100]),
      sliceBuffer([100, 100]),
      false,
      { center: 50, width: 100 }
    );
    expect(rgba.length).toBe(8);
    expect(rgba[0]).toBeGreaterThan(200);
    expect(rgba[4]).toBe(0);
  });

  it('auto-scales when the window is degenerate', () => {
    const rgba = diffToRgba(sliceBuffer([0]), sliceBuffer([40000]), false, {
      center: 0,
      width: 0,
    });
    expect(rgba[0]).toBeGreaterThan(200);
  });
});

describe('applyCrosshair', () => {
  it('inverts pixels along the crosshair lines', () => {
    const rgba = new Uint8ClampedArray(4 * 4 * 4).fill(40);
    applyCrosshair(rgba, 4, 4, 2, 1);
    const at = (x: number, y: number) => rgba[(y * 4 + x) * 4];
    expect(at(0, 1)).toBe(215);
    expect(at(2, 3)).toBe(215);
    expect(at(2, 1)).toBe(40);
    expect(at(3, 3)).toBe(40);
  });

  it('clamps out-of-range crosshair positions', () => {
    const rgba = new Uint8ClampedArray(4 * 4).fill(0);
    expect(() => applyCrosshair(rgba, 2, 2, 99, 99)).not.toThrow();
  });
});
