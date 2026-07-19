import { render, screen } from '@testing-library/react';
import NotificationItem from '../NotificationItem';
import type { Notification } from '@/types';

const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

const mockNotification: Notification = {
  id: '1',
  title: 'Payment Received',
  message: 'You received $4,500.00',
  date: threeDaysAgo.toISOString(),
  read: true,
  type: 'transaction',
};

describe('NotificationItem', () => {
  it('renders notification title', () => {
    render(<NotificationItem notification={mockNotification} />);
    expect(screen.getByText('Payment Received')).toBeInTheDocument();
  });

  it('renders notification message', () => {
    render(<NotificationItem notification={mockNotification} />);
    expect(screen.getByText('You received $4,500.00')).toBeInTheDocument();
  });

  it('renders New badge when unread', () => {
    const unread = { ...mockNotification, read: false };
    render(<NotificationItem notification={unread} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('does not render New badge when read', () => {
    render(<NotificationItem notification={mockNotification} />);
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('renders relative date', () => {
    render(<NotificationItem notification={mockNotification} />);
    expect(screen.getByText('3 days ago')).toBeInTheDocument();
  });
});
