import {
  applyWindowLevel,
  autoWindowLevel,
  clamp,
  defaultWindowLevel,
} from '@/lib/viewer/lut';

const u16Buffer = (values: number[]): ArrayBuffer => {
  const buffer = new ArrayBuffer(values.length * 2);
  const view = new DataView(buffer);
  values.forEach((value, index) => view.setUint16(index * 2, value, true));
  return buffer;
};

const i16Buffer = (values: number[]): ArrayBuffer => {
  const buffer = new ArrayBuffer(values.length * 2);
  const view = new DataView(buffer);
  values.forEach((value, index) => view.setInt16(index * 2, value, true));
  return buffer;
};

describe('clamp', () => {
  it('clamps to the range', () => {
    expect(clamp(-5, 0, 255)).toBe(0);
    expect(clamp(300, 0, 255)).toBe(255);
    expect(clamp(128, 0, 255)).toBe(128);
  });
});

describe('defaultWindowLevel', () => {
  it('uses a wide soft-tissue default', () => {
    expect(defaultWindowLevel()).toEqual({ width: 256, center: 128 });
  });
});

describe('applyWindowLevel', () => {
  it('maps the window linearly to grayscale', () => {
    const data = u16Buffer([0, 64, 128, 192, 256]);
    const rgba = applyWindowLevel(data, false, { width: 256, center: 128 });
    expect(Array.from(rgba.filter((_, i) => i % 4 === 3))).toEqual(
      Array(5).fill(255)
    );
    const grays = Array.from(rgba.filter((_, i) => i % 4 === 0));
    expect(grays[0]).toBe(0);
    expect(grays[2]).toBe(128);
    expect(grays[4]).toBe(255);
    expect(grays[1]).toBeLessThan(grays[2]);
    expect(grays[3]).toBeGreaterThan(grays[2]);
  });

  it('clamps voxels outside the window', () => {
    const data = u16Buffer([0, 1000]);
    const rgba = applyWindowLevel(data, false, { width: 10, center: 5 });
    const grays = Array.from(rgba.filter((_, i) => i % 4 === 0));
    expect(grays).toEqual([0, 255]);
  });

  it('reads signed voxels', () => {
    const data = i16Buffer([-1000, 0, 1000]);
    const rgba = applyWindowLevel(data, true, { width: 2000, center: 0 });
    const grays = Array.from(rgba.filter((_, i) => i % 4 === 0));
    expect(grays[0]).toBe(0);
    expect(grays[1]).toBe(128);
    expect(grays[2]).toBe(255);
  });

  it('handles zero width without dividing by zero', () => {
    const data = u16Buffer([42]);
    const rgba = applyWindowLevel(data, false, { width: 0, center: 42 });
    expect(rgba[0]).toBe(0);
  });
});

describe('autoWindowLevel', () => {
  it('spans the voxel range', () => {
    const windowLevel = autoWindowLevel(u16Buffer([100, 356]), false);
    expect(windowLevel).toEqual({ width: 256, center: 228 });
  });

  it('handles signed ranges', () => {
    const windowLevel = autoWindowLevel(i16Buffer([-500, 500]), true);
    expect(windowLevel).toEqual({ width: 1000, center: 0 });
  });

  it('falls back for constant volumes', () => {
    expect(autoWindowLevel(u16Buffer([7, 7]), false)).toEqual({
      width: 1,
      center: 7,
    });
  });

  it('falls back for empty slices', () => {
    expect(autoWindowLevel(new ArrayBuffer(0), false)).toEqual({
      width: 256,
      center: 128,
    });
  });
});
