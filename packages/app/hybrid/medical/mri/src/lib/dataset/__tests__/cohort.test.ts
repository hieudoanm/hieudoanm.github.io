import type { CohortReport } from '@/lib/contract/types';
import {
  exclusionSummary,
  flaggedParticipantIds,
  isUsable,
  missingOutcomeRows,
  outcomeBuckets,
  outcomeColumn,
} from '@/lib/dataset/cohort';

const report = (rows: CohortReport['rows']): CohortReport => ({
  sourcePath: 'data/participants.tsv',
  columns: ['participant_id', 'wab_aq'],
  rows,
  rowCount: rows.length,
  uniqueParticipants: new Set(rows.map((row) => row.participantId)).size,
  duplicateParticipants: 0,
  usableParticipants: rows.filter((row) => row.outcome !== null).length,
  excludedReasons: [{ reason: 'missing outcome', count: 1 }],
  outcomeColumn: 'wab_aq',
  outcomeDistribution: [],
  flags: rows
    .filter((row) => row.outcome === null)
    .map((row) => ({
      participantId: row.participantId,
      kind: 'missing_outcome',
      message: 'no outcome',
    })),
});

const row = (participantId: string, outcome: number | null) => ({
  participantId,
  session: '1',
  outcome,
  outcomeLabel: null,
  values: {
    participant_id: participantId,
    wab_aq: outcome === null ? '' : String(outcome),
  },
});

describe('cohort helpers', () => {
  test('defaults to the pipeline outcome column', () => {
    expect(outcomeColumn(report([row('sub-01', 60)]))).toBe('wab_aq');
    expect(outcomeColumn({ ...report([]), outcomeColumn: null })).toBe(
      'wab_aq'
    );
  });

  test('groups outcomes into readable bands', () => {
    const buckets = outcomeBuckets(
      [row('sub-01', 30), row('sub-02', 60), row('sub-03', 90)],
      'wab_aq'
    );
    expect(buckets.map((bucket) => bucket.label)).toEqual([
      '0–49',
      '50–69',
      '85–100',
    ]);
    expect(buckets[0].share).toBeCloseTo(1 / 3, 5);
  });

  test('returns no bands when no outcome is present', () => {
    expect(outcomeBuckets([row('sub-01', null)], 'wab_aq')).toEqual([]);
  });

  test('lists participants missing an outcome', () => {
    const cohort = report([row('sub-01', null), row('sub-02', 70)]);
    expect(
      missingOutcomeRows(cohort).map((entry) => entry.participantId)
    ).toEqual(['sub-01']);
    expect(flaggedParticipantIds(cohort)).toEqual(['sub-01']);
    expect(isUsable(cohort, 'sub-01')).toBe(false);
    expect(isUsable(cohort, 'sub-02')).toBe(true);
  });

  test('summarises exclusions for the header', () => {
    expect(exclusionSummary(report([row('sub-01', null)]))).toBe(
      '1 missing outcome'
    );
    expect(exclusionSummary({ ...report([]), excludedReasons: [] })).toBe(
      'none'
    );
  });
});
