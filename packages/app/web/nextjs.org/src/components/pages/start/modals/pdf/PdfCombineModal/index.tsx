'use client';

import { FC, useState, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { mergePDFs, splitPDF, downloadBlob } from '../utils/pdf';

type Tab = 'merge' | 'split';

export const PdfCombineModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const mergeInputRef = useRef<HTMLInputElement>(null);
  const splitInputRef = useRef<HTMLInputElement>(null);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [splitFileCount, setSplitFileCount] = useState(0);

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

  const handleSplit = async () => {
    if (!splitFile) return;
    setLoading(true);
    try {
      const results = await splitPDF(splitFile, pageRange || undefined);
      setSplitFileCount(results.length);
      for (let i = 0; i < results.length; i++) {
        downloadBlob(results[i], `page_${i + 1}.pdf`);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <ModalWrapper onClose={onClose} title="PDF Combine" size="max-w-2xl">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'merge' ? 'tab-active' : ''}`}
          onClick={() => setTab('merge')}>
          Merge
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'split' ? 'tab-active' : ''}`}
          onClick={() => setTab('split')}>
          Split
        </button>
      </div>

      {tab === 'merge' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              ref={mergeInputRef}
              type="file"
              accept=".pdf"
              multiple
              className="file-input file-input-bordered flex-1"
              onChange={(e) => {
                const selected = Array.from(e.target.files ?? []);
                setFiles((prev) => [...prev, ...selected]);
              }}
            />
          </div>
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
      )}

      {tab === 'split' && (
        <div className="flex flex-col gap-4">
          <input
            ref={splitInputRef}
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={(e) => setSplitFile(e.target.files?.[0] ?? null)}
          />
          <label className="flex flex-col gap-1">
            <span className="text-sm">
              Page range (e.g. 1,3-5, leave empty for all pages):
            </span>
            <input
              type="text"
              className="input input-bordered"
              placeholder="1,3-5"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary"
            disabled={!splitFile || loading}
            onClick={handleSplit}>
            {loading
              ? 'Splitting...'
              : splitFileCount > 0
                ? `Split into ${splitFileCount} files`
                : 'Split'}
          </button>
        </div>
      )}
    </ModalWrapper>
  );
};
PdfCombineModal.displayName = 'PdfCombineModal';
