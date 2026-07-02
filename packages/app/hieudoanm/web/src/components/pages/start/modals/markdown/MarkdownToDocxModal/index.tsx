'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { marked } from 'marked';
import { saveAs } from 'file-saver';

const INITIAL_MD = '# Hello\n\nType your markdown here...';

export const MarkdownToDocxModal: FC<{ onClose: () => void }> = ({
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
    const styledHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }
    h1 { font-size: 18pt; font-weight: bold; margin-top: 12pt; }
    h2 { font-size: 16pt; font-weight: bold; margin-top: 10pt; }
    h3 { font-size: 14pt; font-weight: bold; margin-top: 8pt; }
    p { margin: 4pt 0; }
    pre { font-family: Consolas, monospace; font-size: 9pt; background: #f5f5f5; padding: 8pt; }
    code { font-family: Consolas, monospace; font-size: 9pt; }
    blockquote { margin-left: 16pt; color: #444; font-style: italic; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1pt solid #999; padding: 4pt; }
  </style>
</head>
<body>${html}</body>
</html>`;
    saveAs(
      new Blob([styledHtml], { type: 'application/msword' }),
      'output.doc'
    );
  }, [html]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown to Word"
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
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="btn btn-primary btn-sm self-center">
          Download as Word (.doc)
        </button>
      </div>
    </ModalWrapper>
  );
};
MarkdownToDocxModal.displayName = 'MarkdownToDocxModal';
