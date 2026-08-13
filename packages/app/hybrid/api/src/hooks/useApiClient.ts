'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  addHistoryEntry,
  emptyRequest,
  executeRequest,
  initTabs,
  loadHistory,
  newTab,
  saveDraft,
  saveHistory,
  saveTabs,
} from '@/lib/http';
import { loadCollections, saveCollections } from '@/lib/collections';
import { loadEnvironment, saveEnvironment } from '@/lib/variables';
import {
  EnvironmentVariable,
  HistoryEntry,
  RequestCollection,
  RequestConfig,
  RequestTab,
  ResponseMeta,
} from '@/types/api-client';

export interface UseApiClient {
  tabs: RequestTab[];
  activeId: string;
  request: RequestConfig;
  history: HistoryEntry[];
  collections: RequestCollection[];
  env: EnvironmentVariable[];
  response: ResponseMeta | null;
  prevResponse: ResponseMeta | null;
  loading: boolean;
  error: string | null;
  sidebarTab: 'history' | 'collections';
  showSidebar: boolean;
  activeEntryId: string | null;
  onRequestChange: (next: RequestConfig) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onActivateTab: (id: string) => void;
  onSend: () => void;
  onSelectHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  onEnvChange: (next: EnvironmentVariable[]) => void;
  onCollectionsChange: (next: RequestCollection[]) => void;
  onLoadCollectionEntry: (request: RequestConfig, entryId: string) => void;
  onSidebarTab: (tab: 'history' | 'collections') => void;
  onToggleSidebar: () => void;
}

export const useApiClient = (): UseApiClient => {
  const initialTabsRef = useRef<RequestTab[] | null>(null);
  if (initialTabsRef.current === null) {
    initialTabsRef.current = initTabs();
  }
  const [tabs, setTabs] = useState<RequestTab[]>(initialTabsRef.current);
  const [activeId, setActiveId] = useState<string>(
    () => initialTabsRef.current?.[0]?.id ?? ''
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [collections, setCollections] =
    useState<RequestCollection[]>(loadCollections);
  const [env, setEnv] = useState<EnvironmentVariable[]>(loadEnvironment);
  const [response, setResponse] = useState<ResponseMeta | null>(null);
  const [prevResponse, setPrevResponse] = useState<ResponseMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'history' | 'collections'>(
    'history'
  );
  const [showSidebar, setShowSidebar] = useState(false);

  const request =
    tabs.find((tab) => tab.id === activeId)?.request ?? emptyRequest();

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    saveTabs(tabs);
  }, [tabs]);

  useEffect(() => {
    saveDraft(request);
  }, [request]);

  useEffect(() => {
    saveCollections(collections);
  }, [collections]);

  useEffect(() => {
    saveEnvironment(env);
  }, [env]);

  const responseRef = useRef<ResponseMeta | null>(null);
  useEffect(() => {
    responseRef.current = response;
  }, [response]);

  const onRequestChange = useCallback(
    (next: RequestConfig): void => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeId ? { ...tab, request: next } : tab
        )
      );
    },
    [activeId]
  );

  const onAddTab = useCallback((): void => {
    const tab = newTab();
    setTabs((prev) => [...prev, tab]);
    setActiveId(tab.id);
    setResponse(null);
    setError(null);
  }, []);

  const onActivateTab = useCallback((id: string): void => {
    setActiveId(id);
    setResponse(null);
    setError(null);
  }, []);

  const onCloseTab = useCallback(
    (id: string): void => {
      if (tabs.length <= 1) return;
      const index = tabs.findIndex((tab) => tab.id === id);
      const next = tabs.filter((tab) => tab.id !== id);
      setTabs(next);
      if (id === activeId) {
        setActiveId(next[Math.max(0, index - 1)].id);
      }
    },
    [tabs, activeId]
  );

  const onSend = useCallback(async (): Promise<void> => {
    if (request.url.trim() === '') {
      setError('Please enter a URL');
      return;
    }
    setLoading(true);
    setError(null);
    setPrevResponse(responseRef.current);
    setResponse(null);
    try {
      const result = await executeRequest(request, env);
      setResponse(result);
      setHistory((prev) => {
        const next = addHistoryEntry(prev, request);
        saveHistory(next);
        return next;
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out');
      } else {
        setError(err instanceof Error ? err.message : 'Request failed');
      }
    } finally {
      setLoading(false);
    }
  }, [request, env]);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        void onSend();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onRequestChange(emptyRequest());
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSend, onRequestChange]);

  const onSelectHistory = useCallback(
    (entry: HistoryEntry): void => {
      onRequestChange(entry.request);
      setActiveEntryId(null);
      setResponse(null);
      setError(null);
    },
    [onRequestChange]
  );

  const onClearHistory = useCallback((): void => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const onEnvChange = useCallback((next: EnvironmentVariable[]): void => {
    setEnv(next);
  }, []);

  const onCollectionsChange = useCallback((next: RequestCollection[]): void => {
    setCollections(next);
  }, []);

  const onLoadCollectionEntry = useCallback(
    (entryRequest: RequestConfig, entryId: string): void => {
      onRequestChange(entryRequest);
      setActiveEntryId(entryId);
      setResponse(null);
      setError(null);
    },
    [onRequestChange]
  );

  const onSidebarTab = useCallback((tab: 'history' | 'collections'): void => {
    setSidebarTab(tab);
  }, []);

  const onToggleSidebar = useCallback((): void => {
    setShowSidebar((prev) => !prev);
  }, []);

  return {
    tabs,
    activeId,
    request,
    history,
    collections,
    env,
    response,
    prevResponse,
    loading,
    error,
    sidebarTab,
    showSidebar,
    activeEntryId,
    onRequestChange,
    onAddTab,
    onCloseTab,
    onActivateTab,
    onSend,
    onSelectHistory,
    onClearHistory,
    onEnvChange,
    onCollectionsChange,
    onLoadCollectionEntry,
    onSidebarTab,
    onToggleSidebar,
  };
};
