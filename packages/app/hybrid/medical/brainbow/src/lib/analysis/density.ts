import type { ImageRaster, RgbTuple } from '@/types/image';
import { regionCentroids } from '@/lib/image/regions';

export const DENSITY_DEFAULT_RADIUS = 24;
export const DENSITY_DEFAULT_OPACITY = 0.55;

const boxCount = (
  grid: Float32Array,
  width: number,
  height: number,
  radius: number
): Uint8Array => {
  const satWidth = width + 1;
  const sat = new Float64Array(satWidth * (height + 1));
  for (let y = 0; y < height; y += 1) {
    const row = (y + 1) * satWidth;
    const prev = y * satWidth;
    for (let x = 0; x < width; x += 1) {
      sat[row + x + 1] =
        grid[y * width + x] + sat[prev + x + 1] + sat[row + x] - sat[prev + x];
    }
  }
  let max = 0;
  const counts = new Float32Array(width * height);
  for (let y = 0; y < height; y += 1) {
    const x0 = Math.max(0, y - radius);
    const x1 = Math.min(height, y + radius + 1);
    for (let x = 0; x < width; x += 1) {
      const left = Math.max(0, x - radius);
      const right = Math.min(width, x + radius + 1);
      const value =
        sat[x1 * satWidth + right] -
        sat[x0 * satWidth + right] -
        sat[x1 * satWidth + left] +
        sat[x0 * satWidth + left];
      counts[y * width + x] = value;
      if (value > max) {
        max = value;
      }
    }
  }
  const result = new Uint8Array(width * height);
  if (max === 0) {
    return result;
  }
  const scale = 255 / max;
  for (let i = 0; i < result.length; i += 1) {
    result[i] = Math.round(counts[i] * scale);
  }
  return result;
};

export const buildDensityMaps = (
  classified: Uint8Array,
  width: number,
  height: number,
  k: number,
  radius: number = DENSITY_DEFAULT_RADIUS
): Uint8Array[] => {
  const maps: Uint8Array[] = [];
  if (width === 0 || height === 0 || classified.length === 0 || k === 0) {
    for (let c = 0; c < k; c += 1) {
      maps.push(new Uint8Array(width * height));
    }
    return maps;
  }
  const grids = Array.from(
    { length: k },
    () => new Float32Array(width * height)
  );
  for (const centroid of regionCentroids(classified, width, height, k)) {
    const x = Math.round(centroid.cx);
    const y = Math.round(centroid.cy);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      grids[centroid.cluster][y * width + x] += 1;
    }
  }
  for (let c = 0; c < k; c += 1) {
    maps.push(boxCount(grids[c], width, height, radius));
  }
  return maps;
};

export const densityOverlay = (
  maps: Uint8Array[],
  centers: RgbTuple[],
  width: number,
  height: number,
  opacity: number = DENSITY_DEFAULT_OPACITY
): ImageRaster => {
  const data = new Uint8ClampedArray(width * height * 4);
  const clusters = Math.min(maps.length, centers.length);
  for (let i = 0; i < width * height; i += 1) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let sum = 0;
    for (let c = 0; c < clusters; c += 1) {
      const density = maps[c][i] / 255;
      if (density > 0) {
        red += density * centers[c].r;
        green += density * centers[c].g;
        blue += density * centers[c].b;
        sum += density;
      }
    }
    const offset = i * 4;
    if (sum > 0) {
      data[offset] = red / sum;
      data[offset + 1] = green / sum;
      data[offset + 2] = blue / sum;
    }
    data[offset + 3] = Math.round(Math.min(1, sum) * opacity * 255);
  }
  return { width, height, data };
};
