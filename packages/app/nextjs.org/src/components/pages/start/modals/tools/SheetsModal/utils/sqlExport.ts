import { CellVal, ExportFormat } from '../types';

export const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

export const formatNumber = (n: number): string => n.toLocaleString();

export const cellToString = (v: CellVal): string => {
  if (v === null) return '';
  if (v instanceof Uint8Array) return `[BLOB ${v.length}B]`;
  return String(v);
};

const escapeCSV = (s: string) =>
  s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;

export const convertToCSV = (columns: string[], rows: CellVal[][]): string =>
  columns.map(escapeCSV).join(',') +
  '\n' +
  rows
    .map((r) => r.map((v) => escapeCSV(cellToString(v))).join(','))
    .join('\n');

export const convertToJSON = (columns: string[], rows: CellVal[][]): string =>
  JSON.stringify(
    rows.map((r) => {
      const obj: Record<string, CellVal> = {};
      columns.forEach((c, i) => {
        obj[c] =
          r[i] instanceof Uint8Array
            ? `[BLOB ${(r[i] as Uint8Array).length}B]`
            : r[i];
      });
      return obj;
    }),
    null,
    2
  );

export const convertToMarkdown = (
  columns: string[],
  rows: CellVal[][]
): string => {
  const header = `| ${columns.join(' | ')} |`;
  const sep = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows
    .map(
      (r) =>
        `| ${r.map((v) => cellToString(v).replace(/\|/g, '\\|')).join(' | ')} |`
    )
    .join('\n');
  return [header, sep, body].join('\n');
};

export const convertToSQL = (
  tableName: string,
  columns: string[],
  rows: CellVal[][]
): string => {
  if (rows.length === 0) return `-- No rows in "${tableName}"`;
  const cols = columns.map((c) => `"${c}"`).join(', ');
  const sqlVal = (v: CellVal): string => {
    if (v === null || v instanceof Uint8Array) return 'NULL';
    if (typeof v === 'number') return String(v);
    return `'${String(v).replace(/'/g, "''")}'`;
  };
  return rows
    .map(
      (r) =>
        `INSERT INTO "${tableName}" (${cols}) VALUES (${r.map(sqlVal).join(', ')});`
    )
    .join('\n');
};

export const getExportContent = (
  format: ExportFormat,
  tableName: string,
  columns: string[],
  rows: CellVal[][]
): string => {
  switch (format) {
    case 'csv':
      return convertToCSV(columns, rows);
    case 'json':
      return convertToJSON(columns, rows);
    case 'md':
      return convertToMarkdown(columns, rows);
    case 'sql':
      return convertToSQL(tableName, columns, rows);
  }
};
