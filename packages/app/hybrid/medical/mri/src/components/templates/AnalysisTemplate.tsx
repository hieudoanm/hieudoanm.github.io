'use client';

import Link from 'next/link';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import {
  compareMetrics,
  metricCells,
  runLabel,
  type MetricDelta,
} from '@/lib/analysis/metrics-table';
import { barChartSvg } from '@/lib/export/chart';
import { downloadCsv, downloadText, fileStamp, toCsv } from '@/lib/export/csv';
import { metricsToLatex, tableCaption } from '@/lib/export/latex';
import { listRuns, readRun } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';
import { useState } from 'react';
import type { RunDetail } from '@/lib/contract/types';

/**
 * Analysis: metrics across every finished run, with the exports a paper needs.
 * The screen reports; it does not interpret significance or recommend a model.
 */
export const AnalysisTemplate = () => {
  const runs = useResource(listRuns, []);
  const [runIds, setRunIds] = useState<string[]>([]);
  const details = useResource(() => loadDetails(runIds), [runIds.join(',')]);

  const deltas: MetricDelta[] =
    details.data && details.data.length >= 2
      ? compareMetrics(
          {
            runId: details.data[0].summary.runId,
            metrics: details.data[0].metrics ?? null,
          },
          {
            runId: details.data[1].summary.runId,
            metrics: details.data[1].metrics ?? null,
          }
        )
      : [];

  return (
    <Screen>
      <PageHeader
        title="Analysis"
        description="Metrics from finished runs, side by side, with CSV, SVG and LaTeX exports. No number here is interpreted for you."
        actions={
          <>
            <button
              type="button"
              className="btn btn-sm"
              disabled={deltas.length === 0}
              onClick={() => exportCsv(deltas)}>
              Export CSV
            </button>
            <button
              type="button"
              className="btn btn-sm"
              disabled={deltas.length === 0}
              onClick={() => exportSvg(deltas)}>
              Export SVG
            </button>
            <button
              type="button"
              className="btn btn-sm"
              disabled={deltas.length === 0}
              onClick={() => exportLatex(deltas, details.data ?? [])}>
              Export LaTeX
            </button>
          </>
        }>
        <div className="flex flex-wrap gap-2">
          {(runs.data ?? [])
            .filter((run) => run.nMetrics > 0)
            .map((run) => (
              <label
                key={run.runId}
                className="label cursor-pointer gap-2 text-xs">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={runIds.includes(run.runId)}
                  onChange={(event) =>
                    setRunIds((current) =>
                      event.target.checked
                        ? [...current, run.runId].slice(-2)
                        : current.filter((id) => id !== run.runId)
                    )
                  }
                />
                {runLabel(run)}
              </label>
            ))}
        </div>
      </PageHeader>
      {runs.error && <ErrorNote message={runs.error} />}
      {runs.loading && <Loading />}
      {details.loading && <Loading label="Reading selected runs…" />}
      {details.error && <ErrorNote message={details.error} />}
      {!runs.loading &&
        (runs.data ?? []).filter((run) => run.nMetrics > 0).length === 0 && (
          <EmptyState
            title="No finished run has metrics yet"
            description="Metrics appear once the pipeline writes metrics.json for a run."
            action={
              <Link className="btn btn-sm btn-primary" href="/launch">
                Open launch
              </Link>
            }
          />
        )}
      {deltas.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Metrics">
            <table className="table-sm table">
              <thead>
                <tr>
                  <th>Metric</th>
                  {details.data?.map((detail) => (
                    <th key={detail.summary.runId} className="text-right">
                      {runLabel(detail.summary)}
                    </th>
                  ))}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title="Chart" description="Same values, drawn as bars.">
            <div
              className="overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: barChartSvg([
                  {
                    name: details.data?.[0]
                      ? runLabel(details.data[0].summary)
                      : 'A',
                    points: chartPoints(details.data?.[0]),
                  },
                  {
                    name: details.data?.[1]
                      ? runLabel(details.data[1].summary)
                      : 'B',
                    points: chartPoints(details.data?.[1]),
                  },
                ]),
              }}
            />
          </Card>
        </div>
      )}
    </Screen>
  );
};

const loadDetails = async (runIds: string[]): Promise<RunDetail[]> => {
  const details = await Promise.all(
    runIds.slice(0, 2).map((runId) => readRun(runId))
  );
  return details;
};

const chartPoints = (detail: RunDetail | undefined) =>
  metricCells(detail?.summary.runId ?? '', detail?.metrics ?? null)
    .filter((cell) => cell.value !== null)
    .map((cell) => ({ name: cell.name, value: cell.value as number }));

const exportCsv = (deltas: MetricDelta[]) =>
  downloadCsv(
    `metrics-${fileStamp()}.csv`,
    toCsv(deltas, [
      { header: 'metric', value: (delta) => delta.name },
      { header: 'baseline', value: (delta) => delta.baseline?.value ?? null },
      { header: 'candidate', value: (delta) => delta.candidate?.value ?? null },
      { header: 'difference', value: (delta) => delta.difference },
      {
        header: 'intervals_overlap',
        value: (delta) => String(delta.intervalsOverlap ?? ''),
      },
    ])
  );

const exportSvg = (deltas: MetricDelta[]) =>
  downloadText(
    `metrics-${fileStamp()}.svg`,
    barChartSvg([
      {
        name: deltas[0]?.baseline?.runId ?? 'baseline',
        points: deltas
          .filter(
            (delta) =>
              delta.baseline?.value !== null &&
              delta.baseline?.value !== undefined
          )
          .map((delta) => ({
            name: delta.name,
            value: delta.baseline!.value as number,
          })),
      },
      {
        name: deltas[0]?.candidate?.runId ?? 'candidate',
        points: deltas
          .filter(
            (delta) =>
              delta.candidate?.value !== null &&
              delta.candidate?.value !== undefined
          )
          .map((delta) => ({
            name: delta.name,
            value: delta.candidate!.value as number,
          })),
      },
    ]),
    'image/svg+xml'
  );

const exportLatex = (deltas: MetricDelta[], details: RunDetail[]) =>
  downloadText(
    `metrics-${fileStamp()}.tex`,
    metricsToLatex(
      deltas,
      details.length === 2
        ? tableCaption(details[0].summary, details[1].summary)
        : 'Metrics read from run folders.'
    )
  );
