'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { extractPdfText } from './utils';

export const PdfToExcelModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
      setText('Could not extract text. Try a different PDF.');
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadCsv = useCallback(() => {
    const rows = text.split('\n').map((l) =>
      l
        .split(/\s{2,}|,/)
        .map((c) => `"${c.trim()}"`)
        .join(',')
    );
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.pdf$/i, '') || 'output') + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [text, file]);

  return (
    <ModalWrapper onClose={onClose} title="PDF to Excel" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract text from PDF and download as CSV.</p>
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
              onClick={downloadCsv}
              className="btn btn-primary btn-sm self-center">
              Download CSV
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Best-effort text extraction; CSV output may need cleanup.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToExcelModal.displayName = 'PdfToExcelModal';
