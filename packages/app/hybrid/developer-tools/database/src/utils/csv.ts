import type { SqliteCell } from '@/types/sqlite';

export const detectDelimiter = (text: string): string => {
  const firstLine = text.split(/\r?\n/)[0] ?? '';
  const candidates = [',', '\t', ';', '|'] as const;
  let best = ',' as string;
  let bestCount = -1;
  for (const d of candidates) {
    const count = firstLine.split(d).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return best;
};

export const parseCSV = (text: string, delimiter = ','): string[][] => {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  let i = 0;
  const chars = text.split('');
  while (i < chars.length) {
    const ch = chars[i];
    if (inQuotes) {
      if (ch === '"') {
        if (chars[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (ch === delimiter) {
      row.push(field);
      field = '';
      i += 1;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && chars[i + 1] === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((f) => f.length > 0) || row.length > 1) rows.push(row);
      row = [];
      i += 1;
      continue;
    }
    field += ch;
    i += 1;
  }
  row.push(field);
  if (row.some((f) => f.length > 0) || row.length > 1) rows.push(row);
  return rows;
};

export type SqlType = 'INTEGER' | 'REAL' | 'TEXT' | 'NULL';

export const inferColumnType = (values: string[]): SqlType => {
  const nonEmpty = values.filter((v) => v.trim() !== '');
  if (nonEmpty.length === 0) return 'NULL';
  const allIntegers = nonEmpty.every((v) => /^-?\d+$/.test(v.trim()));
  if (allIntegers) return 'INTEGER';
  const allReal = nonEmpty.every((v) => /^-?\d*\.?\d+$/.test(v.trim()));
  if (allReal) return 'REAL';
  return 'TEXT';
};

export const coerceValue = (
  value: string,
  type: SqlType
): string | number | null => {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  if (type === 'INTEGER') return Number.parseInt(trimmed, 10);
  if (type === 'REAL') return Number.parseFloat(trimmed);
  return value;
};

export const previewRows = (
  text: string,
  delimiter = ',',
  maxRows = 5
): string[][] => {
  const parsed = parseCSV(text, delimiter);
  if (parsed.length === 0) return [];
  const header = parsed[0];
  const body = parsed.slice(1, 1 + maxRows);
  return [header, ...body];
};

export const toSqliteCell = (v: string | number | null): SqliteCell =>
  v as SqliteCell;
