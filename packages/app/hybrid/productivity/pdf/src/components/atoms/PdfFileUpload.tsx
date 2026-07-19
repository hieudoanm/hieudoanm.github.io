'use client';

import { type FC, useCallback, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface PdfFileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFile: (file: File) => void;
}

export const PdfFileUpload: FC<PdfFileUploadProps> = ({
  accept = '.pdf',
  multiple = false,
  onFile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (f: File) => {
      onFile(f);
    },
    [onFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      for (const f of files) handleFile(f);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      for (const f of Array.from(files)) handleFile(f);
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleFile]
  );

  return (
    <div
      className={`border-base-300 hover:bg-base-200 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-sm transition-colors ${
        dragging ? 'border-primary bg-primary/5' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
      }}>
      <FiUpload className="text-base-content/40 size-6" />
      <span className="text-base-content/60">
        Drop files here or click to browse
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
