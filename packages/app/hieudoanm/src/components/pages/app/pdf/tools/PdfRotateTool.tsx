'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { rotatePDF, downloadBlob } from '../lib/pdf';

export const PdfRotateTool: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await rotatePDF(file, angle);
      downloadBlob(bytes, 'rotated.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />
      <label className="flex flex-col gap-1">
        <span className="text-sm">Angle:</span>
        <select
          className="select select-bordered"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value) as 90 | 180 | 270)}>
          <option value={90}>90° Clockwise</option>
          <option value={180}>180°</option>
          <option value={270}>270° Clockwise (90° Counter)</option>
        </select>
      </label>
      <button
        className="btn btn-primary"
        disabled={!file || loading}
        onClick={handleRotate}>
        {loading ? 'Rotating...' : 'Rotate'}
      </button>
    </div>
  );
};
