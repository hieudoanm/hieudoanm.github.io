'use client';

import { FC, useState, useCallback } from 'react';

export const CreateUrlToPdfTool: FC = () => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUrl = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('Failed to fetch URL');
      const text = await res.text();
      setContent(text);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [url]);

  const printPdf = useCallback(() => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(
      `<!DOCTYPE html><html><head><style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;max-width:700px;margin:auto}</style></head><body><h1>Content from ${url}</h1>${content}</body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  }, [content, url]);

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Fetch a URL and create a printable PDF.</p>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input input-bordered input-sm flex-1"
          />
          <button
            onClick={fetchUrl}
            disabled={loading || !url}
            className="btn btn-primary btn-sm">
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {content && (
          <>
            <textarea
              readOnly
              value={content}
              className="textarea textarea-bordered h-40 resize-none text-xs"
            />
            <button
              onClick={printPdf}
              className="btn btn-primary btn-sm self-center">
              Print as PDF
            </button>
          </>
        )}
        <p className="text-base-content/40 text-[10px]">
          Requires a fetch API proxy. Uses browser print dialog.
        </p>
      </div>
    </div>
  );
};
