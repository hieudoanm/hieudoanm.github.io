import type {
  MetricRow,
  MetricsDocument,
  RunDetail,
  RunSummary,
} from '@/lib/contract/types';
import { formatNumber } from '@/lib/format/numbers';

export interface MetricCell {
  runId: string;
  name: string;
  value: number | null;
  ciLower: number | null;
  ciUpper: number | null;
  display: string;
}

export interface MetricDelta {
  name: string;
  baseline: MetricCell | null;
  candidate: MetricCell | null;
  difference: number | null;
  /** Intervals that do not overlap are worth reading twice. */
  intervalsOverlap: boolean | null;
}

export const metricCells = (
  runId: string,
  document: MetricsDocument | null
): MetricCell[] =>
  (document?.metrics ?? []).map((row) => ({
    runId,
    name: row.name,
    value: row.value ?? null,
    ciLower: row.ciLower ?? null,
    ciUpper: row.ciUpper ?? null,
    display: formatNumber(row.value),
  }));

const cell = (
  cells: MetricCell[],
  name: string,
  value: number | null | undefined
): MetricCell | null => {
  const found = cells.find((entry) => entry.name === name);
  if (found) return found;
  if (value === null || value === undefined) return null;
  return {
    runId: '',
    name,
    value,
    ciLower: null,
    ciUpper: null,
    display: formatNumber(value),
  };
};

export const compareMetrics = (
  baseline: { runId: string; metrics: MetricsDocument | null },
  candidate: { runId: string; metrics: MetricsDocument | null }
): MetricDelta[] => {
  const baselineCells = metricCells(baseline.runId, baseline.metrics);
  const candidateCells = metricCells(candidate.runId, candidate.metrics);
  const names = [
    ...new Set([
      ...baselineCells.map((entry) => entry.name),
      ...candidateCells.map((e) => e.name),
    ]),
  ].sort();
  return names.map((name) => {
    const left = cell(baselineCells, name, undefined);
    const right = cell(candidateCells, name, undefined);
    const difference =
      left?.value !== null &&
      left?.value !== undefined &&
      right?.value !== null &&
      right?.value !== undefined
        ? right.value - left.value
        : null;
    return {
      name,
      baseline: left,
      candidate: right,
      difference,
      intervalsOverlap: overlaps(left, right),
    };
  });
};

const overlaps = (
  left: MetricCell | null,
  right: MetricCell | null
): boolean | null => {
  if (!left || !right) return null;
  const leftLow = left.ciLower ?? left.value;
  const leftHigh = left.ciUpper ?? left.value;
  const rightLow = right.ciLower ?? right.value;
  const rightHigh = right.ciUpper ?? right.value;
  if (
    [leftLow, leftHigh, rightLow, rightHigh].some(
      (value) => value === null || value === undefined
    )
  ) {
    return null;
  }
  return leftLow! <= rightHigh! && rightLow! <= leftHigh!;
};

export const foldMetrics = (metrics: MetricRow[]): MetricRow[] =>
  [...metrics].sort(
    (a, b) => a.name.localeCompare(b.name) || (a.fold ?? 0) - (b.fold ?? 0)
  );

/** Runs usable for a side-by-side comparison: at least one metric each. */
export const comparableRuns = (runs: RunSummary[]): RunSummary[] =>
  runs.filter((run) => run.status !== 'running' && run.nMetrics > 0);

export const runLabel = (run: RunSummary): string => run.name || run.runId;

export const detailLabel = (detail: RunDetail | null): string =>
  detail ? runLabel(detail.summary) : '';
