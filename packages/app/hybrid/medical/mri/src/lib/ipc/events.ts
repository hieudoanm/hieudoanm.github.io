'use client';

import { useEffect } from 'react';

import type {
  LogPayload,
  PipelineEvent,
  RunStatusPayload,
} from '@/lib/contract/types';

export const EVENT_LOG = 'workbench://log';
export const EVENT_PIPELINE = 'workbench://pipeline-event';
export const EVENT_RUN_STATUS = 'workbench://run-status';

type Unlisten = () => void;

/**
 * Subscribes to a Rust event for the life of a component. Listener errors are
 * swallowed so a closed window cannot crash a screen.
 */
export const subscribe = async <TPayload>(
  event: string,
  handler: (payload: TPayload) => void
): Promise<Unlisten> => {
  const runtime = await import('@tauri-apps/api/event');
  return runtime.listen<TPayload>(event, ({ payload }) => {
    try {
      handler(payload);
    } catch {
      // A malformed event must never break the screen that received it.
    }
  });
};

export const useRunLog = (
  runId: string | undefined,
  onLine: (payload: LogPayload) => void
): void => {
  useEffect(() => {
    if (!runId) return;
    let unlisten: Unlisten | undefined;
    let cancelled = false;
    subscribe<LogPayload & { runId: string }>(EVENT_LOG, (payload) => {
      if (payload.runId === runId) onLine(payload);
    }).then((stop) => {
      if (cancelled) stop();
      else unlisten = stop;
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
    // `onLine` is expected to be stable; re-subscribing on every render would
    // drop live output.
  }, [runId]);
};

export const usePipelineEvents = (
  runId: string | undefined,
  onEvent: (event: PipelineEvent) => void
): void => {
  useEffect(() => {
    if (!runId) return;
    let unlisten: Unlisten | undefined;
    let cancelled = false;
    subscribe<{ runId: string; event: PipelineEvent }>(
      EVENT_PIPELINE,
      (payload) => {
        if (payload.runId === runId) onEvent(payload.event);
      }
    ).then((stop) => {
      if (cancelled) stop();
      else unlisten = stop;
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
  }, [runId]);
};

export const useRunStatus = (
  onStatus: (payload: RunStatusPayload) => void
): void => {
  useEffect(() => {
    let unlisten: Unlisten | undefined;
    let cancelled = false;
    subscribe<RunStatusPayload>(EVENT_RUN_STATUS, onStatus).then((stop) => {
      if (cancelled) stop();
      else unlisten = stop;
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
  }, [onStatus]);
};
