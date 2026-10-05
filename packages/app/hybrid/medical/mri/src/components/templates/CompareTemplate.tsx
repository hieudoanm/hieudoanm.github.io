'use client';

import Link from 'next/link';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import {
  compareMetrics,
  runLabel,
  type MetricDelta,
} from '@/lib/analysis/metrics-table';
import type { RunSummary } from '@/lib/contract/types';
import { formatNumber } from '@/lib/format/numbers';
import { listRuns, readRun } from '@/lib/ipc/api';
import { useQueryState } from '@/lib/ui/use-query-state';
import { useResource } from '@/lib/ui/use-resource';

/** Compare: exactly two runs, one metric table, shareable through the URL. */
export const CompareTemplate = () => {
  const runs = useResource(listRuns, []);
  const [selection, setSelection] = useSelection();
  const [baselineId, candidateId] = selection;

  const baseline = useResource(
    async () => (baselineId ? readRun(baselineId) : null),
    [baselineId]
  );
  const candidate = useResource(
    async () => (candidateId ? readRun(candidateId) : null),
    [candidateId]
  );

  const deltas: MetricDelta[] =
    baseline.data && candidate.data
      ? compareMetrics(
          {
            runId: baseline.data.summary.runId,
            metrics: baseline.data.metrics ?? null,
          },
          {
            runId: candidate.data.summary.runId,
            metrics: candidate.data.metrics ?? null,
          }
        )
      : [];

  return (
    <Screen>
      <PageHeader
        title="Compare"
        description="Two runs, side by side. Differences are arithmetic only; nothing here decides which run is better.">
        <div className="flex flex-wrap gap-3">
          <RunSelect
            label="Baseline"
            runs={runs.data ?? []}
            value={baselineId}
            onChange={(runId) => setSelection([runId, candidateId])}
          />
          <RunSelect
            label="Compared with"
            runs={runs.data ?? []}
            value={candidateId}
            onChange={(runId) => setSelection([baselineId, runId])}
          />
        </div>
      </PageHeader>
      {runs.error && <ErrorNote message={runs.error} />}
      {runs.loading && <Loading />}
      {runs.data && runs.data.length < 2 && (
        <EmptyState
          title="Two runs are needed before there is anything to compare"
          description="Only finished runs with metrics can be compared; the workbench will not fabricate numbers."
          action={
            <Link className="btn btn-sm btn-primary" href="/launch">
              Open launch
            </Link>
          }
        />
      )}
      {baselineId && candidateId && (
        <Card
          title="Metrics"
          description="A bold difference means the two confidence intervals do not overlap.">
          {(baseline.loading || candidate.loading) && (
            <Loading label="Reading both runs…" />
          )}
          {baseline.error && <ErrorNote message={baseline.error} />}
          {candidate.error && <ErrorNote message={candidate.error} />}
          {!baseline.loading && !candidate.loading && deltas.length === 0 && (
            <p className="text-base-content/70 text-sm">
              Neither run wrote metrics.
            </p>
          )}
          {deltas.length > 0 && (
            <DeltaTable
              deltas={deltas}
              baseline={baseline.data?.summary}
              candidate={candidate.data?.summary}
            />
          )}
        </Card>
      )}
    </Screen>
  );
};

const DeltaTable = ({
  deltas,
  baseline,
  candidate,
}: {
  deltas: MetricDelta[];
  baseline?: RunSummary;
  candidate?: RunSummary;
}) => (
  <table className="table-sm table">
    <thead>
      <tr>
        <th>Metric</th>
        <th className="text-right">{baseline ? runLabel(baseline) : 'A'}</th>
        <th className="text-right">{candidate ? runLabel(candidate) : 'B'}</th>
        <th className="text-right">Difference</th>
      </tr>
    </thead>
    <tbody>
      {deltas.map((delta) => (
        <tr key={delta.name}>
          <td className="font-mono text-xs">{delta.name}</td>
          <td className="text-right tabular-nums">
            {delta.baseline?.display ?? '—'}
          </td>
          <td className="text-right tabular-nums">
            {delta.candidate?.display ?? '—'}
          </td>
          <td
            className={`text-right tabular-nums ${delta.intervalsOverlap === false ? 'font-semibold' : ''}`}
            title={
              delta.intervalsOverlap === false
                ? 'Intervals do not overlap'
                : undefined
            }>
            {delta.difference === null ? '—' : formatNumber(delta.difference)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const useSelection = () =>
  useQueryState<[string, string]>(
    'a',
    ['', ''],
    (raw) => {
      const [first, second] = raw.split(',');
      return [first ?? '', second ?? ''];
    },
    (value) => value.join(',')
  );

const RunSelect = ({
  label,
  runs,
  value,
  onChange,
}: {
  label: string;
  runs: RunSummary[];
  value: string;
  onChange: (runId: string) => void;
}) => (
  <label className="form-control">
    <span className="label-text text-xs">{label}</span>
    <select
      className="select select-sm select-bordered w-64"
      value={value}
      onChange={(event) => onChange(event.target.value)}>
      <option value="">Choose a run</option>
      {runs.map((run) => (
        <option key={run.runId} value={run.runId}>
          {run.name || run.runId} · {run.status}
        </option>
      ))}
    </select>
  </label>
);
