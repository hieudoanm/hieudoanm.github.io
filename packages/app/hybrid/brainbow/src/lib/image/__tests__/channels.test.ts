import {
  compositeChannels,
  computeHistogram,
  createChannelState,
  samplePlane,
  toChannelRaster,
} from '@/lib/image/channels';
import type {
  ChannelPlane,
  ChannelRaster,
  ChannelState,
  ImageRaster,
} from '@/types/image';

const makePlanes = (): ChannelPlane[] => [
  { id: 'r', name: 'Red', data: new Uint8ClampedArray(0) },
  { id: 'g', name: 'Green', data: new Uint8ClampedArray(0) },
  { id: 'fr', name: 'Far-red', data: new Uint8ClampedArray(0) },
];

const makeChannelRaster = (
  pixels: [number, number, number][]
): ChannelRaster => {
  const planeData = (index: number): Uint8ClampedArray =>
    new Uint8ClampedArray(pixels.map((pixel) => pixel[index]));
  return {
    width: pixels.length,
    height: 1,
    planes: [
      { id: 'r', name: 'Red', data: planeData(0) },
      { id: 'g', name: 'Green', data: planeData(1) },
      { id: 'b', name: 'Blue', data: planeData(2) },
    ],
  };
};

const makeRaster = (
  pixels: [number, number, number, number][]
): ImageRaster => {
  const data = new Uint8ClampedArray(pixels.length * 4);
  pixels.forEach(([r, g, b, a], index) => {
    const offset = index * 4;
    data[offset] = r;
    data[offset + 1] = g;
    data[offset + 2] = b;
    data[offset + 3] = a;
  });
  return { width: pixels.length, height: 1, data };
};

const redChannel: ChannelState = {
  id: 'r',
  name: 'Red',
  sourcePlane: 'r',
  color: '#ff0030',
  visible: true,
  opacity: 1,
};

const greenChannel: ChannelState = {
  id: 'g',
  name: 'Green',
  sourcePlane: 'g',
  color: '#00c853',
  visible: true,
  opacity: 1,
};

describe('channel math', () => {
  describe('toChannelRaster', () => {
    it('splits an RGBA raster into color planes', () => {
      const raster = makeRaster([
        [255, 0, 0, 255],
        [0, 128, 255, 255],
      ]);
      const channelRaster = toChannelRaster(raster);
      expect(channelRaster.width).toBe(2);
      expect(channelRaster.height).toBe(1);
      expect(channelRaster.planes).toHaveLength(3);
      expect(Array.from(samplePlane(channelRaster, 'r'))).toEqual([255, 0]);
      expect(Array.from(samplePlane(channelRaster, 'g'))).toEqual([0, 128]);
      expect(Array.from(samplePlane(channelRaster, 'b'))).toEqual([0, 255]);
    });

    it('supports arbitrary plane identifiers', () => {
      const raster = makeChannelRaster([
        [10, 0, 0],
        [20, 0, 0],
      ]);
      expect(Array.from(samplePlane(raster, 'r'))).toEqual([10, 20]);
    });
  });

  describe('samplePlane', () => {
    it('extracts a single color plane as intensity', () => {
      const raster = makeChannelRaster([
        [255, 0, 0],
        [0, 128, 255],
      ]);
      expect(Array.from(samplePlane(raster, 'r'))).toEqual([255, 0]);
      expect(Array.from(samplePlane(raster, 'g'))).toEqual([0, 128]);
      expect(Array.from(samplePlane(raster, 'b'))).toEqual([0, 255]);
    });

    it('returns zeros for a missing plane', () => {
      const raster = makeChannelRaster([
        [255, 0, 0],
        [0, 128, 255],
      ]);
      expect(Array.from(samplePlane(raster, 'far-red'))).toEqual([0, 0]);
    });
  });

  describe('compositeChannels', () => {
    it('produces the channel color where the plane has intensity', () => {
      const raster = makeChannelRaster([[255, 0, 0]]);
      const result = compositeChannels(raster, [redChannel]);
      expect(Array.from(result.data.slice(0, 3))).toEqual([255, 0, 48]);
    });

    it('ignores hidden channels', () => {
      const raster = makeChannelRaster([[255, 0, 0]]);
      const hidden = { ...redChannel, visible: false };
      const result = compositeChannels(raster, [hidden]);
      expect(Array.from(result.data.slice(0, 4))).toEqual([0, 0, 0, 255]);
    });

    it('scales intensity by opacity', () => {
      const raster = makeChannelRaster([[255, 0, 0]]);
      const faded = { ...redChannel, opacity: 0.5 };
      const result = compositeChannels(raster, [faded]);
      expect(Array.from(result.data.slice(0, 3))).toEqual([128, 0, 24]);
    });

    it('clamps composite values to 255', () => {
      const raster = makeChannelRaster([[255, 0, 0]]);
      const result = compositeChannels(raster, [redChannel, greenChannel]);
      expect(Array.from(result.data.slice(0, 4))).toEqual([255, 0, 48, 255]);
    });

    it('ignores channels whose source plane is missing', () => {
      const raster = makeChannelRaster([[255, 0, 0]]);
      const custom = { ...redChannel, sourcePlane: 'far-red' };
      const result = compositeChannels(raster, [custom]);
      expect(Array.from(result.data.slice(0, 3))).toEqual([0, 0, 0]);
    });

    it('preserves raster dimensions', () => {
      const raster = makeChannelRaster([
        [255, 0, 0],
        [0, 255, 0],
      ]);
      const result = compositeChannels(raster, [redChannel, greenChannel]);
      expect(result.width).toBe(2);
      expect(result.height).toBe(1);
    });
  });

  describe('createChannelState', () => {
    it('picks the first unused plane for a new channel', () => {
      const channel = createChannelState(makePlanes(), [redChannel], 'c-1');
      expect(channel.id).toBe('c-1');
      expect(channel.sourcePlane).toBe('g');
      expect(channel.name).toBe('Channel 2');
    });

    it('falls back to an available plane when all are used', () => {
      const used = [redChannel, { ...greenChannel, sourcePlane: 'fr' }];
      const channel = createChannelState([makePlanes()[0]], used, 'c-2');
      expect(channel.sourcePlane).toBe('r');
    });

    it('defaults to r when no planes exist', () => {
      const channel = createChannelState([], [], 'c-3');
      expect(channel.sourcePlane).toBe('r');
    });
  });

  describe('computeHistogram', () => {
    it('counts intensity bins per plane', () => {
      const raster = makeChannelRaster([
        [0, 100, 255],
        [50, 100, 0],
      ]);
      const histogram = computeHistogram(raster, 'g');
      expect(histogram[100]).toBe(2);
      expect(histogram[0]).toBe(0);
    });

    it('returns 256 bins', () => {
      const raster = makeChannelRaster([[255, 255, 255]]);
      expect(computeHistogram(raster, 'r')).toHaveLength(256);
    });

    it('returns empty bins for a missing plane', () => {
      const raster = makeChannelRaster([[255, 255, 255]]);
      expect(computeHistogram(raster, 'unknown')).toEqual(
        new Array<number>(256).fill(0)
      );
    });
  });
});
