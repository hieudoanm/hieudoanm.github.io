'use client';

import { useState } from 'react';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { Stat } from '@/components/atoms/Stat';
import { PageHeader, SettingsHint } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { DataTable } from '@/components/molecules/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { formatNumber } from '@/lib/format/numbers';
import {
  exclusionSummary,
  flaggedParticipantIds,
  outcomeBuckets,
  outcomeColumn,
} from '@/lib/dataset/cohort';
import { listParticipantAssets, readCohort } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';
import {
  useQueryState,
  parseJsonParam,
  serialiseJsonParam,
} from '@/lib/ui/use-query-state';

/** Datasets: the cohort table the pipeline will read, and its exclusions. */
export const DatasetsTemplate = () => {
  const cohort = useResource(readCohort, []);
  const [participant, setParticipant] = useQueryState<string | null>(
    'participant',
    null,
    (raw) => parseJsonParam<string>(raw),
    serialiseJsonParam
  );
  const assets = useResource(
    async () =>
      participant ? listParticipantAssets(participant) : Promise.resolve([]),
    [participant]
  );

  if (cohort.loading)
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  if (cohort.error)
    return (
      <Screen>
        <ErrorNote message={cohort.error} />
      </Screen>
    );
  const report = cohort.data;
  if (!report)
    return (
      <Screen>
        <ErrorNote message="No cohort table found." />
      </Screen>
    );

  const buckets = outcomeBuckets(report.rows, outcomeColumn(report));

  return (
    <Screen>
      <PageHeader
        title="Datasets"
        description="The participants table as written on disk. Select a participant to list the imaging files the project holds for them.">
        {!report.sourcePath && <SettingsHint />}
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Rows" value={report.rowCount} hint={report.sourcePath} />
        <Stat label="Participants" value={report.uniqueParticipants} />
        <Stat
          label="Usable"
          value={report.usableParticipants}
          tone="success"
          hint="outcome present"
        />
        <Stat
          label="Excluded"
          value={exclusionSummary(report)}
          tone="warning"
        />
      </div>
      {buckets.length > 0 && (
        <div className="mt-4">
          <Card
            title="Outcome distribution"
            description={`Grouped from ${outcomeColumn(report)}. Bands are a reading aid, not a validated cut-off.`}>
            <div className="flex h-40 items-end gap-3">
              {buckets.map((bucket) => (
                <div
                  key={bucket.label}
                  className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs tabular-nums">{bucket.count}</span>
                  <div
                    className="bg-primary w-full rounded-t"
                    style={{ height: `${Math.max(2, bucket.share * 120)}px` }}
                  />
                  <span className="text-base-content/60 text-xs">
                    {bucket.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card title="Participants">
          <DataTable
            rows={report.rows}
            rowKey={(row) =>
              `${row.participantId}-${row.session ?? ''}-${row.outcome ?? 'na'}`
            }
            onRowClick={(row) => setParticipant(row.participantId)}
            columns={[
              {
                id: 'id',
                header: 'Participant',
                cell: (row) => row.participantId,
                sortValue: (row) => row.participantId,
              },
              {
                id: 'session',
                header: 'Session',
                cell: (row) => row.session ?? '—',
              },
              {
                id: 'outcome',
                header: 'Outcome',
                cell: (row) =>
                  row.outcome === null ? (
                    <Badge tone="warning">missing</Badge>
                  ) : (
                    formatNumber(row.outcome, 0)
                  ),
                sortValue: (row) => row.outcome ?? Number.NEGATIVE_INFINITY,
              },
            ]}
          />
        </Card>
        <div className="space-y-4">
          <Card
            title={
              participant ? `Files for ${participant}` : 'Participant files'
            }>
            {!participant && (
              <p className="text-base-content/70 text-sm">
                Choose a participant in the table.
              </p>
            )}
            {participant && assets.loading && <Loading />}
            {assets.error && <ErrorNote message={assets.error} />}
            {participant &&
              (assets.data?.length ?? 0) === 0 &&
              !assets.loading && (
                <EmptyState title="No imaging files found for this participant." />
              )}
            <ul className="divide-base-200 divide-y text-sm">
              {(assets.data ?? []).map((asset) => (
                <li
                  key={asset.path}
                  className="flex items-center justify-between gap-3 py-2">
                  <span className="min-w-0 truncate font-mono text-xs">
                    {asset.name}
                  </span>
                  <Badge tone="info">{asset.role}</Badge>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Flags">
            {report.flags.length === 0 ? (
              <p className="text-base-content/70 text-sm">
                No exclusions were flagged.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {flaggedParticipantIds(report).map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      className="link"
                      onClick={() => setParticipant(id)}>
                      {id}
                    </button>
                    <ul className="text-base-content/70 ml-4 text-xs">
                      {report.flags
                        .filter((flag) => flag.participantId === id)
                        .map((flag) => (
                          <li key={`${id}-${flag.kind}`}>
                            {flag.kind}: {flag.message}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </Screen>
  );
};
