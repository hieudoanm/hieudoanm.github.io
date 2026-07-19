import type { SqliteCell } from '@/types/sqlite';
import { parseCSV } from '@/utils/csv';

export interface ImportSource {
  columns: string[];
  rows: string[][];
}

export interface ColumnMapping {
  targetColumn: string;
  sourceIndex: number;
}

const rowHasContent = (row: string[]): boolean =>
  row.some((cell) => cell.trim() !== '');

const toCellString = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
};

export const parseDelimitedSource = (
  text: string,
  delimiter: string,
  hasHeader: boolean
): ImportSource => {
  const parsed = parseCSV(text, delimiter).filter(rowHasContent);
  if (parsed.length === 0) return { columns: [], rows: [] };
  const columns = hasHeader
    ? parsed[0].map((c, i) => c.trim() || `column${i + 1}`)
    : Array.from({ length: parsed[0].length }, (_, i) => `column${i + 1}`);
  const rows = hasHeader ? parsed.slice(1) : parsed;
  return { columns, rows };
};

export const parseJsonSource = (text: string): ImportSource => {
  const value: unknown = JSON.parse(text);
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => v !== null && typeof v === 'object' && !Array.isArray(v))
  ) {
    const columns = Array.from(
      new Set(value.flatMap((o) => Object.keys(o as Record<string, unknown>)))
    );
    const rows = value.map((o) => {
      const rec = o as Record<string, unknown>;
      return columns.map((c) => toCellString(rec[c]));
    });
    return { columns, rows };
  }
  if (Array.isArray(value) && value.every((v) => Array.isArray(v))) {
    const width = value.length
      ? Math.max(0, ...(value as unknown[][]).map((r) => r.length))
      : 0;
    return {
      columns: Array.from({ length: width }, (_, i) => `column${i + 1}`),
      rows: (value as unknown[][]).map((r) =>
        Array.from({ length: width }, (_, j) => toCellString(r[j]))
      ),
    };
  }
  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Array.isArray((value as { columns?: unknown }).columns) &&
    Array.isArray((value as { rows?: unknown }).rows)
  ) {
    const obj = value as { columns: unknown[]; rows: unknown[][] };
    return {
      columns: obj.columns.map(String),
      rows: obj.rows.map((r) => (Array.isArray(r) ? r.map(toCellString) : [])),
    };
  }
  throw new Error(
    'JSON must be an array of objects, an array of arrays, or { "columns": [...], "rows": [...] }'
  );
};

export const autoMatchColumns = (
  sourceColumns: string[],
  targetColumns: string[]
): number[] =>
  targetColumns.map((target) =>
    sourceColumns.findIndex(
      (s) => s.trim().toLowerCase() === target.trim().toLowerCase()
    )
  );

export const buildImportRows = (
  source: ImportSource,
  mappings: ColumnMapping[]
): SqliteCell[][] =>
  source.rows
    .filter((row) => rowHasContent(row))
    .map((row) =>
      mappings.map((m) => {
        if (m.sourceIndex < 0) return null;
        const trimmed = (row[m.sourceIndex] ?? '').trim();
        return trimmed === '' ? null : trimmed;
      })
    );

export const validateImport = (
  source: ImportSource | null,
  mappings: ColumnMapping[],
  targetColumns: string[]
): string[] => {
  const errors: string[] = [];
  if (!source) {
    errors.push('Add CSV or JSON data first.');
    return errors;
  }
  if (source.rows.length === 0) {
    errors.push('The source contains no data rows.');
  }
  if (targetColumns.length === 0) {
    errors.push('The target table has no columns.');
  }
  if (mappings.every((m) => m.sourceIndex < 0)) {
    errors.push('Select at least one column to import.');
  }
  return errors;
};
