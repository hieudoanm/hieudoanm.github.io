import { useCallback, useEffect, useRef, useState } from 'react';
import initSqlJs from 'sql.js';

import type {
  SqliteDatabase,
  SqliteQueryResult,
  SqliteTableMeta,
  SqlJsStatic,
} from '@/types/sqlite';
import { listOPFSFiles } from '@/utils/opfs';

export const WASM_PATH = '/wasm/sql-wasm.wasm';

export interface SqlDatabaseState {
  sqlJs: SqlJsStatic | null;
  dbInstance: SqliteDatabase | null;
  setDbInstance: (db: SqliteDatabase | null) => void;
  dbFileName: string | null;
  setDbFileName: (name: string | null) => void;
  tables: SqliteTableMeta[];
  setTables: (tables: SqliteTableMeta[]) => void;
  activeTable: string | null;
  setActiveTable: (table: string | null) => void;
  queryResult: SqliteQueryResult;
  setQueryResult: (result: SqliteQueryResult) => void;
  error: string | null;
  setError: (error: string | null) => void;
  lastElapsed: number | null;
  setLastElapsed: (ms: number | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMsg: string;
  setLoadingMsg: (msg: string) => void;
  status: string;
  setStatus: (status: string) => void;
  opfsFiles: string[];
  setOpfsFiles: (files: string[]) => void;
  dbRef: React.MutableRefObject<SqliteDatabase | null>;
  loadSqlJs: () => Promise<SqlJsStatic>;
}

export const useSqlDatabaseState = (): SqlDatabaseState => {
  const [sqlJs, setSqlJs] = useState<SqlJsStatic | null>(null);
  const [dbInstance, setDbInstance] = useState<SqliteDatabase | null>(null);
  const [dbFileName, setDbFileName] = useState<string | null>(null);
  const [tables, setTables] = useState<SqliteTableMeta[]>([]);
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<SqliteQueryResult>({
    columns: [],
    rows: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [lastElapsed, setLastElapsed] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [status, setStatus] = useState('Ready · No database loaded');
  const [opfsFiles, setOpfsFiles] = useState<string[]>([]);

  const dbRef = useRef<SqliteDatabase | null>(null);

  useEffect(() => {
    dbRef.current = dbInstance;
  }, [dbInstance]);

  useEffect(() => {
    listOPFSFiles().then(setOpfsFiles);
  }, []);

  const loadSqlJs = useCallback(async (): Promise<SqlJsStatic> => {
    if (sqlJs) return sqlJs;
    const s = await initSqlJs({ locateFile: () => WASM_PATH });
    setSqlJs(s);
    return s;
  }, [sqlJs]);

  return {
    sqlJs,
    dbInstance,
    setDbInstance,
    dbFileName,
    setDbFileName,
    tables,
    setTables,
    activeTable,
    setActiveTable,
    queryResult,
    setQueryResult,
    error,
    setError,
    lastElapsed,
    setLastElapsed,
    loading,
    setLoading,
    loadingMsg,
    setLoadingMsg,
    status,
    setStatus,
    opfsFiles,
    setOpfsFiles,
    dbRef,
    loadSqlJs,
  };
};
