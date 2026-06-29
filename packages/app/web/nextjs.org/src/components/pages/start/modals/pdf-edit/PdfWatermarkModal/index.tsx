'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { addWatermark, downloadBlob } from '../../pdf-misc/utils/pdf';

export const PdfWatermarkModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <ModalWrapper onClose={onClose} title="Watermark PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
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
    </ModalWrapper>
  );
};
PdfWatermarkModal.displayName = 'PdfWatermarkModal';
