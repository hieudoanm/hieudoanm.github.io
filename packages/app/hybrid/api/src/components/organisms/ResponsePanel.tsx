'use client';

import { StatusBadge } from '@/components/atoms/StatusBadge';
import { copyText } from '@/lib/clipboard';
import { diffLines } from '@/lib/diff';
import { formatBytes, formatMs, prettyPrint, previewKind } from '@/lib/format';
import { ResponseMeta } from '@/types/api-client';
import { type FC, useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';

interface ResponsePanelProps {
  response: ResponseMeta | null;
  loading: boolean;
  error: string | null;
  compareWith?: ResponseMeta | null;
}

export const ResponsePanel: FC<ResponsePanelProps> = ({
  response,
  loading,
  error,
  compareWith,
}) => {
  const [showHeaders, setShowHeaders] = useState(false);
  const [diffMode, setDiffMode] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

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
  const kind = previewKind(response.headers);
  const hasCompare = Boolean(compareWith);

  const onCopy = (): void => {
    void copyText(response.body).then((ok) => {
      if (ok) setCopied(true);
    });
  };

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
            onClick={() => {
              setShowHeaders(false);
              setDiffMode(false);
            }}
            className={`btn btn-ghost btn-xs ${!showHeaders && !diffMode ? 'btn-active' : ''}`}>
            Body
          </button>
          <button
            type="button"
            onClick={() => {
              setShowHeaders(true);
              setDiffMode(false);
            }}
            className={`btn btn-ghost btn-xs ${showHeaders ? 'btn-active' : ''}`}>
            Headers
          </button>
          {hasCompare && (
            <button
              type="button"
              onClick={() => setDiffMode((prev) => !prev)}
              className={`btn btn-ghost btn-xs ${diffMode ? 'btn-active' : ''}`}>
              Diff
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="btn btn-ghost btn-xs gap-1">
            <FiCopy className="size-3" />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {diffMode && compareWith ? (
        <div className="bg-base-200 max-h-96 overflow-y-auto rounded-lg p-3 font-mono text-xs">
          {diffLines(compareWith.body, response.body).map((line, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap ${
                line.type === 'added'
                  ? 'text-success'
                  : line.type === 'removed'
                    ? 'text-error'
                    : 'text-base-content/70'
              }`}>
              <span className="mr-2 select-none">
                {line.type === 'added'
                  ? '+'
                  : line.type === 'removed'
                    ? '-'
                    : ' '}
              </span>
              {line.text}
            </div>
          ))}
        </div>
      ) : showHeaders ? (
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
      ) : kind === 'html' ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setPreviewHtml(false)}
              className={`btn btn-ghost btn-xs ${!previewHtml ? 'btn-active' : ''}`}>
              Raw
            </button>
            <button
              type="button"
              onClick={() => setPreviewHtml(true)}
              className={`btn btn-ghost btn-xs ${previewHtml ? 'btn-active' : ''}`}>
              Preview
            </button>
          </div>
          {previewHtml ? (
            <iframe
              title="Response preview"
              sandbox=""
              srcDoc={response.body}
              className="bg-base-200 h-96 w-full rounded-lg"
            />
          ) : (
            <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-sm break-all whitespace-pre-wrap">
              {response.body}
            </pre>
          )}
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
