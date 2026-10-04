import type { RunSummary } from '@/lib/contract/types';
import {
  blockingProblem,
  countByStatus,
  emptyFilters,
  filterRuns,
  isIncomplete,
  matchesText,
  modelTypes,
  statuses,
} from '@/lib/runs/filters';

const run = (
  overrides: Partial<RunSummary> & { runId: string }
): RunSummary => ({
  path: `/project/runs/${overrides.runId}`,
  status: 'completed',
  nMetrics: 0,
  problems: [],
  ...overrides,
});

const runs: RunSummary[] = [
  run({
    runId: 'r_1',
    name: 'baseline',
    modelType: 'logistic_regression',
    status: 'completed',
    nMetrics: 5,
  }),
  run({
    runId: 'r_2',
    name: 'candidate',
    modelType: 'resnet18',
    status: 'failed',
    nMetrics: 0,
    problems: [
      { kind: 'error', message: 'stage train failed', blocking: true },
    ],
  }),
  run({
    runId: 'r_3',
    modelType: 'resnet18',
    status: 'completed',
    nMetrics: 7,
    gitCommit: 'abc123',
  }),
];

describe('run filters', () => {
  test('matches on run id, name, model and commit', () => {
    expect(matchesText(runs[0], 'base')).toBe(true);
    expect(matchesText(runs[1], 'RESNET')).toBe(true);
    expect(matchesText(runs[2], 'abc123')).toBe(true);
    expect(matchesText(runs[0], 'nothing')).toBe(false);
    expect(matchesText(runs[0], '  ')).toBe(true);
  });

  test('filters by status and model', () => {
    expect(
      filterRuns(runs, { ...emptyFilters, status: 'failed' }).map(
        (entry) => entry.runId
      )
    ).toEqual(['r_2']);
    expect(
      filterRuns(runs, { ...emptyFilters, model: 'resnet18' }).map(
        (entry) => entry.runId
      )
    ).toEqual(['r_2', 'r_3']);
  });

  test('combines text and status filters', () => {
    const filtered = filterRuns(runs, {
      text: 'r_',
      status: 'completed',
      model: 'all',
    });
    expect(filtered.map((entry) => entry.runId)).toEqual(['r_1', 'r_3']);
  });

  test('collects the filter options from the data', () => {
    expect(modelTypes(runs)).toEqual(['logistic_regression', 'resnet18']);
    expect(statuses(runs)).toEqual(['completed', 'failed']);
    expect(countByStatus(runs)).toEqual({ completed: 2, failed: 1 });
  });

  test('surfaces blocking problems before status', () => {
    expect(blockingProblem(runs[1])).toBe('stage train failed');
    expect(blockingProblem(runs[0])).toBeNull();
    expect(isIncomplete(runs[1])).toBe(true);
    expect(isIncomplete(runs[0])).toBe(false);
  });
});
