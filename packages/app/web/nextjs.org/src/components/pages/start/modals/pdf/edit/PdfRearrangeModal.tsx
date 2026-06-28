'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { PDFDocument } from 'pdf-lib';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const PdfRearrangeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);

  const loadPDF = useCallback(async (f: File) => {
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    setOrder(Array.from({ length: pdfDoc.getPageCount() }, (_, i) => i));
  }, []);

  const movePage = (from: number, to: number) => {
    const next = [...order];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
  };

  const handleRearrange = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const pdfDoc = await PDFDocument.create();
      const pages = await pdfDoc.copyPages(src, order);
      pages.forEach((p) => pdfDoc.addPage(p));
      const out = await pdfDoc.save();
      downloadBlob(
        new Blob([out as BlobPart], { type: 'application/pdf' }),
        'rearranged.pdf'
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Rearrange Pages" size="max-w-xl">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) await loadPDF(f);
          }}
        />

        {order.length > 0 && (
          <>
            <p className="text-sm">
              {order.length} pages — drag to reorder (↑↓ buttons):
            </p>
            <ul className="flex max-h-60 flex-col gap-1 overflow-y-auto">
              {order.map((pageNum, i) => (
                <li
                  key={i}
                  className="bg-base-200 flex items-center gap-2 rounded px-3 py-1 text-sm">
                  <button
                    className="btn btn-ghost btn-xs"
                    disabled={i === 0}
                    onClick={() => movePage(i, i - 1)}>
                    ↑
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    disabled={i === order.length - 1}
                    onClick={() => movePage(i, i + 1)}>
                    ↓
                  </button>
                  <span>Page {pageNum + 1}</span>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={handleRearrange}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Save Rearranged PDF'
              )}
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
PdfRearrangeModal.displayName = 'PdfRearrangeModal';
