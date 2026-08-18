import { buildDensityMaps, densityOverlay } from '@/lib/analysis/density';

const classifyBlock = (
  width: number,
  height: number,
  k: number,
  blocks: { cluster: number; x: number; y: number; w: number; h: number }[]
): Uint8Array => {
  const classified = new Uint8Array(width * height).fill(k);
  for (const block of blocks) {
    for (let y = block.y; y < block.y + block.h; y += 1) {
      for (let x = block.x; x < block.x + block.w; x += 1) {
        classified[y * width + x] = block.cluster;
      }
    }
  }
  return classified;
};

describe('buildDensityMaps', () => {
  it('returns a map per cluster, all zero when the raster is empty', () => {
    const maps = buildDensityMaps(new Uint8Array(0), 0, 0, 3);
    expect(maps).toHaveLength(3);
    expect(maps[0]).toHaveLength(0);
  });

  it('produces a nonzero density peak near region centroids', () => {
    const classified = classifyBlock(64, 64, 2, [
      { cluster: 0, x: 10, y: 10, w: 6, h: 6 },
      { cluster: 0, x: 40, y: 40, w: 6, h: 6 },
    ]);
    const maps = buildDensityMaps(classified, 64, 64, 2, 10);
    const map = maps[0];
    expect(map[12 * 64 + 12]).toBeGreaterThan(0);
    expect(map[42 * 64 + 42]).toBeGreaterThan(0);
    expect(map[30 * 64 + 30]).toBe(0);
  });

  it('normalizes density into the 0..255 range', () => {
    const classified = classifyBlock(32, 32, 1, [
      { cluster: 0, x: 5, y: 5, w: 4, h: 4 },
      { cluster: 0, x: 10, y: 5, w: 4, h: 4 },
      { cluster: 0, x: 15, y: 5, w: 4, h: 4 },
    ]);
    const maps = buildDensityMaps(classified, 32, 32, 1, 8);
    let max = 0;
    for (const value of maps[0]) {
      if (value > max) {
        max = value;
      }
    }
    expect(max).toBe(255);
  });

  it('counts clusters into separate maps', () => {
    const classified = classifyBlock(32, 32, 2, [
      { cluster: 0, x: 4, y: 4, w: 4, h: 4 },
      { cluster: 1, x: 24, y: 24, w: 4, h: 4 },
    ]);
    const maps = buildDensityMaps(classified, 32, 32, 2, 6);
    expect(maps[0][6 * 32 + 6]).toBeGreaterThan(0);
    expect(maps[1][26 * 32 + 26]).toBeGreaterThan(0);
    expect(maps[0][26 * 32 + 26]).toBe(0);
    expect(maps[1][6 * 32 + 6]).toBe(0);
  });
});

describe('densityOverlay', () => {
  it('produces an RGBA raster with the expected footprint', () => {
    const maps = [
      new Uint8Array([0, 0, 255, 0]),
      new Uint8Array([0, 0, 0, 255]),
    ];
    const centers: { r: number; g: number; b: number }[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    const overlay = densityOverlay(maps, centers, 2, 2, 0.5);
    expect(overlay.width).toBe(2);
    expect(overlay.height).toBe(2);
    expect(overlay.data[2 * 4 + 3]).toBeGreaterThan(0);
    expect(overlay.data[0 * 4 + 3]).toBe(0);
  });

  it('weights red toward the denser cluster color', () => {
    const maps = [new Uint8Array([255]), new Uint8Array([0])];
    const centers: { r: number; g: number; b: number }[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    const overlay = densityOverlay(maps, centers, 1, 1, 0.5);
    expect(overlay.data[0]).toBe(255);
    expect(overlay.data[2]).toBe(0);
  });

  it('keeps the raster fully transparent when no densities exist', () => {
    const maps = [new Uint8Array(4), new Uint8Array(4)];
    const centers = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    const overlay = densityOverlay(maps, centers, 2, 2);
    for (let i = 0; i < 4; i += 1) {
      expect(overlay.data[i * 4 + 3]).toBe(0);
    }
  });
});
