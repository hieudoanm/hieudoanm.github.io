import { marked } from 'marked';

export const renderMarkdown = async (markdown: string): Promise<string> => {
  const html = await marked(markdown);
  return html;
};
