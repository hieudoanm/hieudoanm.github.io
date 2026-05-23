import { ExportFormat } from './types';

export const PAGE_SIZE = 100;

export const SQLS_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js';
export const WASM_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm';

export const EXPORT_FORMATS: {
  label: string;
  value: ExportFormat;
  ext: string;
  mime: string;
}[] = [
  { label: 'CSV', value: 'csv', ext: 'csv', mime: 'text/csv' },
  { label: 'JSON', value: 'json', ext: 'json', mime: 'application/json' },
  { label: 'Markdown', value: 'md', ext: 'md', mime: 'text/markdown' },
  { label: 'SQL INSERT', value: 'sql', ext: 'sql', mime: 'text/plain' },
];
