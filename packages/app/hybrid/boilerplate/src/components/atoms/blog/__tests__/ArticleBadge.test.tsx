import { render, screen } from '@testing-library/react';
import { ArticleBadge } from '../ArticleBadge';

describe('ArticleBadge', () => {
  it('renders children with default neutral variant', () => {
    render(<ArticleBadge>Featured</ArticleBadge>);
    expect(screen.getByText('Featured')).toHaveClass('badge', 'badge-neutral');
  });

  it('applies variant class', () => {
    render(<ArticleBadge variant="success">Done</ArticleBadge>);
    expect(screen.getByText('Done')).toHaveClass('badge-success');
  });

  it('exposes a testable data-testid', () => {
    render(<ArticleBadge>New</ArticleBadge>);
    expect(screen.getByTestId('article-badge')).toBeInTheDocument();
  });
});
