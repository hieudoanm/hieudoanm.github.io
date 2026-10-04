'use client';

import Link from 'next/link';

import { Card } from '@/components/atoms/Card';
import { ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { KeyValue } from '@/components/atoms/KeyValue';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { ArtifactList } from '@/components/molecules/ArtifactList';
import { EventTimeline } from '@/components/molecules/EventTimeline';
import { LiveRunPanel } from '@/components/molecules/LiveRunPanel';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { schemaGateMessage } from '@/lib/contract/schema';
import {
  formatBytes,
  formatDuration,
  formatNumber,
} from '@/lib/format/numbers';
import { formatTimestamp } from '@/lib/format/dates';
import { cancelRun, readRun } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';
import { useRunStatus } from '@/lib/ipc/events';

const backAction = (onBack?: () => void) =>
  onBack ? (
    <button type="button" className="btn btn-sm" onClick={onBack}>
      Back to runs
    </button>
  ) : (
    <Link className="btn btn-sm" href="/runs">
      Back to runs
    </Link>
  );

/** One run: manifest, config, events, metrics and artifacts. Nothing inferred. */
export const RunDetailTemplate = ({
  runId,
  onBack,
}: {
  runId: string;
  onBack?: () => void;
}) => {
  const detail = useResource(() => readRun(runId), [runId]);
  useRunStatus(() => detail.refresh());

  if (detail.loading)
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  if (detail.error) {
    return (
      <Screen>
        <PageHeader title={runId} description="This run could not be read.">
          <ErrorNote message={detail.error} action={backAction(onBack)} />
        </PageHeader>
      </Screen>
    );
  }
  const run = detail.data;
  if (!run)
    return (
      <Screen>
        <ErrorNote message="This run could not be read." />
      </Screen>
    );
  const { summary, manifest, config, events, metrics, artifacts } = run;

  return (
    <Screen>
      <PageHeader
        title={summary.name || summary.runId}
        description="Everything below comes from the run folder on disk."
        actions={
          <>
            {onBack && (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={onBack}>
                Back to runs
              </button>
            )}
            <Link
              className="btn btn-sm"
              href={`/compare?a=${encodeURIComponent(summary.runId)}`}>
              Compare
            </Link>
            {summary.status === 'running' && (
              <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={() => cancelRun(summary.runId)}>
                Cancel run
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => detail.refresh()}>
              Refresh
            </button>
          </>
        }>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <StatusBadge status={summary.status} />
          <span className="text-base-content/60 font-mono text-xs">
            {summary.runId}
          </span>
          {summary.schemaVersion && (
            <span className="text-base-content/60 text-xs">
              schema {summary.schemaVersion}
            </span>
          )}
        </div>
        {summary.problems.length > 0 && (
          <ul className="space-y-1 text-xs">
            {summary.problems.map((problem) => (
              <li
                key={problem.kind}
                className={problem.blocking ? 'text-error' : 'text-warning'}>
                {problem.blocking ? '✕' : '⚠'} {problem.message}
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      {summary.status === 'unsupported' && (
        <div className="mb-4">
          <ErrorNote message={schemaGateMessage(summary.schemaVersion)} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Run">
          <KeyValue
            items={[
              { label: 'Run id', value: summary.runId },
              { label: 'Folder', value: summary.path },
              {
                label: 'Dataset',
                value: config?.dataset ?? summary.dataset ?? '—',
              },
              {
                label: 'Model',
                value: config?.modelType ?? summary.modelType ?? '—',
              },
              {
                label: 'Image type',
                value: config?.imageType ?? summary.imageType ?? '—',
              },
              { label: 'Seed', value: config?.seed ?? summary.seed ?? '—' },
              {
                label: 'Device',
                value: summary.device ?? config?.device ?? '—',
              },
              {
                label: 'Commit',
                value: manifest?.gitCommit ?? summary.gitCommit ?? '—',
              },
              { label: 'Started', value: formatTimestamp(summary.startedAt) },
              { label: 'Ended', value: formatTimestamp(summary.endedAt) },
              {
                label: 'Duration',
                value: formatDuration(summary.durationSeconds),
              },
            ]}
          />
        </Card>
        <Card
          title="Provenance"
          description="Environment recorded by the pipeline.">
          <KeyValue
            items={[
              { label: 'Config hash', value: manifest?.configHash ?? '—' },
              { label: 'Data hash', value: manifest?.dataHash ?? '—' },
              { label: 'Python', value: manifest?.pythonVersion ?? '—' },
              ...Object.entries(manifest?.libraryVersions ?? {}).map(
                ([name, version]) => ({
                  label: name,
                  value: String(version),
                })
              ),
            ]}
          />
        </Card>
        <Card title="Live output">
          <LiveRunPanel run={summary} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card
          title="Metrics"
          description={`${summary.nMetrics} rows in metrics.json`}>
          {metrics && metrics.metrics.length > 0 ? (
            <table className="table-sm table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th className="text-right">Value</th>
                  <th className="text-right">95% CI</th>
                </tr>
              </thead>
              <tbody>
                {metrics.metrics.map((row) => (
                  <tr key={`${row.name}-${row.fold ?? 'all'}`}>
                    <td className="font-mono text-xs">{row.name}</td>
                    <td className="text-right tabular-nums">
                      {formatNumber(row.value)}
                    </td>
                    <td className="text-base-content/60 text-right text-xs">
                      {row.ciLower === null || row.ciUpper === null
                        ? '—'
                        : `${formatNumber(row.ciLower)} – ${formatNumber(row.ciUpper)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-base-content/70 text-sm">
              This run wrote no metrics.
            </p>
          )}
          {metrics?.calibration && (
            <p className="text-base-content/70 mt-3 text-xs">
              Calibration: Brier {formatNumber(metrics.calibration.brierScore)},
              ECE {formatNumber(metrics.calibration.ece)}
            </p>
          )}
        </Card>
        <Card title="Events" description="events.jsonl, in order.">
          <EventTimeline events={events} />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Artifacts" description="Files the run wrote, with sizes.">
          <ArtifactList artifacts={artifacts} />
          <p className="text-base-content/60 mt-3 text-xs">
            Total{' '}
            {formatBytes(
              artifacts.reduce((sum, artifact) => sum + artifact.sizeBytes, 0)
            )}
            . Binary files are listed but not opened in the browser.
          </p>
        </Card>
      </div>
    </Screen>
  );
};
