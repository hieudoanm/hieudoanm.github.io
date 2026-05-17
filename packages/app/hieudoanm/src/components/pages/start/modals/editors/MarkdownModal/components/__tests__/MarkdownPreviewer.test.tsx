import { render, screen } from '@testing-library/react';
import { MarkdownPreviewer } from '../MarkdownPreviewer';

describe('MarkdownPreviewer', () => {
  it('renders sanitized HTML', async () => {
    render(<MarkdownPreviewer html="<p>Hello</p>" fontClassName="" />);
    await screen.findByText('Hello');
  });

  it('renders with font class name', () => {
    const { container } = render(
      <MarkdownPreviewer html="<p>Hi</p>" fontClassName="font-serif" />
    );
    expect(container.firstChild).toHaveClass('font-serif');
  });

  it('sanitizes dangerous HTML', () => {
    render(
      <MarkdownPreviewer
        html='<img src=x onerror="alert(1)">'
        fontClassName=""
      />
    );
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('onerror');
  });

  it('renders empty string safely', () => {
    render(<MarkdownPreviewer html="" fontClassName="" />);
    expect(document.querySelector('.markdown-body')).toBeInTheDocument();
  });
});
