import { useState, type FC } from 'react';
import { FiCheck, FiCopy, FiDownload, FiX } from 'react-icons/fi';

import type { ExportFormat, SqliteCell } from '@/types/sqlite';
import { formatNumber, getExportContent } from '@/utils/sqlExport';

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

interface ExportModalProps {
  tableName: string;
  columns: string[];
  rows: SqliteCell[][];
  onClose: () => void;
}

export const ExportModal: FC<ExportModalProps> = ({
  tableName,
  columns,
  rows,
  onClose,
}) => {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [copied, setCopied] = useState(false);
  const content = getExportContent(format, tableName, columns, rows);
  const fmt = EXPORT_FORMATS.find((f) => f.value === format)!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-base-100 border-base-300 flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="border-base-300 flex flex-shrink-0 items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-base-content font-normal tracking-tight">
              Export <span className="text-primary font-mono">{tableName}</span>
            </span>
            <span className="text-base-content/30 font-mono text-xs">
              {formatNumber(rows.length)} rows · {columns.length} cols
            </span>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <FiX className="size-4" />
          </button>
        </div>
        <div className="flex flex-shrink-0 gap-1 px-5 pt-4">
          {EXPORT_FORMATS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFormat(f.value)}
              className={`btn btn-sm rounded-lg transition-all ${format === f.value ? 'btn-primary' : 'btn-ghost text-base-content/50 hover:text-base-content'}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-3">
          <textarea
            readOnly
            className="bg-base-200 border-base-300 h-64 w-full resize-none rounded-lg border p-3 font-mono text-xs leading-relaxed focus:outline-none"
            value={content}
          />
        </div>
        <div className="border-base-300 flex flex-shrink-0 items-center gap-2 border-t px-5 py-4">
          <button
            className="btn btn-ghost btn-sm gap-2"
            onClick={async () => {
              await navigator.clipboard.writeText(content);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
            {copied ? (
              <>
                <FiCheck className="size-3.5" />
                <span className="text-primary text-xs">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="size-3.5" /> Copy
              </>
            )}
          </button>
          <button
            className="btn btn-primary btn-sm ml-auto gap-2"
            onClick={() => {
              const blob = new Blob([content], { type: fmt.mime });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${tableName}.${fmt.ext}`;
              a.click();
              URL.revokeObjectURL(url);
            }}>
            <FiDownload className="size-3.5" /> Download .{fmt.ext}
          </button>
        </div>
      </div>
    </div>
  );
};
ExportModal.displayName = 'ExportModal';
