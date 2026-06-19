import { FC, useState } from 'react';

import { EXPORT_FORMATS } from '../constants';
import { IcoCheck, IcoCopy, IcoDownload, IcoX } from '../icons';
import { CellVal, ExportFormat } from '../types';
import { formatNumber, getExportContent } from '../utils/sqlExport';

type ExportModalProps = {
  tableName: string;
  columns: string[];
  rows: CellVal[][];
  onClose: () => void;
};

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
            <span className="text-base-content font-bold tracking-tight">
              Export <span className="text-primary font-mono">{tableName}</span>
            </span>
            <span className="text-base-content/30 font-mono text-xs">
              {formatNumber(rows.length)} rows · {columns.length} cols
            </span>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <IcoX />
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
                <IcoCheck />
                <span className="text-success text-xs">Copied!</span>
              </>
            ) : (
              <>
                <IcoCopy /> Copy
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
            <IcoDownload /> Download .{fmt.ext}
          </button>
        </div>
      </div>
    </div>
  );
};
