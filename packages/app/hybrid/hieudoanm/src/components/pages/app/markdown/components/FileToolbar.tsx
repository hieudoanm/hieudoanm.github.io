'use client';

import { ChangeEvent, FC, memo, RefObject } from 'react';

interface FileToolbarProps {
  fileName: string;
  loading: boolean;
  ocrLoading: boolean;
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
  onCopyMarkdown: () => void;
  onCopyHTML: () => void;
  onExportHTML: () => void;
  onDownloadPdf: () => void;
  onOcrFile: (e: ChangeEvent<HTMLInputElement>) => void;
  ocrInputRef: RefObject<HTMLInputElement | null>;
}

export const FileToolbar: FC<FileToolbarProps> = memo(
  ({
    fileName,
    loading,
    ocrLoading,
    onNew,
    onOpen,
    onSave,
    onCopyMarkdown,
    onCopyHTML,
    onExportHTML,
    onDownloadPdf,
    onOcrFile,
    ocrInputRef,
  }) => (
    <div className="border-base-300 flex flex-wrap items-center gap-1 border-b px-3 py-1.5">
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onNew}
        title="New document">
        New
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onOpen}
        title="Open .md file">
        Open
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onSave}
        title="Save as .md">
        Save
      </button>
      <div className="border-base-300 mx-1 h-4 w-px border-l" />
      <span
        className="text-base-content/60 max-w-40 truncate font-mono text-xs"
        title={fileName}>
        {fileName}
      </span>
      <div className="border-base-300 mx-1 h-4 w-px border-l" />
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onCopyMarkdown}
        title="Copy Markdown to clipboard">
        Copy MD
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onCopyHTML}
        title="Copy HTML to clipboard">
        Copy HTML
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={onExportHTML}
        title="Export as HTML file">
        HTML
      </button>
      <div className="border-base-300 mx-1 h-4 w-px border-l" />
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        disabled={loading || ocrLoading}
        onClick={onDownloadPdf}
        title="Download as PDF">
        {loading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          'PDF'
        )}
      </button>
      <label
        className={`btn btn-ghost btn-xs cursor-pointer ${ocrLoading ? 'btn-disabled' : ''}`}
        title="Extract text from image (OCR)">
        <span>{ocrLoading ? 'OCR...' : 'OCR'}</span>
        <input
          ref={ocrInputRef}
          type="file"
          accept="image/*"
          onChange={onOcrFile}
          className="hidden"
          disabled={ocrLoading}
        />
      </label>
    </div>
  )
);
FileToolbar.displayName = 'FileToolbar';
