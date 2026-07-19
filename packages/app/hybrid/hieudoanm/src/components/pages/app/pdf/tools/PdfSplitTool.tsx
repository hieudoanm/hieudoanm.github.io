'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { splitPDF, downloadBlob } from '../lib/pdf';

export const PdfSplitTool: FC = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [splitCount, setSplitCount] = useState(0);

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const results = await splitPDF(file, pageRange || undefined);
      setSplitCount(results.length);
      for (let i = 0; i < results.length; i++) {
        downloadBlob(results[i], `page_${i + 1}.pdf`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Page range (e.g. 1,3-5, leave empty for all pages):
        </span>
        <input
          type="text"
          className="input input-bordered"
          placeholder="1,3-5"
          value={pageRange}
          onChange={(e) => setPageRange(e.target.value)}
        />
      </label>
      <button
        className="btn btn-primary"
        disabled={!file || loading}
        onClick={handleSplit}>
        {loading
          ? 'Splitting...'
          : splitCount > 0
            ? `Split into ${splitCount} files`
            : 'Split'}
      </button>
    </div>
  );
};
