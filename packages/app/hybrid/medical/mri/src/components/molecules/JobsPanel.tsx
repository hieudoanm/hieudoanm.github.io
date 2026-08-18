'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import { FiRefreshCw, FiXCircle } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type { JobRecord, JobStatus } from '@/lib/api/types';

export interface JobsPanelProps {
  api: MriApi;
}

const badgeVariants: Record<
  JobStatus,
  'info' | 'success' | 'warning' | 'error' | 'neutral'
> = {
  queued: 'neutral',
  running: 'info',
  completed: 'success',
  failed: 'error',
  cancelled: 'warning',
};

const parseLogs = (record: JobRecord): string[] => {
  try {
    const logs: unknown = JSON.parse(record.logsJson);
    if (!Array.isArray(logs)) return [];
    return logs.map((entry) =>
      String((entry as { message?: unknown }).message ?? '')
    );
  } catch {
    return [];
  }
};

const parseOutputs = (record: JobRecord): string[] => {
  try {
    const outputs: unknown = JSON.parse(record.outputsJson);
    return Array.isArray(outputs) ? outputs.map(String) : [];
  } catch {
    return [];
  }
};

/** Live view of the background job queue; polls while anything is active. */
export const JobsPanel: FC<JobsPanelProps> = ({ api }) => {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setJobs(await api.listJobs());
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }, [api]);

  useEffect(() => {
    void load();
    const interval = setInterval(() => {
      void load();
    }, 1500);
    return () => clearInterval(interval);
  }, [load]);

  const active = jobs.some(
    (job) => job.status === 'queued' || job.status === 'running'
  );

  const cancel = async (jobId: string) => {
    try {
      await api.cancelJob(jobId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const retry = async (jobId: string) => {
    try {
      await api.retryJob(jobId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  return (
    <section className="flex flex-col gap-2" data-testid="jobs-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <Button variant="ghost" size="sm" onClick={() => void load()}>
          <FiRefreshCw /> Refresh
        </Button>
      </div>
      {error ? (
        <p className="text-error text-sm" role="alert">
          {error}
        </p>
      ) : null}
      {jobs.length === 0 ? (
        <p className="text-base-content/60 text-sm">No jobs yet.</p>
      ) : (
        jobs.map((job) => {
          const logs = parseLogs(job);
          const outputs = parseOutputs(job);
          const isOpen = expanded === job.id;
          return (
            <div
              key={job.id}
              className="card bg-base-200"
              data-testid="job-row">
              <div className="card-body flex-row items-center justify-between gap-4 py-3">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 flex-col items-start text-left"
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                  data-testid={`job-toggle-${job.id}`}>
                  <span className="flex items-center gap-2">
                    <Badge variant={badgeVariants[job.status]}>
                      {job.status}
                    </Badge>
                    <span className="font-mono text-xs">{job.kind}</span>
                    {job.attempts > 0 ? (
                      <span className="text-base-content/60 text-xs">
                        attempt {job.attempts + 1}
                      </span>
                    ) : null}
                  </span>
                  {job.status === 'running' ? (
                    <progress
                      className="progress progress-primary mt-1 w-full"
                      value={Math.round(job.progress * 100)}
                      max={100}
                    />
                  ) : null}
                  {job.error ? (
                    <span className="text-error truncate text-xs">
                      {job.error}
                    </span>
                  ) : null}
                </button>
                <span className="flex shrink-0 items-center gap-1">
                  {job.status === 'queued' || job.status === 'running' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void cancel(job.id)}
                      data-testid={`job-cancel-${job.id}`}>
                      <FiXCircle />
                    </Button>
                  ) : null}
                  {job.status === 'failed' || job.status === 'cancelled' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void retry(job.id)}
                      data-testid={`job-retry-${job.id}`}>
                      <FiRefreshCw />
                    </Button>
                  ) : null}
                </span>
              </div>
              {isOpen ? (
                <div
                  className="px-6 pb-4 font-mono text-xs"
                  data-testid={`job-detail-${job.id}`}>
                  {outputs.length > 0 ? (
                    <ul className="text-success mb-2">
                      {outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  ) : null}
                  {logs.length === 0 ? (
                    <p className="text-base-content/60">No log output.</p>
                  ) : (
                    <ul>
                      {logs.map((message, index) => (
                        <li key={`${job.id}-${index}`}>{message}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          );
        })
      )}
      {active ? (
        <p className="text-base-content/60 text-xs" data-testid="jobs-live">
          Live updating…
        </p>
      ) : null}
    </section>
  );
};
