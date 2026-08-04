import { countRegions } from '@/lib/image/regions';

const filled = (value: number, size: number): Uint8Array =>
  new Uint8Array(size).fill(value);

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
