import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationsTemplate } from '../NotificationsTemplate';

describe('NotificationsTemplate', () => {
  it('renders notifications with types, times and unread badges', () => {
    render(<NotificationsTemplate />);
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
    expect(screen.getByText('Deploy completed')).toBeInTheDocument();
    expect(screen.getByText('Storage usage is high')).toBeInTheDocument();
    expect(screen.getByText('Payment failed')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('filters to unread notifications', () => {
    render(<NotificationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Unread/ }));
    expect(screen.queryByText('Storage usage is high')).not.toBeInTheDocument();
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
  });

  it('marks all notifications as read', () => {
    render(<NotificationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Mark all read/ }));
    fireEvent.click(screen.getByRole('button', { name: /Unread/ }));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Mark all read/ })
    ).toBeDisabled();
  });

  it('dismisses a single notification', () => {
    render(<NotificationsTemplate />);
    const dismissButtons = screen.getAllByTitle('Dismiss');
    fireEvent.click(dismissButtons[0]);
    expect(
      screen.queryByText('Welcome to the workspace')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Storage usage is high')).toBeInTheDocument();
  });

  it('shows the empty state when all notifications are dismissed', () => {
    render(<NotificationsTemplate />);
    const dismissButtons = screen.getAllByTitle('Dismiss');
    dismissButtons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Mark all read/ })
    ).toBeDisabled();
  });
});
