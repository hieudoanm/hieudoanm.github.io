import type { MetricsDocument, RunSummary } from '@/lib/contract/types';
import {
  compareMetrics,
  comparableRuns,
  detailLabel,
  foldMetrics,
  metricCells,
  runLabel,
} from '@/lib/analysis/metrics-table';

const metrics = (
  rows: Record<
    string,
    number | { value: number; ci_lower?: number; ci_upper?: number }
  >
): MetricsDocument => ({
  metrics: Object.entries(rows).map(([name, value]) =>
    typeof value === 'number'
      ? { name, value }
      : {
          name,
          value: value.value,
          ciLower: value.ci_lower ?? null,
          ciUpper: value.ci_upper ?? null,
        }
  ),
});

const run = (
  overrides: Partial<RunSummary> & { runId: string }
): RunSummary => ({
  path: `/project/runs/${overrides.runId}`,
  status: 'completed',
  nMetrics: 0,
  problems: [],
  ...overrides,
});

describe('metric comparison', () => {
  test('subtracts the baseline from the candidate', () => {
    const [delta] = compareMetrics(
      { runId: 'r_1', metrics: metrics({ auc: 0.7 }) },
      { runId: 'r_2', metrics: metrics({ auc: 0.8 }) }
    );
    expect(delta.difference).toBeCloseTo(0.1, 5);
    expect(delta.baseline?.display).toBe('0.700');
  });

  test('keeps metrics that exist on only one side', () => {
    const deltas = compareMetrics(
      { runId: 'r_1', metrics: metrics({ auc: 0.7, f1: 0.5 }) },
      { runId: 'r_2', metrics: metrics({ auc: 0.8 }) }
    );
    expect(deltas.map((delta) => delta.name)).toEqual(['auc', 'f1']);
    expect(deltas[1].candidate).toBeNull();
    expect(deltas[1].difference).toBeNull();
  });

  test('flags non-overlapping confidence intervals', () => {
    const [overlap] = compareMetrics(
      {
        runId: 'r_1',
        metrics: metrics({ auc: { value: 0.7, ci_lower: 0.6, ci_upper: 0.8 } }),
      },
      {
        runId: 'r_2',
        metrics: metrics({
          auc: { value: 0.75, ci_lower: 0.7, ci_upper: 0.9 },
        }),
      }
    );
    expect(overlap.intervalsOverlap).toBe(true);

    const [separate] = compareMetrics(
      {
        runId: 'r_1',
        metrics: metrics({ auc: { value: 0.7, ci_lower: 0.6, ci_upper: 0.8 } }),
      },
      {
        runId: 'r_2',
        metrics: metrics({
          auc: { value: 0.95, ci_lower: 0.9, ci_upper: 0.99 },
        }),
      }
    );
    expect(separate.intervalsOverlap).toBe(false);
  });

  test('treats a point estimate as an interval of zero width', () => {
    const [delta] = compareMetrics(
      { runId: 'r_1', metrics: metrics({ auc: 0.7 }) },
      { runId: 'r_2', metrics: metrics({ auc: 0.7 }) }
    );
    expect(delta.intervalsOverlap).toBe(true);
  });

  test('returns no deltas when a run has no metrics', () => {
    expect(
      compareMetrics(
        { runId: 'r_1', metrics: null },
        { runId: 'r_2', metrics: null }
      )
    ).toEqual([]);
  });

  test('exposes cells for charting', () => {
    const cells = metricCells('r_1', metrics({ auc: 0.8, f1: 0.6 }));
    expect(cells).toHaveLength(2);
    expect(cells[0]).toMatchObject({ runId: 'r_1', name: 'auc', value: 0.8 });
  });
});

describe('metric ordering', () => {
  test('sorts by name then fold', () => {
    const rows = [
      {
        name: 'auc',
        value: 0.8,
        ciLower: null,
        ciUpper: null,
        ciLevel: null,
        seed: null,
        fold: 2,
      },
      {
        name: 'auc',
        value: 0.7,
        ciLower: null,
        ciUpper: null,
        ciLevel: null,
        seed: null,
        fold: 1,
      },
      {
        name: 'accuracy',
        value: 0.6,
        ciLower: null,
        ciUpper: null,
        ciLevel: null,
        seed: null,
        fold: null,
      },
    ];
    expect(foldMetrics(rows).map((row) => `${row.name}#${row.fold}`)).toEqual([
      'accuracy#null',
      'auc#1',
      'auc#2',
    ]);
  });
});

describe('run selection', () => {
  test('only finished runs with metrics can be compared', () => {
    const runs = [
      run({ runId: 'r_1', nMetrics: 3 }),
      run({ runId: 'r_2', nMetrics: 0 }),
      run({ runId: 'r_3', status: 'running', nMetrics: 3 }),
    ];
    expect(comparableRuns(runs).map((entry) => entry.runId)).toEqual(['r_1']);
  });

  test('prefers a human name over a run id', () => {
    expect(runLabel(run({ runId: 'r_1', name: 'baseline' }))).toBe('baseline');
    expect(runLabel(run({ runId: 'r_1' }))).toBe('r_1');
    expect(detailLabel(null)).toBe('');
  });
});
