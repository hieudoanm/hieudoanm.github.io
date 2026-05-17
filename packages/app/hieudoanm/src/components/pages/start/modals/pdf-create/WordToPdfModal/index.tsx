'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';

export const WordToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Word to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert Word documents to PDF.</p>
        <Dropzone accept=".doc,.docx" onFile={handleFile} />
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
          Requires server-side processing (pandoc with PDF engine).
        </p>
      </div>
    </ModalWrapper>
  );
};
WordToPdfModal.displayName = 'WordToPdfModal';
