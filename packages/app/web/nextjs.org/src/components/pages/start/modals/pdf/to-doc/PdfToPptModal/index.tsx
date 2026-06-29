'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { extractPdfText } from './utils';

export const PdfToPptModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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

  const downloadPpt = useCallback(() => {
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
    <ModalWrapper onClose={onClose} title="PDF to PPT" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract text from PDF as slide-like content.</p>
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
              onClick={downloadPpt}
              className="btn btn-primary btn-sm self-center">
              Download HTML (PPT-like)
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Best-effort text extraction. Full PPTX requires server-side
          processing.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToPptModal.displayName = 'PdfToPptModal';
