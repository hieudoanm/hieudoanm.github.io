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

const readFileAsText = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsText(file);
  });

export const CsvToExcelModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const XLSX = await import('xlsx');
      const text = await readFileAsText(file);
      const rows = parseCSV(text);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([out]), file.name.replace('.csv', '.xlsx'));
    } catch (err) {
      console.error(err);
      setError('Failed to convert CSV to Excel.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="CSV to Excel" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv"
          className="file-input file-input-bordered"
          onChange={handleConvert}
        />
        {loading && <span className="loading loading-spinner" />}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </ModalWrapper>
  );
};
CsvToExcelModal.displayName = 'CsvToExcelModal';
