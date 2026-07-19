'use client';

import { FC, useCallback, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { PdfToolConfig } from '../config';

export const PdfPlaceholderTool: FC<{ config: PdfToolConfig }> = ({
  config,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{config.description}</p>
      <Dropzone accept={config.accept} onFile={handleFile} />
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
        Requires server-side processing (pandoc, calibre, or LibreOffice).
      </p>
    </div>
  );
};
