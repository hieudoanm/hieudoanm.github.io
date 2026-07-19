'use client';

import { FC, useCallback, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { extractPdfTextSimple, downloadBlob } from '../lib/pdf';
import { PdfToolConfig } from '../config';

export const PdfToFormatTool: FC<{ config: PdfToolConfig }> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setLoading(true);
    try {
      const data = await f.arrayBuffer();
      setText(extractPdfTextSimple(data));
    } catch {
      setText('Could not extract text.');
    } finally {
      setLoading(false);
    }
  }, []);

  const download = useCallback(() => {
    const ext = config.outputExt || 'txt';
    let content = text;
    if (ext === 'csv') {
      content = text
        .split('\n')
        .map((l) =>
          l
            .split(/\s{2,}|,/)
            .map((c) => `"${c.trim()}"`)
            .join(',')
        )
        .join('\n');
    } else {
      content = `<!DOCTYPE html><html><head><title>${file?.name?.replace(/\.pdf$/i, '') || 'output'}</title></head><body>${text
        .split('\n')
        .filter((l) => l.trim())
        .map((l) => `<p>${l}</p>`)
        .join('\n')}</body></html>`;
    }
    const blob = new Blob([content], { type: config.mimeType || 'text/plain' });
    downloadBlob(
      blob,
      `${file?.name?.replace(/\.pdf$/i, '') || 'output'}.${ext}`
    );
  }, [text, file, config]);

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">{config.description}</p>
        <Dropzone accept={config.accept || '.pdf'} onFile={handleFile} />
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
              onClick={download}
              className="btn btn-primary btn-sm self-center">
              {config.downloadLabel || 'Download'}
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Best-effort text extraction. Full {config.outputFormat || 'output'}{' '}
          requires server-side processing.
        </p>
      </div>
    </div>
  );
};
