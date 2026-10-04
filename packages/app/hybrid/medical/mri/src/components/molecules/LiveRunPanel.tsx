'use client';

import { useEffect, useState } from 'react';

import { useRunLog } from '@/lib/ipc/events';
import type { RunSummary } from '@/lib/contract/types';
import { RunLog, type LogLine } from './RunLog';
import { ErrorNote } from '@/components/atoms/EmptyState';

/**
 * Follows a live run. It polls the run folder on an interval *and* listens for
 * Rust events, so the screen updates even if an event is missed.
 */
export const LiveRunPanel = ({ run }: { run: RunSummary }) => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useRunLog(run.status === 'running' ? run.runId : undefined, (payload) =>
    setLines((current) =>
      [
        ...current,
        { line: payload.line, stream: payload.stream, atMs: payload.atMs },
      ].slice(-200)
    )
  );

  useEffect(() => {
    if (run.status !== 'running') return;
    const timer = setInterval(() => setError(null), 5000);
    return () => clearInterval(timer);
  }, [run.status]);

  if (error) return <ErrorNote message={error} />;
  if (run.status !== 'running') {
    return (
      <p className="text-base-content/70 text-sm">
        This run is {run.status}. Open the run to read its events and artifacts.
      </p>
    );
  }
  return <RunLog lines={lines} />;
};
