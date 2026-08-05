import type {
  ChannelPlane,
  ChannelRaster,
  ChannelState,
  ImageRaster,
  Plane,
  RgbTuple,
} from '@/types/image';

export const PLANE_INDEX: Record<Plane, number> = { r: 0, g: 1, b: 2 };

export const DEFAULT_PLANES: Plane[] = ['r', 'g', 'b'];

export const CHANNEL_COLORS = [
  '#ff0030',
  '#00c853',
  '#4da3ff',
  '#ffd000',
  '#ff7b00',
  '#e040fb',
  '#00e5ff',
  '#76ff03',
];

export const createChannelState = (
  planes: ChannelPlane[],
  existing: ChannelState[],
  id: string
): ChannelState => {
  const unused = planes.find(
    (plane) => !existing.some((channel) => channel.sourcePlane === plane.id)
  );
  return {
    id,
    name: `Channel ${existing.length + 1}`,
    sourcePlane: unused?.id ?? planes[0]?.id ?? 'r',
    color: CHANNEL_COLORS[existing.length % CHANNEL_COLORS.length],
    visible: true,
    opacity: 1,
  };
};

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

export const getPlane = (
  raster: ChannelRaster,
  planeId: string
): Uint8ClampedArray | null =>
  raster.planes.find((plane) => plane.id === planeId)?.data ?? null;

export const samplePlane = (
  raster: ChannelRaster,
  planeId: string
): Uint8ClampedArray =>
  getPlane(raster, planeId) ??
  new Uint8ClampedArray(raster.width * raster.height);

export const toChannelRaster = (
  raster: ImageRaster,
  names: Record<Plane, string> = { r: 'Red', g: 'Green', b: 'Blue' }
): ChannelRaster => ({
  width: raster.width,
  height: raster.height,
  planes: DEFAULT_PLANES.map((plane) => {
    const index = PLANE_INDEX[plane];
    const data = new Uint8ClampedArray(raster.width * raster.height);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = raster.data[i * 4 + index];
    }
    return { id: plane, name: names[plane], data };
  }),
});

export const compositeChannels = (
  raster: ChannelRaster,
  channels: ChannelState[]
): ImageRaster => {
  const { width, height } = raster;
  const out = new Uint8ClampedArray(width * height * 4);

  for (const channel of channels) {
    if (!channel.visible || channel.opacity <= 0) continue;

    const data = getPlane(raster, channel.sourcePlane);
    if (!data) continue;

    const color = hexToRgb(channel.color);
    for (let i = 0; i < width * height; i += 1) {
      const intensity = (data[i] / 255) * channel.opacity;
      const offset = i * 4;
      out[offset] += intensity * color.r;
      out[offset + 1] += intensity * color.g;
      out[offset + 2] += intensity * color.b;
    }
  }

  for (let i = 0; i < width * height; i += 1) {
    const offset = i * 4;
    out[offset] = Math.min(255, Math.round(out[offset]));
    out[offset + 1] = Math.min(255, Math.round(out[offset + 1]));
    out[offset + 2] = Math.min(255, Math.round(out[offset + 2]));
    out[offset + 3] = 255;
  }

  return { width, height, data: out };
};

export const compositePlaneHistogram = (
  raster: ChannelRaster,
  planeId: string
): number[] => {
  const histogram = new Array<number>(256).fill(0);
  const data = getPlane(raster, planeId);
  if (!data) return histogram;
  for (const value of data) {
    histogram[value] += 1;
  }
  return histogram;
};

export const computeHistogram = (
  raster: ChannelRaster,
  planeId: string
): number[] => compositePlaneHistogram(raster, planeId);
