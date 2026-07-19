import type { ImageRaster } from '@/types/image';

const mulberry32 = (seed: number) => () => {
  let value = (seed += 0x6d2b79f5);
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

interface BlobSpec {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  color: [number, number, number];
  intensity: number;
}

const blobAt = (
  data: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  blob: BlobSpec
): void => {
  const dx = x - blob.x;
  const dy = y - blob.y;
  const cos = Math.cos(blob.rotation);
  const sin = Math.sin(blob.rotation);
  const rx = dx * cos + dy * sin;
  const ry = -dx * sin + dy * cos;

  const distance =
    (rx * rx) / (blob.radiusX * blob.radiusX) +
    (ry * ry) / (blob.radiusY * blob.radiusY);

  if (distance >= 1) return;

  const falloff = Math.pow(1 - distance, 2) * blob.intensity;
  const offset = (y * width + x) * 4;
  data[offset] += falloff * blob.color[0];
  data[offset + 1] += falloff * blob.color[1];
  data[offset + 2] += falloff * blob.color[2];
};

const makeBlobs = (width: number, height: number): BlobSpec[] => {
  const random = mulberry32(42);
  const palette: [number, number, number][] = [
    [255, 0, 48],
    [255, 212, 0],
    [0, 200, 83],
    [77, 163, 255],
    [255, 123, 0],
  ];
  const blobs: BlobSpec[] = [];

  for (let i = 0; i < 24; i += 1) {
    blobs.push({
      x: random() * width,
      y: random() * height,
      radiusX: width * (0.03 + random() * 0.07),
      radiusY: width * (0.03 + random() * 0.09),
      rotation: random() * Math.PI,
      color: palette[i % palette.length],
      intensity: 0.7 + random() * 0.3,
    });
  }

  return blobs;
};

export const createSampleRaster = (width = 800, height = 600): ImageRaster => {
  const data = new Uint8ClampedArray(width * height * 4);
  const blobs = makeBlobs(width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      for (const blob of blobs) {
        blobAt(data, width, x, y, blob);
      }
    }
  }

  return { width, height, data };
};

export const SAMPLE_NAME = 'demo-brainbow.tif';
