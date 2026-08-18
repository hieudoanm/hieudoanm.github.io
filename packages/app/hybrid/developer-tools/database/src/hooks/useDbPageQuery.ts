import { useEffect, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { DbPageState } from '@/hooks/useDbPageState';
import { db } from '@/lib/db';
import type { Bookmark, QueryHistory } from '@/types';
import type {
  ResultTab,
  SqliteDatabase,
  SqliteQueryResult,
} from '@/types/sqlite';
import { makeId } from '@/utils/tableData';

interface QueryProps {
  state: Pick<
    DbPageState,
    | 'tabs'
    | 'setTabs'
    | 'activeTabId'
    | 'setActiveTabId'
    | 'history'
    | 'setHistory'
    | 'panel'
    | 'setPanel'
    | 'bookmarkOpen'
    | 'setBookmarkOpen'
    | 'bmName'
    | 'setBmName'
    | 'bmFolder'
    | 'setBmFolder'
    | 'bmNewFolder'
    | 'setBmNewFolder'
    | 'extraFolders'
    | 'setExtraFolders'
    | 'sql'
  >;
  dbInstance: SqliteDatabase | null;
  runQuery: (sql: string) => {
    ok: boolean;
    elapsedMs: number;
    result: SqliteQueryResult;
  };
  explainQuery: (sql: string) => SqliteQueryResult | null;
  connectionId: string;
  bookmarks: Bookmark[];
  addBookmark: (name: string, sql: string, folder?: string) => Promise<void>;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export interface DbPageQuery {
  tabs: ResultTab[];
  setTabs: Dispatch<SetStateAction<ResultTab[]>>;
  activeTabId: string | null;
  setActiveTabId: Dispatch<SetStateAction<string | null>>;
  activeTab: ResultTab | null;
  history: QueryHistory[];
  panel: 'history' | 'bookmarks' | null;
  setPanel: Dispatch<SetStateAction<'history' | 'bookmarks' | null>>;
  bookmarkOpen: boolean;
  setBookmarkOpen: Dispatch<SetStateAction<boolean>>;
  bmName: string;
  setBmName: Dispatch<SetStateAction<string>>;
  bmFolder: string;
  setBmFolder: Dispatch<SetStateAction<string>>;
  bmNewFolder: string;
  setBmNewFolder: Dispatch<SetStateAction<string>>;
  folders: string[];
  groupedBookmarks: [string, Bookmark[]][];
  handleExecute: (arg?: string) => void;
  handleExplain: () => void;
  closeTab: (tabId: string) => void;
  openBookmarkDialog: () => void;
  handleSaveBookmark: () => Promise<void>;
}

export const useDbPageQuery = ({
  state,
  dbInstance,
  runQuery,
  explainQuery,
  connectionId,
  bookmarks,
  addBookmark,
  addToast,
}: QueryProps): DbPageQuery => {
  const { tabs, setTabs, activeTabId, setActiveTabId, sql } = state;

  useEffect(() => {
    db.history
      .getAll()
      .then((h) =>
        state.setHistory(
          h.sort((a, b) => b.timestamp - a.timestamp).slice(0, 100)
        )
      )
      .catch(() => {});
  }, [state]);

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? null;

  const folders = useMemo(() => {
    const set = new Set<string>(state.extraFolders);
    for (const b of bookmarks) if (b.folder) set.add(b.folder);
    return Array.from(set);
  }, [bookmarks, state.extraFolders]);

  const groupedBookmarks = useMemo(() => {
    const map = new Map<string, Bookmark[]>();
    for (const b of bookmarks) {
      const key = b.folder ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    }
    return Array.from(map.entries());
  }, [bookmarks]);

  const pushHistory = async (
    s: string,
    elapsedMs: number,
    rowCount: number
  ) => {
    const entry: QueryHistory = {
      id: makeId('h'),
      connectionId,
      sql: s,
      executionTime: elapsedMs,
      rowCount,
      success: true,
      timestamp: Date.now(),
    };
    db.history.put(entry).catch(() => {});
    state.setHistory((p) => [entry, ...p].slice(0, 100));
  };

  const handleExecute = (arg?: string) => {
    const target = (arg ?? sql).trim();
    if (!target) return;
    if (!dbInstance) {
      addToast('Open or create a database first', 'info');
      return;
    }
    const outcome = runQuery(target);
    if (outcome?.ok) {
      const tab: ResultTab = {
        id: makeId('r'),
        sql: target,
        columns: outcome.result.columns,
        rows: outcome.result.rows,
      };
      setTabs((p) => [...p, tab]);
      setActiveTabId(tab.id);
      pushHistory(target, outcome.elapsedMs, outcome.result.rows.length);
    }
  };

  const handleExplain = () => {
    const target = sql.trim();
    if (!target || !dbInstance) return;
    const res = explainQuery(target);
    if (!res) return;
    const tab: ResultTab = {
      id: makeId('x'),
      sql: target,
      explain: true,
      columns: res.columns,
      rows: res.rows,
    };
    setTabs((p) => [...p, tab]);
    setActiveTabId(tab.id);
  };

  const closeTab = (tabId: string) => {
    const idx = tabs.findIndex((t) => t.id === tabId);
    const next = tabs.filter((t) => t.id !== tabId);
    if (activeTabId === tabId) {
      const fallback = next[idx] ?? next[idx - 1] ?? null;
      setActiveTabId(fallback ? fallback.id : null);
    }
    setTabs(next);
  };

  const openBookmarkDialog = () => {
    const firstLine = sql.split('\n')[0] ?? '';
    state.setBmName(firstLine.slice(0, 60));
    state.setBmFolder('');
    state.setBmNewFolder('');
    state.setBookmarkOpen(true);
  };

  const handleSaveBookmark = async () => {
    const folder = state.bmNewFolder.trim() || state.bmFolder;
    await addBookmark(
      state.bmName.trim() || 'Bookmark',
      sql,
      folder || undefined
    );
    if (state.bmNewFolder.trim())
      state.setExtraFolders((p) => [...p, state.bmNewFolder.trim()]);
    state.setBookmarkOpen(false);
    addToast('Bookmarked', 'success');
  };

  return {
    tabs,
    setTabs,
    activeTabId,
    setActiveTabId,
    activeTab,
    history: state.history,
    panel: state.panel,
    setPanel: state.setPanel,
    bookmarkOpen: state.bookmarkOpen,
    setBookmarkOpen: state.setBookmarkOpen,
    bmName: state.bmName,
    setBmName: state.setBmName,
    bmFolder: state.bmFolder,
    setBmFolder: state.setBmFolder,
    bmNewFolder: state.bmNewFolder,
    setBmNewFolder: state.setBmNewFolder,
    folders,
    groupedBookmarks,
    handleExecute,
    handleExplain,
    closeTab,
    openBookmarkDialog,
    handleSaveBookmark,
  };
};
