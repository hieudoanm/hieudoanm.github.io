'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { marked } from 'marked';
import { saveAs } from 'file-saver';

const INITIAL_MD = '# Hello\n\nType your markdown here...';

export const MarkdownToHtmlModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [markdown, setMarkdown] = useState(INITIAL_MD);
  const [html, setHtml] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const h = await marked(markdown);
      setHtml(h);
    };
    run();
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted from Markdown</title>
  <style>
    body {
      font-family: Georgia, serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
      color: #333;
    }
    pre { background: #f5f5f5; padding: 16px; border-radius: 4px; overflow-x: auto; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 3px solid #ccc; margin-left: 0; padding-left: 16px; color: #666; }
    img { max-width: 100%; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>${html}</body>
</html>`;
    saveAs(
      new Blob([fullHtml], { type: 'text/html;charset=utf-8' }),
      'output.html'
    );
  }, [html]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      /* silently fail */
    }
  }, [html]);

  return (
    <FullScreen centered onClose={onClose} title="Markdown to HTML">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
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
              <label className="mb-1 text-xs font-normal">HTML Output</label>
              <div
                ref={previewRef}
                className="border-base-300 flex-1 overflow-auto rounded border p-3 text-xs"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={handleDownload} className="btn btn-primary btn-sm">
              Download HTML
            </button>
            <button onClick={handleCopy} className="btn btn-outline btn-sm">
              Copy HTML
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};
MarkdownToHtmlModal.displayName = 'MarkdownToHtmlModal';
