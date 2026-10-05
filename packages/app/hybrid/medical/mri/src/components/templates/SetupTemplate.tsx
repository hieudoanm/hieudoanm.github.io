'use client';

import Link from 'next/link';

import { Card } from '@/components/atoms/Card';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { RigourBadge, StatusBadge } from '@/components/molecules/StatusBadge';
import { checkSetup } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';

/** Setup: what is installed and what is missing before any run is launched. */
export const SetupTemplate = () => {
  const doctor = useResource(checkSetup, []);

  if (doctor.loading)
    return (
      <Screen>
        <p className="text-sm">Running environment checks…</p>
      </Screen>
    );
  if (doctor.error) return <SetupProblem message={doctor.error} />;
  const report = doctor.data;
  if (!report)
    return <SetupProblem message="No environment report available." />;

  return (
    <Screen>
      <PageHeader
        title="Setup"
        description="The environment the pipeline will run in. Checks run locally through the project's Python environment."
        actions={
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => doctor.refresh()}>
            Re-run checks
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Readiness">
          <div className="flex items-center gap-2">
            <RigourBadge status={report.ok ? 'pass' : 'fail'} />
            <span className="text-sm">
              {report.ok
                ? 'Environment looks usable'
                : 'Fix the items below before launching a run'}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-[minmax(9rem,auto)_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-base-content/60">Command</dt>
            <dd className="font-mono text-xs break-all">{report.command}</dd>
            <dt className="text-base-content/60">Python</dt>
            <dd className="font-mono text-xs">{report.pythonVersion ?? '—'}</dd>
            <dt className="text-base-content/60">Platform</dt>
            <dd className="font-mono text-xs">{report.platform ?? '—'}</dd>
            <dt className="text-base-content/60">Devices</dt>
            <dd className="font-mono text-xs">
              {report.availableDevices.join(', ') || '—'}
            </dd>
            <dt className="text-base-content/60">Data path</dt>
            <dd className="font-mono text-xs break-all">
              {report.dataPath ?? '—'}{' '}
              {report.dataPathExists ? '' : '(missing)'}
            </dd>
          </dl>
        </Card>
        <Card
          title="Pipeline commands"
          description="Read from the CLI itself. The workbench only offers a command the pipeline lists.">
          {report.availableCommands && report.availableCommands.length > 0 ? (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <RigourBadge status={report.canLaunch ? 'pass' : 'fail'} />
                <span className="text-sm">
                  {report.canLaunch
                    ? 'This build can launch a run.'
                    : 'This pipeline has no `run` command, so a run cannot be started from here yet.'}
                </span>
              </div>
              <p className="text-base-content/60 mt-2 font-mono text-xs">
                {report.availableCommands.join(', ')}
              </p>
            </div>
          ) : (
            <p className="text-base-content/70 mt-2 text-sm">
              The CLI did not list any command, so no run can be launched.
            </p>
          )}
        </Card>
        <Card
          title="Dependencies"
          description="Required packages first; optional ones enable extra models.">
          <DependencyList
            title="Required"
            entries={report.requiredDependencies}
          />
          <DependencyList
            title="Optional"
            entries={report.optionalDependencies}
          />
        </Card>
      </div>
    </Screen>
  );
};

const SetupProblem = ({ message }: { message: string }) => (
  <Screen>
    <PageHeader title="Setup" description="Environment checks could not run." />
    <Card>
      <p className="text-error text-sm">{message}</p>
      <p className="text-base-content/70 mt-2 text-sm">
        The workbench calls the pipeline's own environment checks. Make sure a
        project folder is selected and its Python environment exists.
      </p>
      <Link className="btn btn-sm btn-primary mt-3" href="/settings">
        Open settings
      </Link>
    </Card>
  </Screen>
);

const DependencyList = ({
  title,
  entries,
}: {
  title: string;
  entries: { name: string; installed: boolean }[];
}) => (
  <div className="mt-2">
    <p className="text-base-content/60 text-xs tracking-wide uppercase">
      {title}
    </p>
    <ul className="mt-1 space-y-1 text-sm">
      {entries.length === 0 && (
        <li className="text-base-content/70">none reported</li>
      )}
      {entries.map((entry) => (
        <li key={entry.name} className="flex items-center justify-between">
          <span className="font-mono text-xs">{entry.name}</span>
          <StatusBadge status={entry.installed ? 'completed' : 'failed'} />
        </li>
      ))}
    </ul>
  </div>
);
