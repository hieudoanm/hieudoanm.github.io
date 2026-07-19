import { render, screen } from '@testing-library/react';
import { UnreadBadge } from '../UnreadBadge';

describe('UnreadBadge', () => {
  it('renders the unread count', () => {
    render(<UnreadBadge count={3} />);
    expect(screen.getByTestId('unread-badge')).toHaveTextContent('3');
  });

  it('applies error badge class', () => {
    render(<UnreadBadge count={3} />);
    expect(screen.getByTestId('unread-badge')).toHaveClass('badge-error');
  });

  it('caps the count at 99', () => {
    render(<UnreadBadge count={150} />);
    expect(screen.getByTestId('unread-badge')).toHaveTextContent('99+');
  });

  it('renders nothing when count is zero', () => {
    render(<UnreadBadge count={0} />);
    expect(screen.queryByTestId('unread-badge')).not.toBeInTheDocument();
  });
});
