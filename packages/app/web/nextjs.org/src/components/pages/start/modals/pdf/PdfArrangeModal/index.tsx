'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { PDFDocument } from 'pdf-lib';

type Tab = 'rearrange' | 'delete' | 'crop' | 'page-numbers' | 'annotate';

const TAB_LABELS: Record<Tab, string> = {
  rearrange: 'Rearrange',
  delete: 'Delete',
  crop: 'Crop',
  'page-numbers': 'Page Numbers',
  annotate: 'Annotate',
};

const CLI_INFO: Partial<Record<Tab, { cmd: string; note: string }>> = {
  crop: {
    cmd: 'hieudoanm pdf crop input.pdf --bbox "0 0 400 600"',
    note: 'PDF cropping requires pdfcpu CLI.',
  },
  'page-numbers': {
    cmd: 'hieudoanm pdf addnumbers input.pdf --format "Page {n} of {total}"',
    note: 'Adds page numbers via pdfcpu CLI.',
  },
  annotate: {
    cmd: 'hieudoanm pdf annotate input.pdf --text "Note" --page 1 --x 100 --y 100',
    note: 'Adds text annotations via pdfcpu CLI.',
  },
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

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

export const PdfArrangeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('rearrange');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [pageRange, setPageRange] = useState('');

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
    <ModalWrapper
      onClose={onClose}
      title="PDF Arrange"
      size={tab === 'rearrange' ? 'max-w-xl' : 'max-w-md'}>
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {(tab === 'rearrange' || tab === 'delete') && (
          <input
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) await loadPDF(f);
            }}
          />
        )}

        {tab === 'rearrange' && order.length > 0 && (
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

        {tab === 'delete' && (
          <>
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
          </>
        )}

        {tab in CLI_INFO && (
          <div className="flex flex-col gap-4">
            <p className="text-sm">{TAB_LABELS[tab]}.</p>
            <div className="bg-base-200 rounded p-4">
              <p className="mb-2 text-xs font-bold">CLI Command:</p>
              <pre className="text-sm">{CLI_INFO[tab]!.cmd}</pre>
            </div>
            <p className="text-base-content/60 text-xs">
              {CLI_INFO[tab]!.note}
            </p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
PdfArrangeModal.displayName = 'PdfArrangeModal';
