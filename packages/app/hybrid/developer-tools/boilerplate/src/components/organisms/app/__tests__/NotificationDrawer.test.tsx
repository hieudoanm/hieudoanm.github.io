import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationDrawer } from '../NotificationDrawer';

const notifications = [
  {
    id: 'n1',
    title: 'New comment',
    description: 'On your post',
    time: '2m',
    unread: true,
  },
  { id: 'n2', title: 'Build passed', time: '1h' },
];

describe('NotificationDrawer', () => {
  it('renders nothing when closed', () => {
    render(
      <NotificationDrawer
        open={false}
        onClose={jest.fn()}
        notifications={notifications}
      />
    );
    expect(screen.queryByTestId('notification-drawer')).not.toBeInTheDocument();
  });

  it('renders notifications when open', () => {
    render(
      <NotificationDrawer
        open
        onClose={jest.fn()}
        notifications={notifications}
      />
    );
    expect(screen.getByText('New comment')).toBeInTheDocument();
    expect(screen.getByText('On your post')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('1 new')).toBeInTheDocument();
  });

  it('fires onClose when the backdrop is clicked', () => {
    const onClose = jest.fn();
    render(
      <NotificationDrawer
        open
        onClose={onClose}
        notifications={notifications}
      />
    );
    fireEvent.click(screen.getByTestId('drawer-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('fires onMarkAllRead', () => {
    const onMarkAllRead = jest.fn();
    render(
      <NotificationDrawer
        open
        onClose={jest.fn()}
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
      />
    );
    fireEvent.click(screen.getByTestId('mark-all-read'));
    expect(onMarkAllRead).toHaveBeenCalled();
  });
});
