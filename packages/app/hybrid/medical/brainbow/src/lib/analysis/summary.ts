import type { RgbTuple } from '@/types/image';

export interface ClusterSummary {
  index: number;
  color: RgbTuple;
  pixelCount: number;
  areaCoverage: number;
  regionCount: number;
}

export interface AnalysisSummary {
  totalPixels: number;
  clusters: ClusterSummary[];
  diversity: number;
}

export const diversityIndex = (proportions: number[]): number => {
  let entropy = 0;
  for (const proportion of proportions) {
    if (proportion <= 0) {
      continue;
    }
    entropy -= proportion * Math.log2(proportion);
  }
  return entropy;
};

export const summarize = (
  centers: RgbTuple[],
  counts: number[],
  regions: number[],
  totalPixels: number
): AnalysisSummary => {
  const clusters: ClusterSummary[] = centers.map((color, index) => {
    const pixelCount = counts[index] ?? 0;
    return {
      index,
      color,
      pixelCount,
      areaCoverage: totalPixels === 0 ? 0 : pixelCount / totalPixels,
      regionCount: regions[index] ?? 0,
    };
  });
  return {
    totalPixels,
    clusters,
    diversity: diversityIndex(clusters.map((cluster) => cluster.areaCoverage)),
  };
};
