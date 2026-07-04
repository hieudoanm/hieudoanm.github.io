'use client';

import { FC, useState, useCallback } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const CreateTextToPdfModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
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
    <FullScreen centered onClose={onClose} title="Text to PDF">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </FullScreen>
  );
};
CreateTextToPdfModal.displayName = 'CreateTextToPdfModal';
