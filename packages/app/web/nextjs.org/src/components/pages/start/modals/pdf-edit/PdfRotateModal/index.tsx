'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { rotatePDF, downloadBlob } from '../../pdf-misc/utils/pdf';

export const PdfRotateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <ModalWrapper onClose={onClose} title="Rotate PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <label className="flex flex-col gap-1">
          <span className="text-sm">Angle:</span>
          <select
            className="select select-bordered"
            value={angle}
            onChange={(e) =>
              setAngle(Number(e.target.value) as 90 | 180 | 270)
            }>
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
    </ModalWrapper>
  );
};
PdfRotateModal.displayName = 'PdfRotateModal';
