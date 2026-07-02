'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const MarkdownToPdfModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [markdown, setMarkdown] = useState(
    '# Hello\n\nType your markdown here...'
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const renderHtml = useCallback((md: string) => {
    return md
      .split('\n')
      .map((line) => {
        if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
        if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
        if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
        if (line.startsWith('1. ')) return `<li>${line.slice(3)}</li>`;
        if (line.startsWith('> '))
          return `<blockquote>${line.slice(2)}</blockquote>`;
        if (line.startsWith('```')) return '<hr/>';
        if (line === '') return '<br/>';
        return `<p>${line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`(.+?)`/g, '<code>$1</code>')}</p>`;
      })
      .join('\n');
  }, []);

  const printPdf = useCallback(() => {
    const html = renderHtml(markdown);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(
      `<!DOCTYPE html><html><head><style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;max-width:700px;margin:auto}h1{font-size:24px}h2{font-size:20px}h3{font-size:18px}code{background:#eee;padding:2px 6px;border-radius:3px}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:16px;color:#666}li{margin:4px 0}hr{border:none;border-top:1px solid #ccc}</style></head><body>${html}</body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  }, [markdown, renderHtml]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown to PDF"
      size="max-w-xl"
      fullHeight>
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
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
              ref={previewRef}
              className="border-base-300 flex-1 overflow-auto rounded border p-3 text-xs"
              dangerouslySetInnerHTML={{ __html: renderHtml(markdown) }}
            />
          </div>
        </div>
        <button
          onClick={printPdf}
          className="btn btn-primary btn-sm self-center">
          Print as PDF
        </button>
        <p className="text-base-content/40 text-center text-[10px]">
          Uses browser print dialog to save as PDF.
        </p>
      </div>
    </ModalWrapper>
  );
};
MarkdownToPdfModal.displayName = 'MarkdownToPdfModal';
