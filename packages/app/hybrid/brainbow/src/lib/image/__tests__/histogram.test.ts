import {
  analyzeChannels,
  computeChannelStats,
  histogramPeak,
  normalizeHistogram,
} from '@/lib/image/histogram';
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

describe('histogram math', () => {
  describe('computeChannelStats', () => {
    it('computes min, max, mean, and count from a histogram', () => {
      const histogram = [0, 2, 0, 1, 1];
      const stats = computeChannelStats(histogram);
      expect(stats).toEqual({ min: 1, max: 4, mean: 2.25, count: 4 });
    });

    it('returns zeros for an empty histogram', () => {
      const stats = computeChannelStats(new Array<number>(256).fill(0));
      expect(stats).toEqual({ min: 0, max: 0, mean: 0, count: 0 });
    });

    it('ignores empty bins', () => {
      const stats = computeChannelStats([0, 0, 0, 3]);
      expect(stats).toEqual({ min: 3, max: 3, mean: 3, count: 3 });
    });
  });

  describe('histogramPeak', () => {
    it('returns the highest bin count', () => {
      expect(histogramPeak([3, 0, 8, 2])).toBe(8);
    });

    it('returns zero for an empty histogram', () => {
      expect(histogramPeak([0, 0, 0])).toBe(0);
    });
  });

  describe('normalizeHistogram', () => {
    it('scales bins to the given max height', () => {
      expect(normalizeHistogram([2, 0, 4], 100)).toEqual([50, 0, 100]);
    });

    it('returns zeros when the histogram is empty', () => {
      expect(normalizeHistogram([0, 0], 100)).toEqual([0, 0]);
    });
  });

  describe('analyzeChannels', () => {
    it('analyzes each channel from its source plane', () => {
      const raster = makeRaster([
        [255, 10, 0, 255],
        [0, 10, 200, 255],
      ]);
      const analyses = analyzeChannels(raster, [redChannel]);
      expect(analyses).toHaveLength(1);
      expect(analyses[0].id).toBe('r');
      expect(analyses[0].color).toBe('#ff0030');
      expect(analyses[0].histogram[255]).toBe(1);
      expect(analyses[0].histogram[0]).toBe(1);
      expect(analyses[0].stats).toEqual({
        min: 0,
        max: 255,
        mean: 127.5,
        count: 2,
      });
    });

    it('returns an empty array for no channels', () => {
      const raster = makeRaster([[255, 0, 0, 255]]);
      expect(analyzeChannels(raster, [])).toEqual([]);
    });
  });
});
