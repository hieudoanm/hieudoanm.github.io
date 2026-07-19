import { render, screen } from '@testing-library/react';
import { ArrowLink } from '../ArrowLink';

describe('ArrowLink', () => {
  it('renders the label with the href', () => {
    render(<ArrowLink label="Read more" href="/blog/post" />);
    const link = screen.getByRole('link', { name: 'Read more' });
    expect(link).toHaveAttribute('href', '/blog/post');
  });

  it('applies the link-primary class', () => {
    render(<ArrowLink label="See docs" href="/docs" />);
    expect(screen.getByRole('link', { name: 'See docs' })).toHaveClass(
      'link-primary'
    );
  });
});
