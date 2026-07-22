'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { addWatermark, downloadBlob } from '../lib/pdf';

export const PdfWatermarkTool: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [watermarkText, setWatermarkText] = useState('');

  const handleWatermark = async () => {
    if (!file || !watermarkText) return;
    setLoading(true);
    try {
      const bytes = await addWatermark(file, watermarkText);
      downloadBlob(bytes, 'watermarked.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />
      <label className="flex flex-col gap-1">
        <span className="text-sm">Watermark text:</span>
        <input
          type="text"
          className="input input-bordered"
          placeholder="DRAFT"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
        />
      </label>
      <button
        className="btn btn-primary"
        disabled={!file || !watermarkText || loading}
        onClick={handleWatermark}>
        {loading ? 'Adding...' : 'Add Watermark'}
      </button>
    </div>
  );
};
