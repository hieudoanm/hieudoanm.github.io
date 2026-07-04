'use client';

import { FC, useCallback, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from '../lib/pdf';
import { PdfToolConfig } from '../config';

export const EbookConvertTool: FC<{ config: PdfToolConfig }> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('medium');
  const inputExt = config.inputExt || '.epub';
  const outputExt = config.outputExt || '.epub';

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  const handleDownload = useCallback(() => {
    if (!file) return;
    downloadBlob(
      file,
      file.name.replace(new RegExp(`${inputExt}$`, 'i'), outputExt)
    );
  }, [file, inputExt, outputExt]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{config.description}</p>
      <Dropzone accept={config.accept || '.epub'} onFile={handleFile} />
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
        Download {outputExt.replace('.', '').toUpperCase()}
      </button>
      <p className="text-base-content/40 text-[10px]">
        Format conversion requires server-side processing
        (calibre/ebook-convert).
      </p>
    </div>
  );
};
