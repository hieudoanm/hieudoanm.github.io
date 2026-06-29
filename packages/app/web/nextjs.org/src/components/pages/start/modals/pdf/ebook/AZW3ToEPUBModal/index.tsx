'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from '../../utils/pdf';

export const AZW3ToEPUBModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('medium');

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }, []);

  const handleDownload = useCallback(() => {
    if (!file) return;
    downloadBlob(file, file.name.replace(/\.azw3$/i, '.epub'));
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="AZW3 to EPUB" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert AZW3 ebooks to EPUB format.</p>
        <input
          type="file"
          accept=".azw3"
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
            <div className="mt-2 flex items-center gap-2">
              <label className="text-xs">Quality:</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="select select-bordered select-xs">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        )}
        <button
          onClick={handleDownload}
          disabled={!file}
          className="btn btn-primary btn-sm">
          Download EPUB
        </button>
        <p className="text-base-content/40 text-[10px]">
          Format conversion requires server-side processing
          (calibre/ebook-convert).
        </p>
      </div>
    </ModalWrapper>
  );
};
AZW3ToEPUBModal.displayName = 'AZW3ToEPUBModal';
