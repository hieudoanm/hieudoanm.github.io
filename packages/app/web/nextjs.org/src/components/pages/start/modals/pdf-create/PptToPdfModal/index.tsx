'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PptToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="PPT to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert PowerPoint presentations to PDF.</p>
        <input
          type="file"
          accept=".ppt,.pptx"
          onChange={handleFile}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && (
          <div className="bg-base-200 space-y-1 rounded p-3 text-xs">
            <p>
              <strong>File:</strong> {file.name}
            </p>
            <p>
              <strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}
        <button disabled={!file} className="btn btn-primary btn-sm">
          Convert to PDF
        </button>
        <p className="text-base-content/40 text-[10px]">
          Requires server-side processing (pandoc or LibreOffice).
        </p>
      </div>
    </ModalWrapper>
  );
};
PptToPdfModal.displayName = 'PptToPdfModal';
