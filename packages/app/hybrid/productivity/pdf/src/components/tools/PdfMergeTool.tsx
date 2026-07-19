'use client';

import { FC, useState } from 'react';
import { FiMove } from 'react-icons/fi';
import { PdfFileUpload } from '@/components/atoms/PdfFileUpload';
import { mergePDFs, downloadBlob } from '@/lib/pdf-tools';

export const PdfMergeTool: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

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

  const startDrag = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
    setDragIndex(index);
  };

  const dropOn = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData('text/plain'));
    if (Number.isInteger(from) && from >= 0 && from !== index) {
      moveFile(from, index);
    }
    setDragIndex(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <PdfFileUpload
        accept=".pdf"
        multiple
        onFile={(f) => setFiles((prev) => [...prev, f])}
      />
      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((f, i) => (
            <li
              key={i}
              draggable
              onDragStart={startDrag(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={dropOn(i)}
              onDragEnd={() => setDragIndex(null)}
              className={`bg-base-200 flex items-center gap-2 rounded px-3 py-2 text-sm ${dragIndex === i ? 'opacity-50' : ''}`}>
              <FiMove className="text-base-content/40 size-3 cursor-grab" />
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
                className="btn btn-ghost btn-xs text-base-content/60"
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
  );
};
