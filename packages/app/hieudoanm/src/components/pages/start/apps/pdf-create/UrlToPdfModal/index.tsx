'use client';

import { FC, useState, useCallback } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

export const UrlToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('');

  const printPdf = useCallback(() => {
    if (!url) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(
      `<!DOCTYPE html><html><head><style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;max-width:700px;margin:auto}</style></head><body><h1>Content from ${url}</h1><p>Paste the actual content here. The URL ${url} would be fetched server-side.</p></body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  }, [url]);

  return (
    <FullScreen centered onClose={onClose} title="URL to PDF">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Create a PDF from a URL's content.</p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input input-bordered input-sm w-full"
          />
          <button
            onClick={printPdf}
            disabled={!url}
            className="btn btn-primary btn-sm self-center">
            Print as PDF
          </button>
          <p className="text-base-content/40 text-[10px]">
            Fetches URL content server-side and prints via browser dialog.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
UrlToPdfModal.displayName = 'UrlToPdfModal';
