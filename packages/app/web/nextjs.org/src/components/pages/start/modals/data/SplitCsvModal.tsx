'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') {
        current.push(field);
        field = '';
      } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        current.push(field);
        field = '';
        if (current.length > 0 && current.some((c) => c)) rows.push(current);
        current = [];
        if (ch === '\r') i++;
      } else if (ch === '\r') {
        current.push(field);
        field = '';
        if (current.length > 0 && current.some((c) => c)) rows.push(current);
        current = [];
      } else field += ch;
    }
  }
  current.push(field);
  if (current.length > 0 && current.some((c) => c)) rows.push(current);
  return rows;
}

function toCSV(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((f) =>
          f.includes(',') || f.includes('"') || f.includes('\n')
            ? `"${f.replace(/"/g, '""')}"`
            : f
        )
        .join(',')
    )
    .join('\n');
}

const readFileAsText = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsText(file);
  });

export const SplitCsvModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [rowsPerFile, setRowsPerFile] = useState(100);
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSplit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    setFileCount(0);
    try {
      const text = await readFileAsText(file);
      const rows = parseCSV(text);
      if (rows.length < 2) {
        setLoading(false);
        return;
      }
      const header = rows[0];
      const dataRows = rows.slice(1);
      let count = 0;
      for (let i = 0; i < dataRows.length; i += rowsPerFile) {
        const chunk = [header, ...dataRows.slice(i, i + rowsPerFile)];
        const csv = toCSV(chunk);
        downloadBlob(
          new Blob([csv], { type: 'text/csv' }),
          `${file.name.replace('.csv', '')}_part${Math.floor(i / rowsPerFile) + 1}.csv`
        );
        count++;
      }
      setFileCount(count);
    } catch (err) {
      console.error(err);
      setError('Failed to split CSV file.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Split CSV" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Rows per file:</span>
          <input
            type="number"
            className="input input-bordered"
            min={1}
            value={rowsPerFile}
            onChange={(e) =>
              setRowsPerFile(Math.max(1, Number(e.target.value)))
            }
          />
        </label>
        <input
          type="file"
          accept=".csv"
          className="file-input file-input-bordered"
          onChange={handleSplit}
        />
        {loading && <span className="loading loading-spinner" />}
        {error && <p className="text-error text-sm">{error}</p>}
        {fileCount > 0 && (
          <p className="text-sm">Split into {fileCount} files.</p>
        )}
      </div>
    </ModalWrapper>
  );
};
SplitCsvModal.displayName = 'SplitCsvModal';
