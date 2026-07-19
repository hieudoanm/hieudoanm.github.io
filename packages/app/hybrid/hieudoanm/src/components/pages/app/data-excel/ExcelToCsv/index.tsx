'use client';

import { FC, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, toCSV, readFile } from './utils';

export const ExcelToCsv: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (file: File) => {
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
    <FullScreen centered onClose={onClose} title="Excel to CSV">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept=".xlsx,.xls" onFile={handleConvert} />
          {loading && <span className="loading loading-spinner" />}
          {error && <p className="text-base-content/60 text-sm">{error}</p>}
        </div>
      </div>
    </FullScreen>
  );
};
ExcelToCsv.displayName = 'ExcelToCsv';
