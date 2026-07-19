'use client';

import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ResponseDiffView } from '@/components/molecules/ResponseDiffView';
import { ResponseHeadersTable } from '@/components/molecules/ResponseHeadersTable';
import { ResponseHtmlView } from '@/components/molecules/ResponseHtmlView';
import { ResponseJsonView } from '@/components/molecules/ResponseJsonView';
import { copyText } from '@/lib/clipboard';
import { formatBytes, formatMs, previewKind, prettyPrint } from '@/lib/format';
import { ResponseMeta } from '@/types/api-client';
import { type FC, type ReactNode, useEffect, useState } from 'react';
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

  const kind = previewKind(response.headers);
  const hasCompare = Boolean(compareWith);

  const onCopy = (): void => {
    void copyText(response.body).then((ok) => {
      if (ok) setCopied(true);
    });
  };

  const renderBody = (): ReactNode => {
    if (diffMode && compareWith) {
      return (
        <ResponseDiffView previous={compareWith.body} current={response.body} />
      );
    }
    if (showHeaders) {
      return <ResponseHeadersTable headers={response.headers} />;
    }
    if (kind === 'html') {
      return <ResponseHtmlView body={response.body} />;
    }
    if (kind === 'json') {
      return <ResponseJsonView body={response.body} />;
    }
    return (
      <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-sm break-all whitespace-pre-wrap">
        {prettyPrint(response.body)}
      </pre>
    );
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
      {renderBody()}
    </div>
  );
};

ResponsePanel.displayName = 'ResponsePanel';
