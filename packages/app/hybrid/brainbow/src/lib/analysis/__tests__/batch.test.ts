import { aggregate, analyzeBatch } from '@/lib/analysis/batch';
import { analyzeRaster } from '@/lib/analysis/analyze';
import type { ImageRaster } from '@/types/image';

const makeRaster = (value: number): ImageRaster => ({
  width: 2,
  height: 1,
  data: new Uint8ClampedArray([
    value,
    value,
    value,
    255,
    value,
    value,
    value,
    255,
  ]),
});

describe('analyzeBatch', () => {
  it('reports progress and aggregates results', async () => {
    const progress: number[][] = [];
    const batch = await analyzeBatch(
      [makeRaster(0), makeRaster(255)],
      { k: 1, iterations: 1, stride: 1, minRegionSize: 1 },
      (completed, total) => progress.push([completed, total])
    );
    expect(batch.results).toHaveLength(2);
    expect(progress).toEqual([
      [1, 2],
      [2, 2],
    ]);
    expect(batch.aggregate.imageCount).toBe(2);
    expect(batch.aggregate.totalPixels).toBe(4);
  });
});

describe('aggregate', () => {
  it('computes zero totals for no analyses', () => {
    expect(aggregate([])).toEqual({
      imageCount: 0,
      totalPixels: 0,
      totalRegions: 0,
      meanDiversity: 0,
    });
  });

  it('sums pixels and regions across analyses', () => {
    const analysis = analyzeRaster(makeRaster(0), {
      k: 1,
      iterations: 1,
      stride: 1,
      minRegionSize: 1,
    });
    const result = aggregate([analysis, analysis]);
    expect(result.imageCount).toBe(2);
    expect(result.totalPixels).toBe(4);
    expect(result.totalRegions).toBe(2);
  });
});
