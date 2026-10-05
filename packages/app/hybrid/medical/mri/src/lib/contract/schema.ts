import { z } from 'zod';

import type { PipelineEvent, RunSummary } from './types';

/**
 * Schema-version gate. The pipeline writes `schema_version` into every
 * manifest; this build reads major version 0. Anything else is refused with a
 * readable message instead of being half-read (ROADMAP section 5).
 */
export const SUPPORTED_SCHEMA_MAJOR = 0;

export const majorVersion = (version: string): number | null => {
  const major = Number.parseInt(version.split('.')[0] ?? '', 10);
  return Number.isNaN(major) ? null : major;
};

export const isSupportedSchema = (
  version: string | null | undefined
): boolean =>
  version !== null &&
  version !== undefined &&
  majorVersion(version) === SUPPORTED_SCHEMA_MAJOR;

export const schemaGateMessage = (
  version: string | null | undefined
): string =>
  version
    ? `This build reads run schema version ${SUPPORTED_SCHEMA_MAJOR}.x, but the run declares ${version}. Re-run the pipeline with a matching version or update the app.`
    : `This run has no schema_version. It was not produced by a version of the pipeline this build understands.`;

export const runSummarySchema = z.object({
  runId: z.string().min(1),
  path: z.string(),
  status: z.enum([
    'running',
    'completed',
    'failed',
    'cancelled',
    'incomplete',
    'unsupported',
  ]),
  nMetrics: z.number().int().nonnegative(),
  problems: z.array(
    z.object({
      kind: z.string(),
      message: z.string(),
      blocking: z.boolean(),
    })
  ),
});

export type ValidatedRunSummary = z.infer<typeof runSummarySchema>;

export const pipelineEventSchema = z.object({ type: z.string() }).passthrough();

export const isPipelineEvent = (value: unknown): value is PipelineEvent =>
  pipelineEventSchema.safeParse(value).success;

/**
 * Run folders come from disk, so every list is validated before it reaches the
 * table. A malformed entry is dropped instead of crashing the screen.
 */
export const parseRunSummaries = (value: unknown): RunSummary[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    const result = runSummarySchema.safeParse(entry);
    return result.success ? [entry as RunSummary] : [];
  });
};

export const SUPPORTED_EVENT_TYPES = [
  'stage_start',
  'progress',
  'metric',
  'stage_end',
  'error',
] as const;

export type SupportedEventType = (typeof SUPPORTED_EVENT_TYPES)[number];

export const eventTypeLabel = (type: string): string => type.replace(/_/g, ' ');

export const eventStage = (event: PipelineEvent): string => {
  const stage = (event as { stage?: unknown }).stage;
  return typeof stage === 'string' ? stage : '—';
};

export const eventTime = (event: PipelineEvent): string => {
  const timestamp = (event as { timestamp?: unknown }).timestamp;
  return typeof timestamp === 'string' ? timestamp : '—';
};

export const isFailureEvent = (event: PipelineEvent): boolean => {
  if (event.type === 'error') return true;
  if (event.type === 'stage_end') {
    const status = (event as { status?: unknown }).status;
    return typeof status === 'string' && status !== 'ok';
  }
  return false;
};
