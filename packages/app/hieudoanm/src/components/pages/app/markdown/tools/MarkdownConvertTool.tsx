'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { MarkdownToolConfig } from '../config';
import { marked } from 'marked';
import { saveAs } from 'file-saver';

const INITIAL_MD = '# Hello\n\nType your markdown here...';

export const MarkdownConvertTool: FC<{ config: MarkdownToolConfig }> = ({
  config,
}) => {
  const [markdown, setMarkdown] = useState(INITIAL_MD);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const h = await marked(markdown);
      setHtml(h);
    };
    run();
  }, [markdown]);

  const handleDownloadHtml = useCallback(() => {
    const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Converted from Markdown</title><style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#333}pre{background:#f5f5f5;padding:16px;border-radius:4px;overflow-x:auto}code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:16px;color:#666}</style></head><body>${html}</body></html>`;
    saveAs(
      new Blob([fullHtml], { type: 'text/html;charset=utf-8' }),
      'output.html'
    );
  }, [html]);

  const handleDownloadDocx = useCallback(() => {
    const styledHtml = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5}h1{font-size:18pt}h2{font-size:16pt}h3{font-size:14pt}p{margin:4pt 0}pre{font-family:Consolas,monospace;font-size:9pt;background:#f5f5f5;padding:8pt}code{font-family:Consolas,monospace;font-size:9pt}blockquote{margin-left:16pt;color:#444;font-style:italic}</style></head><body>${html}</body></html>`;
    saveAs(
      new Blob([styledHtml], { type: 'application/msword' }),
      'output.doc'
    );
  }, [html]);

  const handleDownloadImage = useCallback(async () => {
    setLoading(true);
    try {
      const { default: html2canvas } = await import('html2canvas-pro');
      const el = captureRef.current;
      if (!el) return;
      const canvas = await html2canvas(el, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  const handlePrintPdf = useCallback(() => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(
      `<!DOCTYPE html><html><head><style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;max-width:700px;margin:auto}h1{font-size:24px}h2{font-size:20px}h3{font-size:18px}code{background:#eee;padding:2px 6px;border-radius:3px}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:16px;color:#666}</style></head><body>${html}</body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  }, [html]);

  const getAction = () => {
    switch (config.id) {
      case 'markdown-to-html':
        return { label: 'Download HTML', onClick: handleDownloadHtml };
      case 'markdown-to-docx':
        return { label: 'Download Word', onClick: handleDownloadDocx };
      case 'markdown-to-image':
        return {
          label: loading ? 'Rendering...' : 'Download as PNG',
          onClick: handleDownloadImage,
          disabled: loading,
        };
      case 'markdown-to-pdf':
        return { label: 'Print as PDF', onClick: handlePrintPdf };
      default:
        return { label: 'Convert', onClick: handleDownloadHtml };
    }
  };

  const action = getAction();

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="flex flex-1 flex-col">
          <label className="mb-1 text-xs font-normal">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="textarea textarea-bordered flex-1 resize-none font-mono text-xs"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="mb-1 text-xs font-normal">Preview</label>
          <div
            ref={captureRef}
            className="border-base-300 flex-1 overflow-auto rounded border bg-white p-3 text-xs text-black"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {config.id === 'markdown-to-html' && (
          <button
            className="btn btn-outline btn-sm"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(html);
              } catch {}
            }}>
            Copy HTML
          </button>
        )}
        <button
          className="btn btn-primary btn-sm"
          onClick={action.onClick}
          disabled={'disabled' in action ? action.disabled : false}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            action.label
          )}
        </button>
      </div>
      {config.id === 'markdown-to-pdf' && (
        <p className="text-base-content/40 text-center text-[10px]">
          Uses browser print dialog to save as PDF.
        </p>
      )}
    </div>
  );
};
