'use client';

import { useState, type FC } from 'react';
import { FiShield } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type { QcReport, QcStatus } from '@/lib/api/types';

export interface QcPanelProps {
  api: MriApi;
  seriesId: string;
}

const statusStyles: Record<QcStatus, string> = {
  pass: 'text-success',
  warn: 'text-warning',
  fail: 'text-error',
  skipped: 'text-base-content/50',
};

const statusIcons: Record<QcStatus, string> = {
  pass: '✓',
  warn: '⚠',
  fail: '✕',
  skipped: '–',
};

/** On-demand machine-readable QC for one series. */
export const QcPanel: FC<QcPanelProps> = ({ api, seriesId }) => {
  const [report, setReport] = useState<QcReport | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    setRunning(true);
    setError(null);
    api
      .runQc(seriesId)
      .then(setReport)
      .catch((cause: unknown) =>
        setError(cause instanceof Error ? cause.message : String(cause))
      )
      .finally(() => setRunning(false));
  };

  return (
    <div className="flex flex-col gap-2" data-testid="qc-panel">
      <Button variant="outline" size="sm" onClick={run} disabled={running}>
        <FiShield className="mr-1" /> {running ? 'Running QC…' : 'Run QC'}
      </Button>
      {error ? (
        <p className="text-error text-sm" role="alert">
          {error}
        </p>
      ) : null}
      {report ? (
        <ul className="flex flex-col gap-1 text-sm" data-testid="qc-report">
          {report.checks.map((check) => (
            <li key={check.id} className="flex items-center gap-2">
              <span className={statusStyles[check.status]}>
                {statusIcons[check.status]}
              </span>
              <span className="font-mono">{check.id}</span>
              <span className="text-base-content/60">{check.detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
