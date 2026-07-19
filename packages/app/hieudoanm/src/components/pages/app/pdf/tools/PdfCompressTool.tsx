'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { compressPDF, downloadBlob } from '../lib/pdf';

export const PdfCompressTool: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const formatBytes = (b: number) =>
    b > 1_000_000
      ? `${(b / 1_000_000).toFixed(1)} MB`
      : b > 1_000
        ? `${(b / 1_000).toFixed(1)} KB`
        : `${b} B`;

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setOriginalSize(file.size);
    try {
      const bytes = await compressPDF(file);
      setCompressedSize(bytes.length);
      downloadBlob(bytes, 'compressed.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />
      <button
        className="btn btn-primary"
        disabled={!file || loading}
        onClick={handleCompress}>
        {loading ? 'Compressing...' : 'Compress'}
      </button>
      {compressedSize > 0 && (
        <div className="bg-base-200 rounded p-3 text-sm">
          <p>Original: {formatBytes(originalSize)}</p>
          <p>Compressed: {formatBytes(compressedSize)}</p>
          <p>
            Ratio: {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
            reduction
          </p>
        </div>
      )}
    </div>
  );
};
