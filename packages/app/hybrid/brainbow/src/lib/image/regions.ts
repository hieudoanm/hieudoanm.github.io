import type { ImageRaster } from '@/types/image';

export const DEFAULT_MIN_REGION_SIZE = 4;

export interface RegionStat {
  id: number;
  cluster: number;
  area: number;
  meanIntensity: number;
  centroidX: number;
  centroidY: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const neighbors = (index: number, width: number, height: number): number[] => {
  const x = index % width;
  const y = Math.floor(index / width);
  const out: number[] = [];
  if (x > 0) {
    out.push(index - 1);
  }
  if (x < width - 1) {
    out.push(index + 1);
  }
  if (y > 0) {
    out.push(index - width);
  }
  if (y < height - 1) {
    out.push(index + width);
  }
  return out;
};

const walkRegions = function* (
  classified: Uint8Array,
  width: number,
  height: number,
  minRegionSize: number
): Generator<{ cluster: number; pixels: Uint32Array }> {
  const visited = new Uint8Array(classified.length);
  const stack: number[] = [];
  for (let index = 0; index < classified.length; index += 1) {
    if (visited[index]) {
      continue;
    }
    const cluster = classified[index];
    visited[index] = 1;
    stack.length = 0;
    stack.push(index);
    const pixels: number[] = [];
    while (stack.length > 0) {
      const current = stack.pop() as number;
      pixels.push(current);
      for (const next of neighbors(current, width, height)) {
        if (!visited[next] && classified[next] === cluster) {
          visited[next] = 1;
          stack.push(next);
        }
      }
    }
    if (pixels.length >= minRegionSize) {
      yield { cluster, pixels: Uint32Array.from(pixels) };
    }
  }
};

export const countRegions = (
  classified: Uint8Array,
  width: number,
  height: number,
  k: number,
  minRegionSize: number = DEFAULT_MIN_REGION_SIZE
): number[] => {
  const counts = new Array<number>(k).fill(0);
  if (width === 0 || height === 0 || classified.length === 0) {
    return counts;
  }
  for (const region of walkRegions(classified, width, height, minRegionSize)) {
    counts[region.cluster] += 1;
  }
  return counts;
};

export interface RegionCentroid {
  cluster: number;
  cx: number;
  cy: number;
}

export const regionCentroids = (
  classified: Uint8Array,
  width: number,
  height: number,
  k: number,
  minRegionSize: number = DEFAULT_MIN_REGION_SIZE
): RegionCentroid[] => {
  if (width === 0 || height === 0 || classified.length === 0) {
    return [];
  }
  const centroids: RegionCentroid[] = [];
  for (const region of walkRegions(classified, width, height, minRegionSize)) {
    if (region.cluster >= k) continue;
    let centroidX = 0;
    let centroidY = 0;
    for (const pixel of region.pixels) {
      centroidX += pixel % width;
      centroidY += Math.floor(pixel / width);
    }
    const size = region.pixels.length;
    centroids.push({
      cluster: region.cluster,
      cx: centroidX / size,
      cy: centroidY / size,
    });
  }
  return centroids;
};

const luminance = (raster: ImageRaster, index: number): number => {
  const offset = index * 4;
  return (
    0.299 * raster.data[offset] +
    0.587 * raster.data[offset + 1] +
    0.114 * raster.data[offset + 2]
  );
};

export const regionStats = (
  classified: Uint8Array,
  raster: ImageRaster,
  minRegionSize: number = DEFAULT_MIN_REGION_SIZE
): RegionStat[] => {
  const { width, height } = raster;
  if (width === 0 || height === 0 || classified.length === 0) {
    return [];
  }
  const regions: RegionStat[] = [];
  for (const region of walkRegions(classified, width, height, minRegionSize)) {
    let intensitySum = 0;
    let centroidX = 0;
    let centroidY = 0;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    for (const pixel of region.pixels) {
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      intensitySum += luminance(raster, pixel);
      centroidX += x;
      centroidY += y;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
    const size = region.pixels.length;
    regions.push({
      id: regions.length,
      cluster: region.cluster,
      area: size,
      meanIntensity: intensitySum / size,
      centroidX: centroidX / size,
      centroidY: centroidY / size,
      minX,
      minY,
      maxX,
      maxY,
    });
  }
  return regions;
};
