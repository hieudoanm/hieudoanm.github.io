import type { MetricDelta } from '@/lib/analysis/metrics-table';
import type { RunSummary } from '@/lib/contract/types';
import { formatNumber } from '@/lib/format/numbers';

const escapeLatex = (value: string): string =>
  value
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\^{}');

const cell = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '—';
  return escapeLatex(String(value));
};

/**
 * A paste-ready table for a paper draft. The workbench states what it measured;
 * it does not interpret the numbers.
 */
export const metricsToLatex = (
  deltas: MetricDelta[],
  caption: string
): string => {
  const header =
    '\\begin{tabular}{lrrr}\n\\toprule\nMetric & Run A & Run B & Difference \\\\\n\\midrule\n';
  const body = deltas
    .map(
      (delta) =>
        `${escapeLatex(delta.name)} & ${cell(delta.baseline?.display)} & ${cell(delta.candidate?.display)} & ${cell(
          delta.difference === null ? null : formatNumber(delta.difference)
        )} \\\\`
    )
    .join('\n');
  const footer = '\n\\bottomrule\n\\end{tabular}\n';
  return `${`% ${caption}\n`}${header}${body}${footer}`;
};

export const tableCaption = (
  baseline: RunSummary,
  candidate: RunSummary
): string =>
  `${candidate.name || candidate.runId} compared with ${baseline.name || baseline.runId}. Values come from each run's metrics.json; intervals are reported when the pipeline wrote them.`;
