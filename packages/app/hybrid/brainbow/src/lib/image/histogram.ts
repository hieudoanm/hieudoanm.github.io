import type { ChannelState, ImageRaster } from '@/types/image';
import { computeHistogram } from './channels';

export interface ChannelStats {
  min: number;
  max: number;
  mean: number;
  count: number;
}

export interface ChannelAnalysis {
  id: string;
  color: string;
  histogram: number[];
  stats: ChannelStats;
}

export const computeChannelStats = (histogram: number[]): ChannelStats => {
  let count = 0;
  let sum = 0;
  let min = 255;
  let max = 0;

  for (let i = 0; i < histogram.length; i += 1) {
    const countAt = histogram[i];
    if (countAt === 0) continue;
    count += countAt;
    sum += countAt * i;
    if (i < min) min = i;
    if (i > max) max = i;
  }

  if (count === 0) {
    min = 0;
    max = 0;
  }

  return { min, max, mean: count === 0 ? 0 : sum / count, count };
};

export const histogramPeak = (histogram: number[]): number =>
  histogram.reduce((peak, value) => Math.max(peak, value), 0);

export const normalizeHistogram = (
  histogram: number[],
  maxHeight: number
): number[] => {
  const peak = histogramPeak(histogram);
  if (peak === 0) return new Array<number>(histogram.length).fill(0);
  return histogram.map((value) => Math.round((value / peak) * maxHeight));
};

export const analyzeChannels = (
  raster: ImageRaster,
  channels: ChannelState[]
): ChannelAnalysis[] =>
  channels.map((channel) => {
    const histogram = computeHistogram(raster, channel.sourcePlane);
    return {
      id: channel.id,
      color: channel.color,
      histogram,
      stats: computeChannelStats(histogram),
    };
  });
