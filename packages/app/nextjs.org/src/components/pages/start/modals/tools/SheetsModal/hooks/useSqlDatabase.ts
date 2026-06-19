import { useCallback, useEffect, useRef, useState } from 'react';

import { WASM_CDN, SQLS_CDN } from '../constants';
import { QueryResult, SqlDatabase, SqlJsStatic, TableMeta } from '../types';
import { formatBytes, formatNumber } from '../utils/sqlExport';
import {
  loadFromOPFS,
  opfsAvailable,
  saveToOPFS,
  listOPFSFiles,
} from '../utils/opfs';
import { createSeedData } from '../utils/seedData';

export const useSqlDatabase = () => {
  const [sqlJs, setSqlJs] = useState<SqlJsStatic | null>(null);
  const [dbInstance, setDbInstance] = useState<SqlDatabase | null>(null);
  const [dbFileName, setDbFileName] = useState<string | null>(null);
  const [tables, setTables] = useState<TableMeta[]>([]);
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult>({
    columns: [],
    rows: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [status, setStatus] = useState('Ready · No database loaded');
  const [opfsFiles, setOpfsFiles] = useState<string[]>([]);

  const dbRef = useRef<SqlDatabase | null>(null);

  useEffect(() => {
    dbRef.current = dbInstance;
  }, [dbInstance]);
  useEffect(() => {
    listOPFSFiles().then(setOpfsFiles);
  }, []);

  const loadSqlJs = useCallback(async (): Promise<SqlJsStatic> => {
    if (sqlJs) return sqlJs;
    return new Promise((resolve, reject) => {
      const init = () =>
        (window as any)
          .initSqlJs({ locateFile: () => WASM_CDN })
          .then((s: SqlJsStatic) => {
            setSqlJs(s);
            resolve(s);
          });
      if ((window as any).initSqlJs) {
        init();
        return;
      }
      const script = document.createElement('script');
      script.src = SQLS_CDN;
      script.onload = init;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, [sqlJs]);

  const selectTableWithInstance = (instance: SqlDatabase, name: string) => {
    try {
      const res = instance.exec(`SELECT * FROM "${name}" LIMIT 10000`);
      const result: QueryResult = res.length
        ? { columns: res[0].columns, rows: res[0].values }
        : { columns: [], rows: [] };
      setQueryResult(result);
      setActiveTable(name);
      setStatus(
        `"${name}" · ${formatNumber(result.rows.length)} rows · ${result.columns.length} columns`
      );
    } catch (e: unknown) {
      setStatus('Query error: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const enumerateTables = (instance: SqlDatabase): TableMeta[] => {
    const res = instance.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    );
    const names: string[] = res.length
      ? res[0].values.map((r) => String(r[0]))
      : [];
    return names.map((name) => {
      try {
        const r = instance.exec(`SELECT COUNT(*) FROM "${name}"`);
        return { name, rowCount: Number(r[0].values[0][0]) };
      } catch {
        return { name, rowCount: 0 };
      }
    });
  };

  const openDb = useCallback(
    async (buffer: Uint8Array, filename: string) => {
      setLoading(true);
      setLoadingMsg('Initialising SQLite WASM engine…');
      try {
        const SQL = await loadSqlJs();
        setLoadingMsg('Parsing database…');
        if (dbRef.current) {
          try {
            dbRef.current.close();
          } catch (e: unknown) {
            console.error('Error closing existing DB:', e);
          }
        }
        const instance = new SQL.Database(buffer);
        const metas = enumerateTables(instance);
        setDbInstance(instance);
        setDbFileName(filename);
        setTables(metas);
        setStatus(
          `Opened "${filename}" · ${metas.length} table${metas.length !== 1 ? 's' : ''}`
        );
        if (metas.length > 0) selectTableWithInstance(instance, metas[0].name);
        else {
          setActiveTable(null);
          setQueryResult({ columns: [], rows: [] });
        }
        listOPFSFiles().then(setOpfsFiles);
      } catch (e: unknown) {
        setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
      } finally {
        setLoading(false);
      }
    },
    [loadSqlJs]
  );

  const selectTable = useCallback(
    (name: string) => {
      if (dbInstance) selectTableWithInstance(dbInstance, name);
    },
    [dbInstance]
  );

  const createNewDb = useCallback(async () => {
    setLoading(true);
    setLoadingMsg('Creating database…');
    try {
      const SQL = await loadSqlJs();
      if (dbRef.current) {
        try {
          dbRef.current.close();
        } catch (e: unknown) {
          console.error('Error closing existing DB:', e);
        }
      }
      const instance = new SQL.Database();
      createSeedData(instance);
      const metas: TableMeta[] = ['customers', 'orders', 'products'].map(
        (name) => {
          const r = instance.exec(`SELECT COUNT(*) FROM "${name}"`);
          return { name, rowCount: Number(r[0].values[0][0]) };
        }
      );
      setDbInstance(instance);
      setDbFileName('demo_database.db');
      setTables(metas);
      selectTableWithInstance(instance, 'customers');
      setStatus('Created demo database · 3 tables');
    } catch (e: unknown) {
      setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  }, [loadSqlJs]);

  const handleSave = async () => {
    if (!dbInstance || !dbFileName) return;
    if (!(await opfsAvailable())) {
      alert('OPFS is not available. Use Chrome or Edge.');
      return;
    }
    try {
      const data = dbInstance.export();
      await saveToOPFS(dbFileName, data);
      setStatus(
        `Saved to OPFS · "${dbFileName}" · ${formatBytes(data.length)}`
      );
      listOPFSFiles().then(setOpfsFiles);
    } catch (e: unknown) {
      setStatus(
        'OPFS save error: ' + (e instanceof Error ? e.message : String(e))
      );
    }
  };

  const handleLoadOpfs = async (filename: string) => {
    const buf = await loadFromOPFS(filename);
    if (buf) openDb(buf, filename);
  };

  const handleExport = () => {
    if (!dbInstance) return;
    const data = dbInstance.export();
    const blob = new Blob([data.buffer as ArrayBuffer], {
      type: 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dbFileName ?? 'export.db';
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`Exported "${dbFileName}" · ${formatBytes(data.length)}`);
  };

  return {
    dbInstance,
    dbFileName,
    tables,
    activeTable,
    queryResult,
    loading,
    loadingMsg,
    status,
    opfsFiles,
    setActiveTable,
    setQueryResult,
    openDb,
    createNewDb,
    selectTable,
    handleSave,
    handleLoadOpfs,
    handleExport,
  };
};
