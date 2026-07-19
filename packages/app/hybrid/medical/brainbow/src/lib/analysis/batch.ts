import {
  analyzeRaster,
  type AnalyzeOptions,
  type ImageAnalysis,
} from '@/lib/analysis/analyze';
import type { ImageRaster } from '@/types/image';

export interface BatchAggregate {
  imageCount: number;
  totalPixels: number;
  totalRegions: number;
  meanDiversity: number;
}

export interface BatchResult {
  results: ImageAnalysis[];
  aggregate: BatchAggregate;
}

const yieldToUi = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const aggregate = (results: ImageAnalysis[]): BatchAggregate => {
  const imageCount = results.length;
  const totalPixels = results.reduce(
    (sum, result) => sum + result.summary.totalPixels,
    0
  );
  const totalRegions = results.reduce(
    (sum, result) =>
      sum + result.regions.reduce((regionSum, count) => regionSum + count, 0),
    0
  );
  const diversitySum = results.reduce(
    (sum, result) => sum + result.summary.diversity,
    0
  );
  return {
    imageCount,
    totalPixels,
    totalRegions,
    meanDiversity: imageCount === 0 ? 0 : diversitySum / imageCount,
  };
};

export const analyzeBatch = async (
  rasters: ImageRaster[],
  options: Partial<AnalyzeOptions> = {},
  onProgress: (completed: number, total: number) => void = () => undefined
): Promise<BatchResult> => {
  const results: ImageAnalysis[] = [];
  for (let index = 0; index < rasters.length; index += 1) {
    results.push(analyzeRaster(rasters[index], options));
    onProgress(index + 1, rasters.length);
    await yieldToUi();
  }
  return { results, aggregate: aggregate(results) };
};
