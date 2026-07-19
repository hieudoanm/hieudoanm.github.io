import { render, screen } from '@testing-library/react';
import { HashtagLabel } from '../HashtagLabel';

describe('HashtagLabel', () => {
  it('renders the label with a hash prefix', () => {
    const { container } = render(<HashtagLabel label="react" />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(container).toHaveTextContent('#react');
  });

  it('renders a link when href is provided', () => {
    render(<HashtagLabel label="react" href="/tag/react" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tag/react');
  });

  it('applies size classes', () => {
    render(<HashtagLabel label="react" size="sm" />);
    expect(screen.getByTestId('hashtag-label')).toHaveClass('badge-sm');
  });
});
