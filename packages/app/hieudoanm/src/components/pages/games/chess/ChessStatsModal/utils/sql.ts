import { useEffect, useState } from 'react';
import type { DB, SqlJsStatic } from '../types';
import { SQL_JS_CDN, SQL_WASM_CDN } from '../constants';

declare global {
  interface Window {
    initSqlJs?: (cfg: {
      locateFile: (f: string) => string;
    }) => Promise<SqlJsStatic>;
  }
}

const loadSqlJs = (): Promise<SqlJsStatic> => {
  return new Promise((resolve, reject) => {
    if (globalThis.window === undefined) return reject(new Error('No window'));

    const init = () =>
      globalThis.window.initSqlJs!({ locateFile: () => SQL_WASM_CDN }).then(
        resolve
      );

    if (globalThis.window.initSqlJs) return init();

    const existing = document.getElementById('sqljs-script');
    if (existing) {
      existing.addEventListener('load', init);
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'sqljs-script';
    script.src = SQL_JS_CDN;
    script.async = true;
    script.onload = init;
    script.onerror = () => reject(new Error('Failed to load sql.js from CDN'));
    document.head.appendChild(script);
  });
};

export const useSQLite = (dbPath: string) => {
  const [db, setDb] = useState<DB | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const SQL = await loadSqlJs();
        const res = await fetch(dbPath);
        if (!res.ok) throw new Error(`Failed to fetch DB: ${res.status}`);
        const bytes = new Uint8Array(await res.arrayBuffer());
        const instance = new SQL.Database(bytes);
        if (!cancelled) setDb(instance);
      } catch (err) {
        if (!cancelled) setDbError(err as Error);
      } finally {
        if (!cancelled) setDbLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [dbPath]);

  return { db, dbLoading, dbError };
};
