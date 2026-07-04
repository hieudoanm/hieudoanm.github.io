'use client';

import { FC, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, parseCSV, readFileAsText } from './utils';

export const CsvToExcelModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (file: File) => {
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
    <FullScreen centered onClose={onClose} title="CSV to Excel">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept=".csv" onFile={handleConvert} />
          {loading && <span className="loading loading-spinner" />}
          {error && <p className="text-base-content/60 text-sm">{error}</p>}
        </div>
      </div>
    </FullScreen>
  );
};
CsvToExcelModal.displayName = 'CsvToExcelModal';
