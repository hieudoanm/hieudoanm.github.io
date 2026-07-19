import { createSampleRaster } from '@/data/sample';

describe('createSampleRaster', () => {
  it('produces a raster with the requested dimensions', () => {
    const raster = createSampleRaster(320, 240);
    expect(raster.width).toBe(320);
    expect(raster.height).toBe(240);
    expect(raster.data.length).toBe(320 * 240 * 4);
  });

  it('is deterministic for the same seed', () => {
    const first = createSampleRaster(64, 64);
    const second = createSampleRaster(64, 64);
    expect(Array.from(first.data)).toEqual(Array.from(second.data));
  });

  it('contains non-zero intensity pixels', () => {
    const raster = createSampleRaster(64, 64);
    const hasSignal = Array.from(raster.data).some((value) => value > 0);
    expect(hasSignal).toBe(true);
  });
});
