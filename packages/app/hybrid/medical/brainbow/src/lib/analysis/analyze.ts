import type { ImageRaster, RgbTuple } from '@/types/image';
import {
  classifyRaster,
  countPixels,
  kmeansRgb,
  samplePixels,
  type KMeansResult,
} from '@/lib/image/segmentation';
import {
  countRegions,
  regionStats,
  type RegionStat,
} from '@/lib/image/regions';
import { summarize, type AnalysisSummary } from '@/lib/analysis/summary';

export interface AnalyzeOptions {
  k: number;
  iterations: number;
  stride: number;
  minRegionSize: number;
  random?: () => number;
}

export interface ImageAnalysis {
  k: number;
  centers: RgbTuple[];
  classified: Uint8Array;
  counts: number[];
  regions: number[];
  regionStats: RegionStat[];
  summary: AnalysisSummary;
}

export const DEFAULT_ANALYZE_OPTIONS: AnalyzeOptions = {
  k: 5,
  iterations: 10,
  stride: 4,
  minRegionSize: 4,
};

export const analyzeRaster = (
  raster: ImageRaster,
  options: Partial<AnalyzeOptions> = {}
): ImageAnalysis => {
  const resolved: AnalyzeOptions = { ...DEFAULT_ANALYZE_OPTIONS, ...options };
  const pixels = samplePixels(raster, resolved.stride);
  const kmeans: KMeansResult = kmeansRgb(
    pixels,
    resolved.k,
    { iterations: resolved.iterations },
    resolved.random
  );
  if (kmeans.centers.length === 0) {
    return {
      k: 0,
      centers: [],
      classified: new Uint8Array(0),
      counts: [],
      regions: [],
      regionStats: [],
      summary: { totalPixels: 0, clusters: [], diversity: 0 },
    };
  }
  const classified = classifyRaster(raster, kmeans.centers);
  const counts = countPixels(classified, kmeans.centers.length);
  const regions = countRegions(
    classified,
    raster.width,
    raster.height,
    kmeans.centers.length,
    resolved.minRegionSize
  );
  const stats = regionStats(classified, raster, resolved.minRegionSize);
  const summary = summarize(
    kmeans.centers,
    counts,
    regions,
    raster.width * raster.height
  );
  return {
    k: kmeans.centers.length,
    centers: kmeans.centers,
    classified,
    counts,
    regions,
    regionStats: stats,
    summary,
  };
};
