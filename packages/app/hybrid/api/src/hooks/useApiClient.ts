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
import { tryMock } from '@/lib/mock';
import { loadEnvironment, saveEnvironment } from '@/lib/variables';
import {
  loadCookies,
  mergeCookies,
  parseSetCookies,
  saveCookies,
  setCookieLines,
} from '@/lib/cookies';
import { FormFiles } from '@/lib/body';
import {
  EnvironmentVariable,
  HistoryEntry,
  RequestCollection,
  RequestConfig,
  RequestProtocol,
  RequestTab,
  ResponseMeta,
  StoredCookie,
} from '@/types/api-client';

export interface UseApiClient {
  tabs: RequestTab[];
  activeId: string;
  request: RequestConfig;
  history: HistoryEntry[];
  collections: RequestCollection[];
  env: EnvironmentVariable[];
  cookies: StoredCookie[];
  protocol: RequestProtocol;
  response: ResponseMeta | null;
  prevResponse: ResponseMeta | null;
  loading: boolean;
  error: string | null;
  files: FormFiles;
  sidebarTab: 'history' | 'collections' | 'runner' | 'design';
  showSidebar: boolean;
  mockEnabled: boolean;
  activeEntryId: string | null;
  onRequestChange: (next: RequestConfig) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onActivateTab: (id: string) => void;
  onSend: () => void;
  onSelectHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  onEnvChange: (next: EnvironmentVariable[]) => void;
  onCookieChange: (next: StoredCookie[]) => void;
  onProtocolChange: (protocol: RequestProtocol) => void;
  onFilesChange: (files: FormFiles) => void;
  onCollectionsChange: (next: RequestCollection[]) => void;
  onLoadCollectionEntry: (request: RequestConfig, entryId: string) => void;
  onSidebarTab: (tab: 'history' | 'collections' | 'runner' | 'design') => void;
  onMockToggle: () => void;
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
  const [cookies, setCookies] = useState<StoredCookie[]>(loadCookies);
  const [protocol, setProtocol] = useState<RequestProtocol>('http');
  const [files, setFiles] = useState<FormFiles>({});
  const filesRef = useRef<FormFiles>({});
  const [response, setResponse] = useState<ResponseMeta | null>(null);
  const [prevResponse, setPrevResponse] = useState<ResponseMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<
    'history' | 'collections' | 'runner' | 'design'
  >('history');
  const [mockEnabled, setMockEnabled] = useState(false);
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

  useEffect(() => {
    saveCookies(cookies);
  }, [cookies]);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    setFiles({});
    filesRef.current = {};
  }, [activeId]);

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
      if (mockEnabled) {
        const mocked = tryMock(collections, request);
        if (mocked) {
          setResponse(mocked);
          setHistory((prev) => {
            const next = addHistoryEntry(prev, request);
            saveHistory(next);
            return next;
          });
          return;
        }
      }
      const result = await executeRequest(request, env, {
        cookies,
        files: filesRef.current,
      });
      setResponse(result);
      const lines = setCookieLines(result.headers);
      if (lines.length > 0) {
        setCookies((prev) =>
          mergeCookies(prev, parseSetCookies(result.url, lines))
        );
      }
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
  }, [request, env, cookies, mockEnabled, collections]);

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

  const onCookieChange = useCallback((next: StoredCookie[]): void => {
    setCookies(next);
  }, []);

  const onProtocolChange = useCallback((next: RequestProtocol): void => {
    setProtocol(next);
    setResponse(null);
    setError(null);
  }, []);

  const onFilesChange = useCallback((next: FormFiles): void => {
    setFiles(next);
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

  const onSidebarTab = useCallback(
    (tab: 'history' | 'collections' | 'runner' | 'design'): void => {
      setSidebarTab(tab);
    },
    []
  );

  const onMockToggle = useCallback((): void => {
    setMockEnabled((prev) => !prev);
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
    cookies,
    protocol,
    response,
    prevResponse,
    loading,
    error,
    files,
    sidebarTab,
    showSidebar,
    mockEnabled,
    activeEntryId,
    onRequestChange,
    onAddTab,
    onCloseTab,
    onActivateTab,
    onSend,
    onSelectHistory,
    onClearHistory,
    onEnvChange,
    onCookieChange,
    onProtocolChange,
    onFilesChange,
    onCollectionsChange,
    onLoadCollectionEntry,
    onSidebarTab,
    onMockToggle,
    onToggleSidebar,
  };
};
