'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';

export const EpubToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="EPUB to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert EPUB ebooks to PDF format.</p>
        <Dropzone accept=".epub" onFile={handleFile} />
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
          Requires server-side processing (calibre/ebook-convert).
        </p>
      </div>
    </ModalWrapper>
  );
};
EpubToPdfModal.displayName = 'EpubToPdfModal';
