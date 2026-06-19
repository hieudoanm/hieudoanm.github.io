export interface TableMeta {
  name: string;
  rowCount: number;
}

export interface QueryResult {
  columns: string[];
  rows: (string | number | null | Uint8Array)[][];
}

export type SqlJsStatic = {
  Database: new (data?: ArrayLike<number> | Buffer | null) => SqlDatabase;
};

export type SqlDatabase = {
  exec: (
    sql: string
  ) => {
    columns: string[];
    values: (string | number | null | Uint8Array)[][];
  }[];
  run: (sql: string, params?: any[]) => void;
  export: () => Uint8Array;
  close: () => void;
};

export type ExportFormat = 'csv' | 'json' | 'md' | 'sql';
export type CellVal = string | number | null | Uint8Array;
