import { renderHook } from '@testing-library/react';
import { useMarkdownRender } from '../useMarkdownRender';

jest.mock('../../utils/markedUtils', () => ({
  renderMarkdown: jest.fn((md: string) => Promise.resolve(`<p>${md}</p>`)),
}));

describe('useMarkdownRender', () => {
  it('calls onHtml with rendered markdown', async () => {
    const onHtml = jest.fn();
    renderHook(() => useMarkdownRender('# Hello', onHtml));

    await new Promise(process.nextTick);
    expect(onHtml).toHaveBeenCalledWith('<p># Hello</p>');
  });

  it('re-renders when markdown changes', async () => {
    const onHtml = jest.fn();
    const { rerender } = renderHook(({ md }) => useMarkdownRender(md, onHtml), {
      initialProps: { md: 'first' },
    });

    await new Promise(process.nextTick);
    expect(onHtml).toHaveBeenCalledWith('<p>first</p>');

    onHtml.mockClear();
    rerender({ md: 'second' });

    await new Promise(process.nextTick);
    expect(onHtml).toHaveBeenCalledWith('<p>second</p>');
  });
});
