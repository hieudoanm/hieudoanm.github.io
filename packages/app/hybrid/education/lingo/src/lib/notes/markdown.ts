import { Marked } from 'marked';

const markdown = new Marked({ gfm: true, breaks: false, async: false });

export const renderMarkdown = (source: string): string =>
  markdown.parse(source) as string;
