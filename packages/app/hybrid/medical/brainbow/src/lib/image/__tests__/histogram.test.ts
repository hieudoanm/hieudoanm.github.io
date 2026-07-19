import {
  analyzeChannels,
  computeChannelStats,
  histogramPeak,
  normalizeHistogram,
} from '@/lib/image/histogram';
import type { ChannelRaster, ChannelState } from '@/types/image';

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
      const raster = makeChannelRaster([
        [255, 10, 0],
        [0, 10, 200],
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
      const raster = makeChannelRaster([[255, 0, 0]]);
      expect(analyzeChannels(raster, [])).toEqual([]);
    });

    it('supports analysis of non-RGB source planes', () => {
      const raster = makeChannelRaster([[120, 0, 0]]);
      const farRed = { ...redChannel, sourcePlane: 'far-red' };
      const [analysis] = analyzeChannels(raster, [farRed]);
      expect(analysis.stats.count).toBe(0);
    });
  });
});
