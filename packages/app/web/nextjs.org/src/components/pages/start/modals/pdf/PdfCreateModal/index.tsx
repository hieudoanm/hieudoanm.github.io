'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

type Tab = 'text-to-pdf' | 'url-to-pdf' | 'md-to-pdf';

const TAB_LABELS: Record<Tab, string> = {
  'text-to-pdf': 'Text to PDF',
  'url-to-pdf': 'URL to PDF',
  'md-to-pdf': 'Markdown to PDF',
};

const CLI_INFO: Partial<Record<Tab, { cmd: string; note: string }>> = {
  'url-to-pdf': {
    cmd: 'hieudoanm web simplify md <url> | hieudoanm pdf create --file -',
    note: 'Fetches URL content, converts to PDF via CLI.',
  },
  'md-to-pdf': {
    cmd: 'hieudoanm pdf create --markdown input.md',
    note: 'Converts Markdown file to PDF via CLI.',
  },
};

export const PdfCreateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('text-to-pdf');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextToPDF = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const lines = text.split('\n');
      let page = pdfDoc.addPage([612, 792]);
      let y = 750;
      const margin = 50;
      const fontSize = 11;

      for (const line of lines) {
        if (y < 50) {
          page = pdfDoc.addPage([612, 792]);
          y = 750;
        }
        const isBold = line.startsWith('#');
        const displayLine = line.replace(/^#{1,6}\s*/, '');
        const f = isBold ? boldFont : font;
        const fs = isBold ? 14 : fontSize;
        page.drawText(displayLine || ' ', {
          x: margin,
          y,
          size: fs,
          font: f,
          color: rgb(0, 0, 0),
        });
        y -= isBold ? 24 : 18;
      }

      const out = await pdfDoc.save();
      const blob = new Blob([out as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [text]);

  return (
    <ModalWrapper onClose={onClose} title="Create PDF" size="max-w-lg">
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
        {tab === 'text-to-pdf' && (
          <>
            <textarea
              className="textarea textarea-bordered min-h-[200px] font-mono text-sm"
              placeholder="Type or paste your text here. Lines starting with # are rendered as headings..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              disabled={!text.trim() || loading}
              onClick={handleTextToPDF}>
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Create PDF'
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
