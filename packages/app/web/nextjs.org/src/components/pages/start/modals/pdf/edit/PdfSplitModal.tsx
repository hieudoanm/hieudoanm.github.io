'use client';

import { FC, useState, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { splitPDF, downloadBlob } from '../utils/pdf';

export const PdfSplitModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const splitInputRef = useRef<HTMLInputElement>(null);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [splitFileCount, setSplitFileCount] = useState(0);

  const handleSplit = async () => {
    if (!splitFile) return;
    setLoading(true);
    try {
      const results = await splitPDF(splitFile, pageRange || undefined);
      setSplitFileCount(results.length);
      for (let i = 0; i < results.length; i++) {
        downloadBlob(results[i], `page_${i + 1}.pdf`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose} title="Split PDF" size="max-w-2xl">
      <div className="flex flex-col gap-4">
        <input
          ref={splitInputRef}
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => setSplitFile(e.target.files?.[0] ?? null)}
        />
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
          disabled={!splitFile || loading}
          onClick={handleSplit}>
          {loading
            ? 'Splitting...'
            : splitFileCount > 0
              ? `Split into ${splitFileCount} files`
              : 'Split'}
        </button>
      </div>
    </ModalWrapper>
  );
};
PdfSplitModal.displayName = 'PdfSplitModal';
