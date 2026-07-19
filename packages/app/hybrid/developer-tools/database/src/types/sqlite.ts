import type initSqlJs from 'sql.js';

export interface SqliteColumnMeta {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
}

export interface SqliteTableMeta {
  name: string;
  rowCount: number;
  columns: SqliteColumnMeta[];
}

export type SqliteCell = string | number | null | Uint8Array;

export interface SqliteQueryResult {
  columns: string[];
  rows: SqliteCell[][];
}

export type SqlJsStatic = Awaited<ReturnType<typeof initSqlJs>>;

export type SqliteDatabase = InstanceType<SqlJsStatic['Database']>;

export type ExportFormat = 'csv' | 'json' | 'md' | 'sql';

export interface ResultTab {
  id: string;
  sql: string;
  explain?: boolean;
  columns: string[];
  rows: SqliteCell[][];
}
