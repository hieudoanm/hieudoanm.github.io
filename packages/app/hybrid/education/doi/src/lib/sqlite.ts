import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';

let sqlPromise: Promise<SqlJsStatic> | null = null;

const base = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const WASM_PATH = base('/wasm/sql-wasm.wasm');
export const DB_PATH = base('/database/doi.db');

export const getSqlJs = (): Promise<SqlJsStatic> => {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: () => WASM_PATH });
  }
  return sqlPromise;
};

export const openDoiDb = async (): Promise<Database> => {
  const SQL = await getSqlJs();
  const res = await fetch(DB_PATH);
  if (!res.ok) throw new Error(`Failed to load database: ${res.status}`);
  const buffer = await res.arrayBuffer();
  return new SQL.Database(new Uint8Array(buffer));
};
