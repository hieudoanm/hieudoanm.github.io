import { countRegions, regionStats } from '@/lib/image/regions';
import type { ImageRaster } from '@/types/image';

const filled = (value: number, size: number): Uint8Array =>
  new Uint8Array(size).fill(value);

const uniformRaster = (
  width: number,
  height: number,
  value = 255
): ImageRaster => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i += 1) {
    data[i * 4] = value;
    data[i * 4 + 1] = value;
    data[i * 4 + 2] = value;
    data[i * 4 + 3] = 255;
  }
  return { width, height, data };
};

describe('countRegions', () => {
  it('counts a single connected region', () => {
    const classified = filled(0, 4);
    expect(countRegions(classified, 2, 2, 1)).toEqual([1]);
  });

  it('counts multiple regions of the same cluster', () => {
    // 2x4: two separate 2x2 blocks of cluster 0
    const classified = new Uint8Array([0, 0, 1, 1, 0, 0, 1, 1]);
    expect(countRegions(classified, 4, 2, 2)).toEqual([1, 1]);
  });

  it('ignores regions smaller than minRegionSize', () => {
    // 2x2 checkerboard: each pixel is its own region of size 1
    const classified = new Uint8Array([0, 1, 1, 0]);
    expect(countRegions(classified, 2, 2, 2, 4)).toEqual([0, 0]);
    expect(countRegions(classified, 2, 2, 2, 1)).toEqual([2, 2]);
  });

  it('returns zeros for an empty raster', () => {
    expect(countRegions(new Uint8Array(0), 0, 0, 3)).toEqual([0, 0, 0]);
  });
});

describe('regionStats', () => {
  it('reports area and centroid for a uniform block', () => {
    const classified = filled(0, 4);
    const regions = regionStats(classified, uniformRaster(2, 2), 1);
    expect(regions).toHaveLength(1);
    expect(regions[0]).toEqual({
      id: 0,
      cluster: 0,
      area: 4,
      meanIntensity: 255,
      centroidX: 0.5,
      centroidY: 0.5,
      minX: 0,
      minY: 0,
      maxX: 1,
      maxY: 1,
    });
  });

  it('computes mean intensity from luminance over the region', () => {
    // 2x2, single cluster; only the top-left pixel is bright
    const raster = uniformRaster(2, 2, 0);
    raster.data[0] = 255;
    raster.data[1] = 255;
    raster.data[2] = 255;
    const regions = regionStats(filled(0, 4), raster, 1);
    expect(regions[0].meanIntensity).toBeCloseTo(63.75);
  });

  it('keeps separate regions distinct', () => {
    // 2x4: two 2x2 blocks of cluster 0
    const classified = new Uint8Array([0, 0, 1, 1, 0, 0, 1, 1]);
    const regions = regionStats(classified, uniformRaster(4, 2), 1);
    expect(regions).toHaveLength(2);
    expect(regions[0].centroidX).toBeCloseTo(0.5);
    expect(regions[1].centroidX).toBeCloseTo(2.5);
    expect(regions[1].cluster).toBe(1);
  });

  it('ignores regions smaller than minRegionSize', () => {
    const regions = regionStats(filled(0, 4), uniformRaster(2, 2), 5);
    expect(regions).toEqual([]);
  });

  it('returns an empty list for an empty raster', () => {
    expect(
      regionStats(new Uint8Array(0), {
        width: 0,
        height: 0,
        data: new Uint8ClampedArray(0),
      })
    ).toEqual([]);
  });
});
