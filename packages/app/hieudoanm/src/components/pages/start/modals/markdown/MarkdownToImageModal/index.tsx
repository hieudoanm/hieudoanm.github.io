'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { marked } from 'marked';

const INITIAL_MD = '# Hello\n\nType your markdown here...';

export const MarkdownToImageModal: FC<{ onClose: () => void }> = ({
  onClose,
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

  const handleDownload = useCallback(async () => {
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

  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown to Image"
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
              ref={captureRef}
              className="border-base-300 flex-1 overflow-auto rounded border bg-white p-4 text-xs text-black"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="btn btn-primary btn-sm self-center">
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Download as PNG'
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};
MarkdownToImageModal.displayName = 'MarkdownToImageModal';
