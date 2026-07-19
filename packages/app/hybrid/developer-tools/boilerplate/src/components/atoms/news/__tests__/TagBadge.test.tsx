import { render, screen } from '@testing-library/react';
import { TagBadge } from '../TagBadge';

describe('TagBadge', () => {
  it('renders the tag label with hash prefix', () => {
    render(<TagBadge label="climate" />);
    expect(screen.getByTestId('tag-badge')).toHaveTextContent('#climate');
  });

  it('applies outline badge class', () => {
    render(<TagBadge label="climate" />);
    expect(screen.getByTestId('tag-badge')).toHaveClass('badge-outline');
  });

  it('renders as a link when href provided', () => {
    render(<TagBadge label="climate" href="/tags/climate" />);
    expect(screen.getByRole('link', { name: '#climate' })).toHaveAttribute(
      'href',
      '/tags/climate'
    );
  });
});
