import { analyzeRaster } from '@/lib/analysis/analyze';
import type { ImageRaster } from '@/types/image';

const seededRandom = (seed: number): (() => number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

const makeHalfSplit = (): ImageRaster => {
  // 4x2: left half black, right half white
  const data = new Uint8ClampedArray(4 * 2 * 4);
  for (let y = 0; y < 2; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      const offset = (y * 4 + x) * 4;
      const value = x < 2 ? 0 : 255;
      data[offset] = value;
      data[offset + 1] = value;
      data[offset + 2] = value;
      data[offset + 3] = 255;
    }
  }
  return { width: 4, height: 2, data };
};

describe('analyzeRaster', () => {
  it('clusters a black/white raster into two segments', () => {
    const result = analyzeRaster(makeHalfSplit(), {
      k: 2,
      iterations: 10,
      stride: 1,
      minRegionSize: 1,
      random: seededRandom(3),
    });
    expect(result.k).toBe(2);
    expect(result.counts.reduce((sum, count) => sum + count, 0)).toBe(8);
    expect(result.summary.totalPixels).toBe(8);
    expect(result.summary.clusters).toHaveLength(2);
    expect(result.regions).toHaveLength(2);
  });

  it('handles an empty raster', () => {
    const result = analyzeRaster({
      width: 0,
      height: 0,
      data: new Uint8ClampedArray(0),
    });
    expect(result.k).toBe(0);
    expect(result.summary.totalPixels).toBe(0);
  });
});
