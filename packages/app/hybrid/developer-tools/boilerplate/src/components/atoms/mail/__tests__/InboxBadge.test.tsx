import { render, screen } from '@testing-library/react';
import { InboxBadge } from '../InboxBadge';

describe('InboxBadge', () => {
  it('renders the unread count with badge classes', () => {
    render(<InboxBadge count={5} />);
    const badge = screen.getByTestId('inbox-badge');
    expect(badge).toHaveTextContent('5 unread');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-primary');
  });

  it('renders a custom label', () => {
    render(<InboxBadge count={2} label="new messages" />);
    expect(screen.getByTestId('inbox-badge')).toHaveTextContent(
      '2 new messages'
    );
  });

  it('renders an empty inbox', () => {
    render(<InboxBadge count={0} />);
    expect(screen.getByTestId('inbox-badge')).toHaveTextContent('0 unread');
  });
});
