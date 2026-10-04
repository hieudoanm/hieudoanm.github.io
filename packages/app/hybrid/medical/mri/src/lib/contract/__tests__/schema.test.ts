import {
  isSupportedSchema,
  majorVersion,
  parseRunSummaries,
  schemaGateMessage,
  eventStage,
  eventTime,
  eventTypeLabel,
  isFailureEvent,
  isPipelineEvent,
  SUPPORTED_SCHEMA_MAJOR,
} from '@/lib/contract/schema';

describe('schema gate', () => {
  test('accepts major version 0 only', () => {
    expect(isSupportedSchema('0.1.0')).toBe(true);
    expect(isSupportedSchema('0.9.9')).toBe(true);
    expect(isSupportedSchema('1.0.0')).toBe(false);
    expect(isSupportedSchema('2.0.0')).toBe(false);
    expect(isSupportedSchema(null)).toBe(false);
    expect(isSupportedSchema(undefined)).toBe(false);
    expect(SUPPORTED_SCHEMA_MAJOR).toBe(0);
  });

  test('reads the major from a version string', () => {
    expect(majorVersion('0.1.0')).toBe(0);
    expect(majorVersion('3')).toBe(3);
    expect(majorVersion('not-a-version')).toBeNull();
  });

  test('explains why a version is refused', () => {
    expect(schemaGateMessage('2.0.0')).toContain('2.0.0');
    expect(schemaGateMessage('2.0.0')).toContain('0.x');
    expect(schemaGateMessage(null)).toContain('no schema_version');
  });
});

describe('run list validation', () => {
  const valid = {
    runId: 'r_20261005_120000_1',
    path: '/project/runs/r_20261005_120000_1',
    status: 'completed',
    nMetrics: 3,
    problems: [],
  };

  test('keeps well-formed entries', () => {
    expect(parseRunSummaries([valid])).toHaveLength(1);
  });

  test('drops malformed entries instead of crashing the table', () => {
    const rows = parseRunSummaries([
      valid,
      { runId: 'r_broken' },
      null,
      'nope',
    ]);
    expect(rows).toHaveLength(1);
  });

  test('returns an empty list for non-array input', () => {
    expect(parseRunSummaries({})).toEqual([]);
  });
});

describe('event helpers', () => {
  test('recognises pipeline events by type', () => {
    expect(isPipelineEvent({ type: 'stage_start', stage: 'train' })).toBe(true);
    expect(isPipelineEvent({ stage: 'train' })).toBe(false);
  });

  test('labels event types for display', () => {
    expect(eventTypeLabel('stage_start')).toBe('stage start');
  });

  test('reads stage and time defensively', () => {
    expect(eventStage({ type: 'progress', stage: 'train' })).toBe('train');
    expect(eventStage({ type: 'progress' })).toBe('—');
    expect(
      eventTime({ type: 'progress', timestamp: '2026-10-05T10:00:00' })
    ).toBe('2026-10-05T10:00:00');
    expect(eventTime({ type: 'progress' })).toBe('—');
  });

  test('treats error events and non-ok stage ends as failures', () => {
    expect(
      isFailureEvent({ type: 'error', stage: 'train', error: 'boom' })
    ).toBe(true);
    expect(
      isFailureEvent({ type: 'stage_end', stage: 'train', status: 'error' })
    ).toBe(true);
    expect(
      isFailureEvent({ type: 'stage_end', stage: 'train', status: 'ok' })
    ).toBe(false);
    expect(isFailureEvent({ type: 'metric', name: 'auc', value: 0.8 })).toBe(
      false
    );
  });
});
