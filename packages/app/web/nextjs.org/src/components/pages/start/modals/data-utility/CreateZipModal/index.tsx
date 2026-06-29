'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FileEntry, downloadBlob, createZipBlob, crc32 } from './utils';

export const CreateZipModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [zipName, setZipName] = useState('archive.zip');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || []);
      setFiles((prev) => [
        ...prev,
        ...newFiles.map((f) => ({ file: f, name: f.name })),
      ]);
      if (inputRef.current) inputRef.current.value = '';
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const createZip = useCallback(async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const blob = await createZipBlob(files);
      downloadBlob(blob, zipName);
    } catch (err) {
      alert(
        'Failed to create ZIP: ' +
          (err instanceof Error ? err.message : 'unknown error')
      );
    }
    setLoading(false);
  }, [files, zipName]);

  return (
    <ModalWrapper onClose={onClose} title="Create ZIP" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="file"
          multiple
          className="file-input file-input-bordered"
          onChange={handleAddFiles}
        />

        <label className="flex items-center gap-2 text-sm">
          <span>Archive name:</span>
          <input
            type="text"
            className="input input-bordered input-sm flex-1 font-mono text-xs"
            value={zipName}
            onChange={(e) => setZipName(e.target.value)}
          />
        </label>

        {files.length > 0 && (
          <div className="bg-base-200 max-h-40 overflow-auto rounded p-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 text-xs">
                <span className="truncate font-mono">{f.name}</span>
                <span className="text-base-content/40">
                  {(f.file.size / 1024).toFixed(1)} KB
                </span>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={() => removeFile(i)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={files.length === 0 || loading}
          onClick={createZip}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Create ZIP (${files.length} files)`
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};
CreateZipModal.displayName = 'CreateZipModal';
