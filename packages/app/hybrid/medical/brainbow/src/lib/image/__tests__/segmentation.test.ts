import {
  classifyRaster,
  countPixels,
  kmeansRgb,
  samplePixels,
} from '@/lib/image/segmentation';
import type { ImageRaster } from '@/types/image';

const seededRandom = (seed: number): (() => number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

describe('samplePixels', () => {
  it('samples every Nth pixel', () => {
    const raster: ImageRaster = {
      width: 4,
      height: 1,
      data: new Uint8ClampedArray([
        10, 20, 30, 255, 40, 50, 60, 255, 70, 80, 90, 255, 100, 110, 120, 255,
      ]),
    };
    const pixels = samplePixels(raster, 4);
    expect(pixels).toEqual([{ r: 10, g: 20, b: 30 }]);
  });
});

describe('kmeansRgb', () => {
  it('splits two distinct colors deterministically with a seeded random', () => {
    const pixels = [
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
    ];
    const result = kmeansRgb(pixels, 2, { iterations: 10 }, seededRandom(7));
    expect(result.assignments).toHaveLength(4);
    expect(new Set(result.assignments).size).toBe(2);
    const sorted = [...result.centers].sort((a, b) => a.r - b.r);
    expect(sorted[0].r).toBeLessThan(128);
    expect(sorted[1].r).toBeGreaterThan(128);
    expect(result.iterations).toBeGreaterThan(0);
  });

  it('returns empty results for an empty pixel list', () => {
    expect(kmeansRgb([], 3, { iterations: 5 }, seededRandom(1))).toEqual({
      centers: [],
      assignments: [],
      iterations: 0,
    });
  });
});

describe('classifyRaster', () => {
  it('assigns each pixel to the nearest center', () => {
    const raster: ImageRaster = {
      width: 2,
      height: 1,
      data: new Uint8ClampedArray([255, 0, 0, 255, 0, 0, 255, 255]),
    };
    const classified = classifyRaster(raster, [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
    ]);
    expect(Array.from(classified)).toEqual([0, 1]);
  });
});

describe('countPixels', () => {
  it('counts pixels per cluster', () => {
    const classified = new Uint8Array([0, 1, 0, 1, 1]);
    expect(countPixels(classified, 2)).toEqual([2, 3]);
  });
});
