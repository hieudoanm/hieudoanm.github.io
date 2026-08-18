import { useMemo, useRef, useState, type FC } from 'react';
import { FiAlertCircle, FiCheck, FiUpload, FiX } from 'react-icons/fi';

import type { SqliteCell, SqliteTableMeta } from '@/types/sqlite';
import { detectDelimiter } from '@/utils/csv';
import { formatNumber } from '@/utils/sqlExport';
import {
  autoMatchColumns,
  buildImportRows,
  parseDelimitedSource,
  parseJsonSource,
  validateImport,
  type ColumnMapping,
  type ImportSource,
} from '@/utils/import';

interface ImportModalProps {
  tables: SqliteTableMeta[];
  defaultTable: string | null;
  onImport: (
    tableName: string,
    columns: string[],
    rows: SqliteCell[][],
    onProgress: (done: number, total: number) => void
  ) => Promise<{ inserted: number; failed: number }>;
  onClose: () => void;
}

const DELIMITERS = [
  { label: 'Auto', value: 'auto' },
  { label: 'Comma', value: ',' },
  { label: 'Tab', value: '\t' },
  { label: 'Semicolon', value: ';' },
  { label: 'Pipe', value: '|' },
];

export const ImportModal: FC<ImportModalProps> = ({
  tables,
  defaultTable,
  onImport,
  onClose,
}) => {
  const [mode, setMode] = useState<'csv' | 'json'>('csv');
  const [csvText, setCsvText] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [delimiter, setDelimiter] = useState('auto');
  const [hasHeader, setHasHeader] = useState(true);
  const [fileName, setFileName] = useState('');
  const [targetTable, setTargetTable] = useState(
    defaultTable ?? tables[0]?.name ?? ''
  );
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);
  const [result, setResult] = useState<{
    inserted: number;
    failed: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const delimiterValue =
    delimiter === 'auto' ? detectDelimiter(csvText) : delimiter;

  const parsed = useMemo((): {
    source: ImportSource | null;
    error: string | null;
  } => {
    try {
      if (mode === 'csv') {
        if (!csvText.trim()) return { source: null, error: null };
        return {
          source: parseDelimitedSource(csvText, delimiterValue, hasHeader),
          error: null,
        };
      }
      if (!jsonText.trim()) return { source: null, error: null };
      return { source: parseJsonSource(jsonText), error: null };
    } catch (e: unknown) {
      return {
        source: null,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }, [mode, csvText, jsonText, delimiterValue, hasHeader]);

  const source = parsed.source;
  const targetColumns =
    tables.find((t) => t.name === targetTable)?.columns.map((c) => c.name) ??
    [];

  const mappings: ColumnMapping[] = useMemo(() => {
    const auto = autoMatchColumns(source?.columns ?? [], targetColumns);
    return targetColumns.map((col, i) => ({
      targetColumn: col,
      sourceIndex: overrides[col] ?? auto[i],
    }));
  }, [source, targetColumns, overrides]);

  const activeMappings = mappings.filter((m) => m.sourceIndex >= 0);
  const previewRows = useMemo(
    () =>
      source && activeMappings.length > 0
        ? buildImportRows(source, activeMappings).slice(0, 5)
        : [],
    [source, activeMappings]
  );

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setCsvText(String(ev.target?.result ?? ''));
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!source || importing) return;
    const errors = validateImport(source, mappings, targetColumns);
    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }
    setError(null);
    setResult(null);
    setProgress(null);
    setImporting(true);
    const res = await onImport(
      targetTable,
      activeMappings.map((m) => m.targetColumn),
      buildImportRows(source, activeMappings),
      (done, total) => setProgress({ done, total })
    );
    setResult(res);
    setImporting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => !importing && onClose()}>
      <div
        className="bg-base-100 border-base-300 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="border-base-300 flex flex-shrink-0 items-center justify-between border-b px-5 py-4">
          <span className="text-base-content font-normal tracking-tight">
            Import data
          </span>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            disabled={importing}
            onClick={onClose}>
            <FiX className="size-4" />
          </button>
        </div>

        <div className="flex flex-shrink-0 gap-1 px-5 pt-4">
          {(['csv', 'json'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
                setResult(null);
              }}
              className={`btn btn-sm rounded-lg uppercase ${mode === m ? 'btn-primary' : 'btn-ghost text-base-content/50 hover:text-base-content'}`}>
              {m}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          {mode === 'csv' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = '';
                }}
              />
              <button
                className="bg-base-200 hover:bg-base-300 border-base-300 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-8 transition-colors"
                onClick={() => fileInputRef.current?.click()}>
                <FiUpload className="size-6 opacity-60" />
                <span className="text-sm">
                  {fileName || 'Choose a CSV file or drop it here'}
                </span>
              </button>
            </div>
          ) : (
            <textarea
              placeholder='[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]'
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              spellCheck={false}
              className="bg-base-200 border-base-300 h-32 w-full resize-none rounded-xl border p-3 font-mono text-xs focus:outline-none"
            />
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={targetTable}
              onChange={(e) => setTargetTable(e.target.value)}
              className="select select-bordered select-sm bg-base-100">
              {tables.length === 0 && <option value="">No tables</option>}
              {tables.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            {mode === 'csv' && (
              <>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="select select-bordered select-sm bg-base-100">
                  {DELIMITERS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="checkbox checkbox-sm"
                  />
                  First row is header
                </label>
              </>
            )}
          </div>

          {source && targetColumns.length > 0 && (
            <>
              <p className="text-base-content/40 mt-3 mb-1 text-[10px] font-normal tracking-widest uppercase">
                Column mapping
              </p>
              <div className="bg-base-200/40 rounded-lg p-2">
                {targetColumns.map((col, i) => {
                  const m = mappings[i];
                  return (
                    <div key={col} className="flex items-center gap-2 py-0.5">
                      <span className="w-36 flex-shrink-0 truncate font-mono text-xs">
                        {col}
                      </span>
                      <select
                        value={m.sourceIndex}
                        onChange={(e) =>
                          setOverrides((p) => ({
                            ...p,
                            [col]: Number(e.target.value),
                          }))
                        }
                        className="select select-bordered select-xs bg-base-100 flex-1 font-mono">
                        <option value={-1}>— Skip —</option>
                        {source.columns.map((sc, si) => (
                          <option key={`${sc}-${si}`} value={si}>
                            {sc}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {parsed.error && (
            <p className="text-error mt-3 flex items-center gap-2 text-xs">
              <FiAlertCircle className="size-3.5" /> {parsed.error}
            </p>
          )}

          {source && (
            <div className="mt-4">
              <p className="text-base-content/40 mb-1 text-[10px] font-normal tracking-widest uppercase">
                Preview · {formatNumber(source.rows.length)} rows
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <table className="table-xs table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      {activeMappings.length > 0 ? (
                        activeMappings.map((m) => (
                          <th
                            key={m.targetColumn}
                            className="font-mono font-normal">
                            {m.targetColumn}
                          </th>
                        ))
                      ) : (
                        <th className="text-base-content/30 font-normal">
                          No columns mapped
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="font-mono text-xs">
                            {cell === null ? (
                              <span className="text-base-content/20 italic">
                                NULL
                              </span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {previewRows.length === 0 && (
                      <tr>
                        <td className="text-base-content/30 py-4 text-center text-xs">
                          Nothing to preview
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="border-base-300 flex flex-shrink-0 flex-col gap-2 border-t px-5 py-4">
          {importing && progress && (
            <div className="flex items-center gap-3">
              <progress
                className="progress progress-primary w-full"
                value={progress.done}
                max={progress.total}
              />
              <span className="text-base-content/40 font-mono text-xs tabular-nums">
                {formatNumber(progress.done)} / {formatNumber(progress.total)}
              </span>
            </div>
          )}
          {result && (
            <p
              className={`flex items-center gap-2 text-xs ${result.failed > 0 ? 'text-warning' : 'text-success'}`}>
              <FiCheck className="size-3.5" />
              Imported {formatNumber(result.inserted)} rows
              {result.failed > 0 &&
                ` · ${formatNumber(result.failed)} rows failed validation`}
            </p>
          )}
          {error && (
            <p className="text-error flex items-center gap-2 text-xs">
              <FiAlertCircle className="size-3.5" /> {error}
            </p>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              className="btn btn-ghost btn-sm"
              disabled={importing}
              onClick={onClose}>
              {result ? 'Done' : 'Cancel'}
            </button>
            <button
              className="btn btn-primary btn-sm gap-2"
              disabled={!source || importing}
              onClick={handleImport}>
              {importing && (
                <span className="loading loading-spinner loading-xs" />
              )}
              {importing ? 'Importing…' : `Import into "${targetTable}"`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ImportModal.displayName = 'ImportModal';
