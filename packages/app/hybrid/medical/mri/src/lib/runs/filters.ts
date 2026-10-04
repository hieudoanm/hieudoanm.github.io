import type { RunSummary } from '@/lib/contract/types';

export interface RunFilters {
  text: string;
  status: string;
  model: string;
}

export const emptyFilters: RunFilters = {
  text: '',
  status: 'all',
  model: 'all',
};

export const matchesText = (run: RunSummary, text: string): boolean => {
  const needle = text.trim().toLowerCase();
  if (!needle) return true;
  return [run.runId, run.name, run.dataset, run.modelType, run.gitCommit]
    .filter((value): value is string => typeof value === 'string')
    .some((value) => value.toLowerCase().includes(needle));
};

export const filterRuns = (
  runs: RunSummary[],
  filters: RunFilters
): RunSummary[] =>
  runs.filter((run) => {
    if (!matchesText(run, filters.text)) return false;
    if (filters.status !== 'all' && run.status !== filters.status) return false;
    if (filters.model !== 'all' && run.modelType !== filters.model)
      return false;
    return true;
  });

export const modelTypes = (runs: RunSummary[]): string[] =>
  [
    ...new Set(
      runs
        .map((run) => run.modelType)
        .filter((value): value is string => !!value)
    ),
  ].sort();

export const statuses = (runs: RunSummary[]): string[] =>
  [...new Set(runs.map((run) => run.status))].sort();

export const countByStatus = (runs: RunSummary[]): Record<string, number> =>
  runs.reduce<Record<string, number>>((counts, run) => {
    counts[run.status] = (counts[run.status] ?? 0) + 1;
    return counts;
  }, {});

/** Blocking problems win: a run that cannot be trusted is never "fine". */
export const blockingProblem = (run: RunSummary): string | null =>
  run.problems.find((problem) => problem.blocking)?.message ?? null;

export const isIncomplete = (run: RunSummary): boolean =>
  run.problems.some((problem) => problem.blocking) ||
  run.status === 'incomplete';
