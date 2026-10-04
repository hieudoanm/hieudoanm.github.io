'use client';

import { useMemo, useState } from 'react';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { DataTable } from '@/components/molecules/DataTable';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { formatDuration } from '@/lib/format/numbers';
import { formatTimestamp } from '@/lib/format/dates';
import { listRuns } from '@/lib/ipc/api';
import {
  emptyFilters,
  filterRuns,
  modelTypes,
  statuses,
  type RunFilters,
} from '@/lib/runs/filters';
import { RunDetailTemplate } from '@/components/templates/RunDetailTemplate';
import {
  useQueryState,
  parseJsonParam,
  serialiseJsonParam,
} from '@/lib/ui/use-query-state';
import { useResource } from '@/lib/ui/use-resource';

/** Runs: every folder in the project's runs directory, filterable and linkable. */
export const RunsTemplate = () => {
  const runs = useResource(listRuns, []);
  const [selected, setSelected] = useQueryState<string>(
    'run',
    '',
    (raw) => raw,
    (value) => value
  );
  const [filters, setFilters] = useQueryState<RunFilters>(
    'filters',
    emptyFilters,
    (raw) => ({
      ...emptyFilters,
      ...(parseJsonParam<Partial<RunFilters>>(raw) ?? {}),
    }),
    serialiseJsonParam
  );
  const visible = useMemo(
    () => filterRuns(runs.data ?? [], filters),
    [runs.data, filters]
  );

  if (selected)
    return (
      <RunDetailTemplate runId={selected} onBack={() => setSelected('')} />
    );

  return (
    <Screen>
      <PageHeader
        title="Runs"
        description="Run folders as the pipeline wrote them. A run that this build cannot read stays listed, flagged, instead of disappearing.">
        <FilterBar
          filters={filters}
          models={modelTypes(runs.data ?? [])}
          statuses={statuses(runs.data ?? [])}
          onChange={setFilters}
          onReset={() => setFilters(emptyFilters)}
        />
      </PageHeader>
      {runs.loading && <Loading />}
      {runs.error && <ErrorNote message={runs.error} />}
      {!runs.loading && !runs.error && (
        <Card
          title={`${visible.length} of ${runs.data?.length ?? 0} runs`}
          description="Filters live in the URL, so this exact view can be shared.">
          {visible.length === 0 ? (
            <EmptyState title="No run matches these filters." />
          ) : (
            <DataTable
              rows={visible}
              rowKey={(run) => run.runId}
              onRowClick={(run) => setSelected(run.runId)}
              columns={[
                {
                  id: 'name',
                  header: 'Run',
                  cell: (run) => run.name || run.runId,
                  sortValue: (run) => run.runId,
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: (run) => <StatusBadge status={run.status} />,
                },
                {
                  id: 'model',
                  header: 'Model',
                  cell: (run) => run.modelType ?? '—',
                  sortValue: (run) => run.modelType ?? '',
                },
                {
                  id: 'dataset',
                  header: 'Dataset',
                  cell: (run) => run.dataset ?? '—',
                },
                {
                  id: 'metrics',
                  header: 'Metrics',
                  cell: (run) => run.nMetrics,
                  sortValue: (run) => run.nMetrics,
                  align: 'right',
                },
                {
                  id: 'started',
                  header: 'Started',
                  cell: (run) => formatTimestamp(run.startedAt),
                  sortValue: (run) => run.startedAt ?? '',
                },
                {
                  id: 'duration',
                  header: 'Duration',
                  cell: (run) => formatDuration(run.durationSeconds),
                  sortValue: (run) => run.durationSeconds ?? 0,
                },
              ]}
            />
          )}
        </Card>
      )}
    </Screen>
  );
};

const FilterBar = ({
  filters,
  models,
  statuses,
  onChange,
  onReset,
}: {
  filters: RunFilters;
  models: string[];
  statuses: string[];
  onChange: (filters: RunFilters) => void;
  onReset: () => void;
}) => (
  <div className="flex flex-wrap items-end gap-3">
    <label className="form-control">
      <span className="label-text text-xs">Search</span>
      <input
        className="input input-sm input-bordered w-56"
        placeholder="run id, model, commit"
        value={filters.text}
        onChange={(event) => onChange({ ...filters, text: event.target.value })}
      />
    </label>
    <label className="form-control">
      <span className="label-text text-xs">Status</span>
      <select
        className="select select-sm select-bordered"
        value={filters.status}
        onChange={(event) =>
          onChange({ ...filters, status: event.target.value })
        }>
        <option value="all">all</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>
    <label className="form-control">
      <span className="label-text text-xs">Model</span>
      <select
        className="select select-sm select-bordered"
        value={filters.model}
        onChange={(event) =>
          onChange({ ...filters, model: event.target.value })
        }>
        <option value="all">all</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </label>
    <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>
      Reset
    </button>
  </div>
);
