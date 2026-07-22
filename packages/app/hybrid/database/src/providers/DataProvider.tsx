'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  DatabaseConnection,
  QueryHistory,
  Bookmark,
  Settings,
  QueryResult,
  TableSchema,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase, executeQuery, MOCK_SCHEMAS } from '@/data/seed';

interface DataContextType {
  connections: DatabaseConnection[];
  currentConnection: DatabaseConnection | null;
  schemas: TableSchema[];
  queryResult: QueryResult | null;
  history: QueryHistory[];
  bookmarks: Bookmark[];
  settings: Settings;
  isLoading: boolean;
  setCurrentConnection: (c: DatabaseConnection | null) => void;
  createConnection: (
    name: string,
    filePath: string,
    readOnly: boolean
  ) => Promise<DatabaseConnection>;
  deleteConnection: (id: string) => Promise<void>;
  runQuery: (sql: string) => void;
  addBookmark: (name: string, sql: string) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  updateSettings: (s: Partial<Settings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [currentConnection, setCurrentConnection] =
    useState<DatabaseConnection | null>(null);
  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [settings, setSettings] = useState<Settings>({
    theme: 'night',
    defaultPort: 5432,
    editorFontSize: 14,
    queryTimeout: 30,
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [conns, hist, bms, sett] = await Promise.all([
      db.connections.getAll(),
      db.history.getAll(),
      db.bookmarks.getAll(),
      db.settings.get(),
    ]);
    setConnections(conns.sort((a, b) => b.lastConnected - a.lastConnected));
    setHistory(hist.sort((a, b) => b.timestamp - a.timestamp));
    setBookmarks(bms);
    setSettings(sett);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (currentConnection) {
      setSchemas(MOCK_SCHEMAS[currentConnection.id] ?? MOCK_SCHEMAS['db-1']);
    }
  }, [currentConnection]);

  const createConnection = useCallback(
    async (name: string, filePath: string, readOnly: boolean) => {
      const conn: DatabaseConnection = {
        id: `db-${Date.now()}`,
        name,
        filePath,
        size: Math.floor(Math.random() * 10485760),
        readOnly,
        lastConnected: Date.now(),
        createdAt: Date.now(),
      };
      await db.connections.put(conn);
      setConnections((p) => [conn, ...p]);
      return conn;
    },
    []
  );

  const deleteConnection = useCallback(async (id: string) => {
    await db.connections.delete(id);
    setConnections((p) => p.filter((c) => c.id !== id));
  }, []);

  const runQuery = useCallback(
    (sql: string) => {
      const result = executeQuery(sql);
      setQueryResult(result);
      const h: QueryHistory = {
        id: `h-${Date.now()}`,
        connectionId: currentConnection?.id ?? '',
        sql,
        executionTime: result.executionTime,
        rowCount: result.rowCount,
        success: true,
        timestamp: Date.now(),
      };
      db.history.put(h);
      setHistory((p) => [h, ...p]);
    },
    [currentConnection]
  );

  const addBookmark = useCallback(
    async (name: string, sql: string) => {
      const b: Bookmark = {
        id: `bm-${Date.now()}`,
        connectionId: currentConnection?.id ?? '',
        name,
        sql,
        createdAt: Date.now(),
      };
      await db.bookmarks.put(b);
      setBookmarks((p) => [...p, b]);
    },
    [currentConnection]
  );

  const deleteBookmark = useCallback(async (id: string) => {
    await db.bookmarks.delete(id);
    setBookmarks((p) => p.filter((b) => b.id !== id));
  }, []);

  const updateSettings = useCallback(
    async (partial: Partial<Settings>) => {
      const updated = { ...settings, ...partial };
      await db.settings.put(updated);
      setSettings(updated);
    },
    [settings]
  );

  return (
    <DataContext.Provider
      value={{
        connections,
        currentConnection,
        schemas,
        queryResult,
        history,
        bookmarks,
        settings,
        isLoading,
        setCurrentConnection,
        createConnection,
        deleteConnection,
        runQuery,
        addBookmark,
        deleteBookmark,
        updateSettings,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
