jest.mock('marked', () => ({
  marked: jest.fn((md: string) => {
    if (md === '') return '';
    if (md.startsWith('# ')) return `<h1>${md.slice(2)}</h1>\n`;
    if (md.includes('**')) return '<p><strong>bold</strong></p>\n';
    return `<p>${md}</p>\n`;
  }),
}));

import { renderMarkdown } from '../markedUtils';

describe('renderMarkdown', () => {
  it('renders plain text', async () => {
    const html = await renderMarkdown('hello world');
    expect(html).toContain('hello world');
  });

  it('renders bold markdown', async () => {
    const html = await renderMarkdown('**bold**');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('renders heading', async () => {
    const html = await renderMarkdown('# Title');
    expect(html).toContain('<h1');
    expect(html).toContain('Title');
  });

  it('renders empty string', async () => {
    const html = await renderMarkdown('');
    expect(html).toBe('');
  });
});
