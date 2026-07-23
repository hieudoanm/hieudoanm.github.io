import { marked } from 'marked';

export const renderMarkdown = async (md: string): Promise<string> => {
  try {
    return await marked(md);
  } catch {
    return '';
  }
};
