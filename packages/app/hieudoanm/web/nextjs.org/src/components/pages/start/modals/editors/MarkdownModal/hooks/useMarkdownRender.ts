import { useEffect } from 'react';

import { renderMarkdown } from '../utils/markedUtils';

export const useMarkdownRender = (
  markdown: string,
  onHtml: (html: string) => void
) => {
  useEffect(() => {
    const run = async () => {
      const html = await renderMarkdown(markdown);
      onHtml(html);
    };
    run();
  }, [markdown]); // eslint-disable-line react-hooks/exhaustive-deps
};
