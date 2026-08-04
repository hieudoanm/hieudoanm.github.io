import {
  compositeChannels,
  computeHistogram,
  samplePlane,
} from '@/lib/image/channels';
import type { ChannelState, ImageRaster } from '@/types/image';

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
  describe('samplePlane', () => {
    it('extracts a single color plane as intensity', () => {
      const raster = makeRaster([
        [255, 0, 0, 255],
        [0, 128, 255, 255],
      ]);
      expect(Array.from(samplePlane(raster, 'r'))).toEqual([255, 0]);
      expect(Array.from(samplePlane(raster, 'g'))).toEqual([0, 128]);
      expect(Array.from(samplePlane(raster, 'b'))).toEqual([0, 255]);
    });
  });

  describe('compositeChannels', () => {
    it('produces the channel color where the plane has intensity', () => {
      const raster = makeRaster([[255, 0, 0, 255]]);
      const result = compositeChannels(raster, [redChannel]);
      expect(Array.from(result.data.slice(0, 3))).toEqual([255, 0, 48]);
    });

    it('ignores hidden channels', () => {
      const raster = makeRaster([[255, 0, 0, 255]]);
      const hidden = { ...redChannel, visible: false };
      const result = compositeChannels(raster, [hidden]);
      expect(Array.from(result.data.slice(0, 4))).toEqual([0, 0, 0, 0]);
    });

    it('scales intensity by opacity', () => {
      const raster = makeRaster([[255, 0, 0, 255]]);
      const faded = { ...redChannel, opacity: 0.5 };
      const result = compositeChannels(raster, [faded]);
      expect(Array.from(result.data.slice(0, 3))).toEqual([128, 0, 24]);
    });

    it('clamps composite values to 255', () => {
      const raster = makeRaster([[255, 0, 0, 255]]);
      const result = compositeChannels(raster, [redChannel, greenChannel]);
      expect(Array.from(result.data.slice(0, 4))).toEqual([255, 0, 48, 0]);
    });

    it('preserves raster dimensions', () => {
      const raster = makeRaster([
        [255, 0, 0, 255],
        [0, 255, 0, 255],
      ]);
      const result = compositeChannels(raster, [redChannel, greenChannel]);
      expect(result.width).toBe(2);
      expect(result.height).toBe(1);
    });
  });

  describe('computeHistogram', () => {
    it('counts intensity bins per plane', () => {
      const raster = makeRaster([
        [0, 100, 255, 255],
        [50, 100, 0, 255],
      ]);
      const histogram = computeHistogram(raster, 'g');
      expect(histogram[100]).toBe(2);
      expect(histogram[0]).toBe(0);
    });

    it('returns 256 bins', () => {
      const raster = makeRaster([[255, 255, 255, 255]]);
      expect(computeHistogram(raster, 'r')).toHaveLength(256);
    });
  });
});
