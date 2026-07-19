'use client';

import { StatusBadge } from '@/components/atoms/StatusBadge';
import { formatBytes, formatMs, prettyPrint } from '@/lib/format';
import { ResponseMeta } from '@/types/api-client';
import { type FC, useState } from 'react';

interface ResponsePanelProps {
  response: ResponseMeta | null;
  loading: boolean;
  error: string | null;
}

export const ResponsePanel: FC<ResponsePanelProps> = ({
  response,
  loading,
  error,
}) => {
  const [showHeaders, setShowHeaders] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-32 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="text-base-content/40 text-center">
        Send a request to see the response here.
      </div>
    );
  }

  const headerEntries = Object.entries(response.headers);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={response.status} />
        {response.statusText && (
          <span className="text-base-content/70 text-sm">
            {response.statusText}
          </span>
        )}
        <span className="text-base-content/50 text-sm">
          {formatMs(response.timeMs)}
        </span>
        <span className="text-base-content/50 text-sm">
          {formatBytes(response.sizeBytes)}
        </span>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setShowHeaders(false)}
            className={`btn btn-ghost btn-xs ${!showHeaders ? 'btn-active' : ''}`}>
            Body
          </button>
          <button
            type="button"
            onClick={() => setShowHeaders(true)}
            className={`btn btn-ghost btn-xs ${showHeaders ? 'btn-active' : ''}`}>
            Headers
          </button>
        </div>
      </div>

      {showHeaders ? (
        <div className="overflow-x-auto">
          <table className="table-zebra table-xs table">
            <thead>
              <tr>
                <th>Header</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {headerEntries.map(([key, value]) => (
                <tr key={key}>
                  <td className="font-mono">{key}</td>
                  <td className="font-mono break-all">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-sm break-all whitespace-pre-wrap">
          {prettyPrint(response.body)}
        </pre>
      )}
    </div>
  );
};

ResponsePanel.displayName = 'ResponsePanel';
