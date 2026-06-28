'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { PDFDocument } from 'pdf-lib';

function parsePageRange(range: string, total: number): number[] {
  if (!range.trim()) return Array.from({ length: total }, (_, i) => i);
  const selected = new Set<number>();
  for (const part of range.split(',')) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [s, e] = trimmed.split('-').map(Number);
      for (let i = s; i <= Math.min(e, total); i++) selected.add(i - 1);
    } else {
      const n = Number(trimmed);
      if (n > 0 && n <= total) selected.add(n - 1);
    }
  }
  return [...selected].sort((a, b) => a - b);
}

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const PdfDeletePagesModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');

  const handleDelete = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const total = src.getPageCount();
      const toRemove = new Set(parsePageRange(pageRange, total));
      const keep = Array.from({ length: total }, (_, i) => i).filter(
        (i) => !toRemove.has(i)
      );
      const pdfDoc = await PDFDocument.create();
      const pages = await pdfDoc.copyPages(src, keep);
      pages.forEach((p) => pdfDoc.addPage(p));
      const out = await pdfDoc.save();
      downloadBlob(
        new Blob([out as BlobPart], { type: 'application/pdf' }),
        'trimmed.pdf'
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Delete Pages" size="max-w-md">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
        <label className="flex flex-col gap-1">
          <span className="text-sm">Pages to delete (e.g., 1,3,5-7):</span>
          <input
            type="text"
            className="input input-bordered"
            placeholder="1,3,5-7"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
          />
        </label>
        <button
          className="btn btn-primary btn-sm"
          disabled={!file || !pageRange || loading}
          onClick={handleDelete}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Delete Pages'
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};
PdfDeletePagesModal.displayName = 'PdfDeletePagesModal';
