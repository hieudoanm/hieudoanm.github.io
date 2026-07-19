import type { ImageRaster, RgbTuple } from '@/types/image';

export const SAMPLE_STRIDE = 8;

export interface KMeansOptions {
  iterations: number;
}

export interface KMeansResult {
  centers: RgbTuple[];
  assignments: number[];
  iterations: number;
}

export const samplePixels = (
  raster: ImageRaster,
  stride: number
): RgbTuple[] => {
  const pixels: RgbTuple[] = [];
  const step = stride * 4;
  const { data } = raster;
  for (let offset = 0; offset < data.length; offset += step) {
    pixels.push({ r: data[offset], g: data[offset + 1], b: data[offset + 2] });
  }
  return pixels;
};

const distanceSquared = (a: RgbTuple, b: RgbTuple): number =>
  (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;

const pickCenters = (
  pixels: RgbTuple[],
  k: number,
  random: () => number
): RgbTuple[] => {
  const centers: RgbTuple[] = [];
  for (let index = 0; index < k; index += 1) {
    const pick = pixels[Math.floor(random() * pixels.length)];
    centers.push(pick ? { ...pick } : { r: 0, g: 0, b: 0 });
  }
  return centers;
};

export const kmeansRgb = (
  pixels: RgbTuple[],
  k: number,
  options: KMeansOptions = { iterations: 10 },
  random: () => number = Math.random
): KMeansResult => {
  if (pixels.length === 0) {
    return { centers: [], assignments: [], iterations: 0 };
  }
  const clusterCount = Math.max(1, Math.min(k, pixels.length));
  const centers = pickCenters(pixels, clusterCount, random);
  const assignments = new Array<number>(pixels.length).fill(0);
  let iterations = 0;
  for (; iterations < options.iterations; iterations += 1) {
    let changed = false;
    for (let index = 0; index < pixels.length; index += 1) {
      let best = 0;
      let bestDistance = Infinity;
      for (let cluster = 0; cluster < centers.length; cluster += 1) {
        const distance = distanceSquared(pixels[index], centers[cluster]);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = cluster;
        }
      }
      if (assignments[index] !== best) {
        assignments[index] = best;
        changed = true;
      }
    }
    if (!changed) {
      break;
    }
    for (let cluster = 0; cluster < centers.length; cluster += 1) {
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let count = 0;
      for (let index = 0; index < pixels.length; index += 1) {
        if (assignments[index] !== cluster) {
          continue;
        }
        totalR += pixels[index].r;
        totalG += pixels[index].g;
        totalB += pixels[index].b;
        count += 1;
      }
      if (count > 0) {
        centers[cluster] = {
          r: Math.round(totalR / count),
          g: Math.round(totalG / count),
          b: Math.round(totalB / count),
        };
      }
    }
  }
  return { centers, assignments, iterations };
};

export const classifyRaster = (
  raster: ImageRaster,
  centers: RgbTuple[]
): Uint8Array => {
  const classified = new Uint8Array(raster.width * raster.height);
  const { data } = raster;
  for (let index = 0; index < classified.length; index += 1) {
    const offset = index * 4;
    const pixel = { r: data[offset], g: data[offset + 1], b: data[offset + 2] };
    let best = 0;
    let bestDistance = Infinity;
    for (let cluster = 0; cluster < centers.length; cluster += 1) {
      const distance = distanceSquared(pixel, centers[cluster]);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = cluster;
      }
    }
    classified[index] = best;
  }
  return classified;
};

export const countPixels = (classified: Uint8Array, k: number): number[] => {
  const counts = new Array<number>(k).fill(0);
  for (const cluster of classified) {
    counts[cluster] += 1;
  }
  return counts;
};
