'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

function extractPdfText(buffer: ArrayBuffer): string {
  const raw = new Uint8Array(buffer);
  let text = '';
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === 0x28) {
      i++;
      let str = '';
      while (i < raw.length && raw[i] !== 0x29) {
        if (raw[i] === 0x5c) {
          i++;
          if (i < raw.length) str += String.fromCharCode(raw[i++]);
        } else str += String.fromCharCode(raw[i++]);
      }
      i++;
      const rest = new TextDecoder().decode(
        raw.slice(i, Math.min(i + 3, raw.length))
      );
      if (rest.startsWith('Tj') || rest.startsWith('\\)Tj')) text += str + ' ';
    } else {
      i++;
    }
  }
  return text.trim() || 'Text extraction failed. Try a different PDF.';
}

export const PdfToWordModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      setFile(f);
      setLoading(true);
      try {
        const data = await f.arrayBuffer();
        setText(extractPdfText(data));
      } catch {
        setText('Could not extract text.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const downloadDocx = useCallback(() => {
    const content = text
      .split('\n')
      .map((l) => `<p>${l}</p>`)
      .join('\n');
    const html = `<!DOCTYPE html><html><head><title>${file?.name || 'output'}</title></head><body>${content}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.pdf$/i, '') || 'output') + '.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [text, file]);

  return (
    <ModalWrapper onClose={onClose} title="PDF to Word" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Extract text from PDF and download as a Word-like document.
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-base-content/60 text-xs">{file.name}</p>}
        {loading && <p className="text-xs">Extracting text...</p>}
        {text && (
          <>
            <textarea
              readOnly
              value={text}
              className="textarea textarea-bordered h-32 resize-none text-xs"
            />
            <button
              onClick={downloadDocx}
              className="btn btn-primary btn-sm self-center">
              Download HTML (DOCX-like)
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Best-effort text extraction. Full DOCX requires server-side
          processing.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToWordModal.displayName = 'PdfToWordModal';
