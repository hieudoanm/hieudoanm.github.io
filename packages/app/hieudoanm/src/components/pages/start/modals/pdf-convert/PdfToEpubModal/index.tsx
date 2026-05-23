'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { extractPdfText } from './utils';

export const PdfToEpubModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (f: File) => {
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
  }, []);

  const downloadEpub = useCallback(() => {
    const html = `<?xml version="1.0"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${file?.name?.replace(/\.pdf$/i, '') || 'Converted'}</title></head>
<body>
${text
  .split('\n')
  .filter((l) => l.trim())
  .map((l) => `<p>${l}</p>`)
  .join('\n')}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.pdf$/i, '') || 'output') + '.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [text, file]);

  return (
    <ModalWrapper onClose={onClose} title="PDF to EPUB" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Extract text from PDF and download as HTML (simplified EPUB-like
          format).
        </p>
        <Dropzone accept=".pdf" onFile={handleFile} />
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
              onClick={downloadEpub}
              className="btn btn-primary btn-sm self-center">
              Download HTML
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Text-only extraction. Full EPUB requires server-side processing.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToEpubModal.displayName = 'PdfToEpubModal';
