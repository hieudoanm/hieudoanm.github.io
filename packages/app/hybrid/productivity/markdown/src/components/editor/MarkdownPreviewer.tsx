'use client';

import { FC, RefObject } from 'react';
import 'github-markdown-css/github-markdown-dark.css';
import { TbLoader2 } from 'react-icons/tb';

interface MarkdownPreviewerProps {
  html: string;
  isRendering: boolean;
  previewRef: RefObject<HTMLDivElement | null>;
  visible: boolean;
}

export const MarkdownPreviewer: FC<MarkdownPreviewerProps> = ({
  html,
  isRendering,
  previewRef,
  visible,
}) => (
  <div
    ref={previewRef}
    className={`markdown-body h-full min-h-0 overflow-y-auto p-6 ${
      visible ? '' : 'hidden'
    }`}
    aria-label="Markdown preview">
    {isRendering ? (
      <div className="text-base-content/40 flex h-full items-center justify-center gap-2">
        <TbLoader2 className="animate-spin" size={20} />
        <span className="text-sm">Rendering…</span>
      </div>
    ) : (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        data-testid="markdown-preview"
      />
    )}
  </div>
);
