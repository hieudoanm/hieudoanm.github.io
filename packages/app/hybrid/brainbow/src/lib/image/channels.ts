import type { ChannelState, ImageRaster, Plane, RgbTuple } from '@/types/image';

export const PLANE_INDEX: Record<Plane, number> = { r: 0, g: 1, b: 2 };

export const hexToRgb = (hex: string): RgbTuple => {
  const value = hex.replace('#', '');
  const parsed = Number.parseInt(value, 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
};

export const planeToRgb = (plane: Plane): RgbTuple => {
  const rgb: RgbTuple = { r: 0, g: 0, b: 0 };
  rgb[plane] = 255;
  return rgb;
};

export const samplePlane = (
  raster: ImageRaster,
  plane: Plane
): Uint8ClampedArray => {
  const index = PLANE_INDEX[plane];
  const out = new Uint8ClampedArray(raster.width * raster.height);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = raster.data[i * 4 + index];
  }
  return out;
};

export const compositeChannels = (
  source: ImageRaster,
  channels: ChannelState[]
): ImageRaster => {
  const { width, height, data } = source;
  const out = new Uint8ClampedArray(width * height * 4);

  for (const channel of channels) {
    if (!channel.visible || channel.opacity <= 0) continue;

    const index = PLANE_INDEX[channel.sourcePlane];
    const color = hexToRgb(channel.color);

    for (let i = 0; i < width * height; i += 1) {
      const intensity = (data[i * 4 + index] / 255) * channel.opacity;
      const offset = i * 4;
      out[offset] += intensity * color.r;
      out[offset + 1] += intensity * color.g;
      out[offset + 2] += intensity * color.b;
    }
  }

  for (let i = 0; i < out.length; i += 1) {
    out[i] = Math.min(255, Math.round(out[i]));
  }

  return { width, height, data: out };
};

export const computeHistogram = (
  raster: ImageRaster,
  plane: Plane
): number[] => {
  const histogram = new Array<number>(256).fill(0);
  const index = PLANE_INDEX[plane];
  for (let i = 0; i < raster.width * raster.height; i += 1) {
    histogram[raster.data[i * 4 + index]] += 1;
  }
  return histogram;
};
