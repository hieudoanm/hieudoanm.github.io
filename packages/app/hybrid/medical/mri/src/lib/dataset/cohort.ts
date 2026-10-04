import type { CohortReport, CohortRow } from '@/lib/contract/types';

export interface OutcomeBucket {
  label: string;
  count: number;
  share: number;
}

/**
 * Outcome values come from `participants.tsv`. The column is numeric WAB-AQ by
 * default, so the workbench groups participants into clinically familiar bands
 * without claiming a threshold is validated.
 */
export const outcomeBuckets = (
  rows: CohortRow[],
  outcomeColumn = 'wab_aq'
): OutcomeBucket[] => {
  const values = rows
    .map((row) => row.values[outcomeColumn])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  if (values.length === 0) return [];
  const bands: { label: string; min: number; max: number }[] = [
    { label: '0–49', min: 0, max: 50 },
    { label: '50–69', min: 50, max: 70 },
    { label: '70–84', min: 70, max: 85 },
    { label: '85–100', min: 85, max: 101 },
  ];
  return bands
    .map((band) => {
      const count = values.filter(
        (value) => value > band.min && value <= band.max
      ).length;
      return {
        label: band.label,
        count,
        share: values.length === 0 ? 0 : count / values.length,
      };
    })
    .filter((bucket) => bucket.count > 0);
};

export const outcomeColumn = (report: CohortReport): string =>
  report.outcomeColumn ?? 'wab_aq';

export const missingOutcomeRows = (report: CohortReport): CohortRow[] =>
  report.rows.filter(
    (row) => row.outcome === null || row.outcome === undefined
  );

export const flaggedParticipantIds = (report: CohortReport): string[] => [
  ...new Set(report.flags.map((flag) => flag.participantId)),
];

export const isUsable = (
  report: CohortReport,
  participantId: string
): boolean =>
  !report.flags.some((flag) => flag.participantId === participantId);

export const exclusionSummary = (report: CohortReport): string =>
  report.excludedReasons
    .filter((reason) => reason.count > 0)
    .map((reason) => `${reason.count} ${reason.reason}`)
    .join(', ') || 'none';
