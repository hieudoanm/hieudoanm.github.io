'use client';

import { type FC, useCallback, useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface FileDropzoneProps {
  accept?: string;
  onFile: (file: File) => void;
  label?: string;
  disabled?: boolean;
}

export const FileDropzone: FC<FileDropzoneProps> = ({
  accept,
  onFile,
  label,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];
      setFileName(file.name);
      onFile(file);
    },
    [onFile]
  );

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        data-testid="file-dropzone-input"
      />
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            inputRef.current?.click();
          }
        }}
        className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm transition-colors ${
          disabled
            ? 'cursor-not-allowed opacity-40'
            : dragging
              ? 'border-primary bg-primary/10'
              : 'border-base-300 hover:border-base-content/50'
        }`}>
        <FiUploadCloud className="size-6 opacity-60" />
        <span className="opacity-60">
          {label ?? 'Drop a file here or click to browse'}
        </span>
        {fileName && <span className="text-xs opacity-40">{fileName}</span>}
      </div>
    </>
  );
};
