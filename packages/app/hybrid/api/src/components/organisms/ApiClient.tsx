'use client';

import { HistoryList } from '@/components/organisms/HistoryList';
import { RequestComposer } from '@/components/molecules/RequestComposer';
import { RequestTabs } from '@/components/organisms/RequestTabs';
import { ResponsePanel } from '@/components/organisms/ResponsePanel';
import {
  addHistoryEntry,
  emptyRequest,
  executeRequest,
  loadHistory,
  saveHistory,
} from '@/lib/http';
import { HistoryEntry, RequestConfig, ResponseMeta } from '@/types/api-client';
import { type FC, useCallback, useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

const DRAFT_KEY = 'api-client:draft';

export const ApiClient: FC = () => {
  const [request, setRequest] = useState<RequestConfig>(emptyRequest);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [response, setResponse] = useState<ResponseMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw)
        setRequest({
          ...emptyRequest(),
          ...(JSON.parse(raw) as RequestConfig),
        });
    } catch {
      // corrupt draft — ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(request));
    } catch {
      // storage unavailable — ignore
    }
  }, [request]);

  const send = useCallback(async (): Promise<void> => {
    if (request.url.trim() === '') {
      setError('Please enter a URL');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await executeRequest(request);
      setResponse(result);
      setHistory((prev) => {
        const next = addHistoryEntry(prev, request);
        saveHistory(next);
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [request]);

  const selectEntry = (entry: HistoryEntry): void => {
    setRequest(entry.request);
    setActiveId(entry.id);
    setResponse(null);
    setError(null);
  };

  const clearHistory = (): void => {
    setHistory([]);
    saveHistory([]);
    setActiveId(null);
  };

  return (
    <div className="flex h-full flex-col gap-3 lg:flex-row">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setShowHistory((prev) => !prev)}
          className="btn btn-ghost btn-xs gap-1">
          <FiClock className="size-4" />
          <span>History</span>
          <span className="badge badge-neutral badge-sm">{history.length}</span>
        </button>
        {showHistory && (
          <HistoryList
            entries={history}
            activeId={activeId}
            onSelect={selectEntry}
            onClear={clearHistory}
          />
        )}
      </div>

      <aside className="hidden w-64 shrink-0 lg:block">
        <HistoryList
          entries={history}
          activeId={activeId}
          onSelect={selectEntry}
          onClear={clearHistory}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <RequestComposer
          request={request}
          loading={loading}
          onChange={setRequest}
          onSend={() => void send()}
        />
        <RequestTabs request={request} onChange={setRequest} />
        <ResponsePanel response={response} loading={loading} error={error} />
      </div>
    </div>
  );
};

ApiClient.displayName = 'ApiClient';
