'use client';

import { useEffect } from 'react';
import { marked } from 'marked';

export const useMarkdownRender = (
  markdown: string,
  onHtml: (html: string) => void
) => {
  useEffect(() => {
    const run = async () => {
      try {
        const html = await marked(markdown);
        onHtml(html);
      } catch {
        /* ignore */
      }
    };
    run();
  }, [markdown, onHtml]);
};
