import { fireEvent, render, screen } from '@testing-library/react';
import { InboxTemplate } from '../InboxTemplate';

describe('InboxTemplate', () => {
  it('renders messages with unread indicators', () => {
    render(<InboxTemplate />);
    expect(screen.getByText('Q3 planning')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.getByText('10:24')).toBeInTheDocument();
    expect(screen.getAllByTitle('Unread')).toHaveLength(2);
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });

  it('filters messages by sender and subject', () => {
    render(<InboxTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'stripe' },
    });
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.queryByText('Q3 planning')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'Build' },
    });
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.queryByText('Payment received')).not.toBeInTheDocument();
  });

  it('shows an empty state when no messages match the search', () => {
    render(<InboxTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No messages')).toBeInTheDocument();
  });

  it('opens a message and marks it as read', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Alice Chen' })
    );
    expect(
      screen.getByText('Can you review the roadmap before our call?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/From alice@acme.com to me@acme.com/)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));
    expect(screen.getAllByTitle('Unread')).toHaveLength(1);
    expect(
      screen.queryByRole('button', { name: 'Mark as read' })
    ).not.toBeInTheDocument();
  });

  it('omits the mark-as-read button for an already-read message', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Stripe' })
    );
    expect(
      screen.getByText('We received your payment of $49.00.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mark as read' })
    ).not.toBeInTheDocument();
  });

  it('deletes a message and falls back to the placeholder', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Alice Chen' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Q3 planning')).not.toBeInTheDocument();
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });

  it('shows the empty state after deleting every message', () => {
    render(<InboxTemplate />);
    [
      'Open message from Alice Chen',
      'Open message from GitHub',
      'Open message from Stripe',
    ].forEach((name) => {
      fireEvent.click(screen.getByRole('button', { name }));
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });
    expect(screen.getByText('No messages')).toBeInTheDocument();
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });
});
