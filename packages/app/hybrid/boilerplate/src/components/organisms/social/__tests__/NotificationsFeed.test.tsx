import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationsFeed } from '../NotificationsFeed';

const notifications = [
  {
    id: 'n1',
    type: 'like' as const,
    text: 'Mia liked your post',
    time: '2m',
    read: false,
  },
  {
    id: 'n2',
    type: 'follow' as const,
    text: 'Noah followed you',
    time: '1h',
    read: true,
  },
];

describe('NotificationsFeed', () => {
  it('renders notification text and unread count', () => {
    render(<NotificationsFeed notifications={notifications} />);
    expect(screen.getByText('Mia liked your post')).toBeInTheDocument();
    expect(screen.getByText('Noah followed you')).toBeInTheDocument();
    expect(screen.getByText('1 unread')).toBeInTheDocument();
  });

  it('marks unread items visually', () => {
    const { container } = render(
      <NotificationsFeed notifications={notifications} />
    );
    expect(container.querySelector('.bg-primary\\/10')).not.toBeNull();
    expect(container.querySelectorAll('[aria-label="unread"]').length).toBe(1);
  });

  it('fires onMarkRead with the notification id', () => {
    const onMarkRead = jest.fn();
    render(
      <NotificationsFeed
        notifications={notifications}
        onMarkRead={onMarkRead}
      />
    );
    fireEvent.click(screen.getByText('Mia liked your post'));
    expect(onMarkRead).toHaveBeenCalledWith('n1');
  });

  it('shows an empty state when there are no notifications', () => {
    render(<NotificationsFeed notifications={[]} />);
    expect(screen.getByText('No notifications yet')).toBeInTheDocument();
  });
});
