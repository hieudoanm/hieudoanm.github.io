'use client';

import Link from 'next/link';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { Stat } from '@/components/atoms/Stat';
import { PageHeader, SettingsHint } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { DataTable } from '@/components/molecules/DataTable';
import { getOverview } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';
import { formatTimestamp } from '@/lib/format/dates';

/** Dashboard: is the project set up, what ran, and what needs attention. */
export const DashboardTemplate = () => {
  const overview = useResource(getOverview, []);

  if (overview.loading)
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  if (overview.error)
    return (
      <Screen>
        <ErrorNote message={overview.error} />
      </Screen>
    );
  const data = overview.data;
  if (!data)
    return (
      <Screen>
        <ErrorNote message="No overview available." />
      </Screen>
    );

  return (
    <Screen>
      <PageHeader
        title="Dashboard"
        description="State of the selected project folder and the runs it contains. Everything here is read from disk.">
        {!data.configured && <SettingsHint />}
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Runs" value={data.runCount} hint={`in ${data.runsDir}`} />
        <Stat label="Completed" value={data.completedCount} tone="success" />
        <Stat
          label="Running"
          value={data.runningCount}
          tone={data.runningCount ? 'info' : 'neutral'}
        />
        <Stat
          label="Unsupported"
          value={data.unsupportedCount}
          tone={data.unsupportedCount ? 'error' : 'neutral'}
          hint="schema this build cannot read"
        />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Latest run">
          {data.latestRun ? (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <StatusBadge status={data.latestRun.status} />
                <Link
                  className="link"
                  href={`/runs?run=${encodeURIComponent(data.latestRun.runId)}`}>
                  {data.latestRun.name || data.latestRun.runId}
                </Link>
              </div>
              <p className="text-base-content/70">
                {data.latestRun.modelType ?? 'unknown model'} ·{' '}
                {data.latestRun.nMetrics} metrics · started{' '}
                {formatTimestamp(data.latestRun.startedAt)}
              </p>
            </div>
          ) : (
            <EmptyState
              title="No runs yet"
              description="Launch a configuration to create the first run folder."
              action={
                <Link className="btn btn-sm btn-primary" href="/launch">
                  Open launch
                </Link>
              }
            />
          )}
        </Card>
        <Card
          title="Project"
          description="Where this workbench reads and writes.">
          <dl className="grid grid-cols-[minmax(8rem,auto)_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-base-content/60">Project</dt>
            <dd className="font-mono text-xs break-all">
              {data.projectRoot ?? 'not selected'}
            </dd>
            <dt className="text-base-content/60">Runs</dt>
            <dd className="font-mono text-xs break-all">{data.runsDir}</dd>
            <dt className="text-base-content/60">Python</dt>
            <dd className="font-mono text-xs break-all">{data.pythonEnv}</dd>
            <dt className="text-base-content/60">Cohort</dt>
            <dd className="text-xs">
              {data.cohortParticipants ?? '—'} participants
              {data.cohortExcluded ? ` · ${data.cohortExcluded} excluded` : ''}
            </dd>
          </dl>
        </Card>
      </div>
    </Screen>
  );
};

export const LatestRunTable = ({
  runs,
}: {
  runs: {
    runId: string;
    name: string | null;
    status: 'completed' | 'failed' | 'running';
    nMetrics: number;
  }[];
}) => (
  <DataTable
    rows={runs}
    rowKey={(run) => run.runId}
    columns={[
      {
        id: 'run',
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
        id: 'metrics',
        header: 'Metrics',
        cell: (run) => run.nMetrics,
        sortValue: (run) => run.nMetrics,
      },
    ]}
  />
);
