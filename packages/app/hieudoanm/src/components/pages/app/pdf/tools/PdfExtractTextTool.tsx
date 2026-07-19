'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { extractText, downloadBlob } from '../lib/pdf';

export const PdfExtractTextTool: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await extractText(file);
      setText(result);
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    downloadBlob(blob, `${file?.name ?? 'extracted'}.txt`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept=".pdf"
        onFile={(f) => {
          setFile(f);
          setText('');
        }}
      />
      {file && (
        <>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleExtractText}>
            {loading ? 'Extracting...' : 'Extract Text'}
          </button>
          {text && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm" onClick={copyText}>
                  Copy
                </button>
                <button className="btn btn-ghost btn-sm" onClick={downloadText}>
                  Download
                </button>
              </div>
              <pre className="bg-base-200 max-h-96 overflow-auto rounded p-4 text-sm whitespace-pre-wrap">
                {text}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};
