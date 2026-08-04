import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { AnalyzeOptions } from '@/lib/analysis/analyze';

export const buildMethodsSnippet = (
  options: Pick<
    AnalyzeOptions,
    'k' | 'iterations' | 'stride' | 'minRegionSize'
  >,
  analyses: ImageAnalysis[]
): string => {
  const regions = analyses.reduce(
    (sum, analysis) =>
      sum + analysis.regions.reduce((regionSum, count) => regionSum + count, 0),
    0
  );
  return [
    `Pixels were sampled with a stride of ${options.stride} and clustered into k=${options.k} segments`,
    `using k-means on RGB intensity over ${options.iterations} iterations.`,
    `Connected components of at least ${options.minRegionSize} pixels per segment were counted as regions,`,
    `yielding ${regions} candidate structures across ${analyses.length} image${analyses.length === 1 ? '' : 's'}.`,
  ].join(' ');
};

const hex = (color: { r: number; g: number; b: number }): string =>
  `#${[color.r, color.g, color.b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;

const analysisToTable = (analysis: ImageAnalysis): string => {
  const rows = analysis.summary.clusters
    .map(
      (cluster) =>
        `<tr><td>${cluster.index + 1}</td><td>${hex(cluster.color)}</td>` +
        `<td>${cluster.pixelCount.toLocaleString()}</td>` +
        `<td>${(cluster.areaCoverage * 100).toFixed(2)}%</td>` +
        `<td>${cluster.regionCount}</td></tr>`
    )
    .join('');
  return (
    `<h3>Clusters</h3>` +
    `<table><thead><tr><th>Cluster</th><th>Color</th><th>Pixels</th>` +
    `<th>Coverage</th><th>Regions</th></tr></thead><tbody>${rows}</tbody></table>` +
    `<p>Shannon diversity index: ${analysis.summary.diversity.toFixed(3)}</p>`
  );
};

export const buildReportHtml = (
  title: string,
  analyses: ImageAnalysis[],
  options: Pick<AnalyzeOptions, 'k' | 'iterations' | 'stride' | 'minRegionSize'>
): string => {
  const sections = analyses
    .map(
      (analysis, index) =>
        `<section><h2>Image ${index + 1}</h2>${analysisToTable(analysis)}</section>`
    )
    .join('');
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:60rem;` +
    `margin:2rem auto;padding:0 1rem;color:#1a202c}h1{border-bottom:2px solid #e2e8f0;` +
    `padding-bottom:.5rem}table{border-collapse:collapse;width:100%;margin:1rem 0}` +
    `th,td{border:1px solid #e2e8f0;padding:.375rem .75rem;text-align:left}` +
    `th{background:#f7fafc}</style></head><body><h1>${title}</h1>` +
    `<p>${buildMethodsSnippet(options, analyses)}</p>${sections}</body></html>`
  );
};
