'use client';

import { FC, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { mergePDFs, downloadBlob } from '../../pdf-misc/utils/pdf';

export const PdfMergeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMergeFiles = async () => {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const bytes = await mergePDFs(files);
      downloadBlob(bytes, 'merged.pdf');
    } finally {
      setLoading(false);
    }
  };

  const moveFile = (from: number, to: number) => {
    const next = [...files];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setFiles(next);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <ModalWrapper onClose={onClose} title="Merge PDFs" size="max-w-2xl">
      <div className="flex flex-col gap-4">
        <Dropzone
          accept=".pdf"
          multiple
          onFile={(f) => setFiles((prev) => [...prev, f])}
        />
        {files.length > 0 && (
          <ul className="flex flex-col gap-1">
            {files.map((f, i) => (
              <li
                key={i}
                className="bg-base-200 flex items-center gap-2 rounded px-3 py-2 text-sm">
                <button
                  className="btn btn-ghost btn-xs"
                  disabled={i === 0}
                  onClick={() => moveFile(i, i - 1)}>
                  ↑
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  disabled={i === files.length - 1}
                  onClick={() => moveFile(i, i + 1)}>
                  ↓
                </button>
                <span className="flex-1 truncate">{f.name}</span>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={() => removeFile(i)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn btn-primary"
          disabled={files.length < 2 || loading}
          onClick={handleMergeFiles}>
          {loading ? 'Merging...' : `Merge ${files.length} files`}
        </button>
      </div>
    </ModalWrapper>
  );
};
PdfMergeModal.displayName = 'PdfMergeModal';
