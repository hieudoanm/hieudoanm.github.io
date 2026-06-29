'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, parseCSV, toCSV, readFileAsText } from './utils';

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
