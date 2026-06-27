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

const readFile = (file: File): Promise<ArrayBuffer> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as ArrayBuffer);
    r.onerror = () => rej(r.error);
    r.readAsArrayBuffer(file);
  });

export const ExcelToCsvModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const XLSX = await import('xlsx');
      const buf = await readFile(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
        header: 1,
      }) as string[][];
      const csv = toCSV(rows);
      downloadBlob(
        new Blob([csv], { type: 'text/csv' }),
        file.name.replace(/\.\w+$/, '.csv')
      );
    } catch (err) {
      console.error(err);
      setError('Failed to convert Excel to CSV.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Excel to CSV" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          className="file-input file-input-bordered"
          onChange={handleConvert}
        />
        {loading && <span className="loading loading-spinner" />}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </ModalWrapper>
  );
};
ExcelToCsvModal.displayName = 'ExcelToCsvModal';
