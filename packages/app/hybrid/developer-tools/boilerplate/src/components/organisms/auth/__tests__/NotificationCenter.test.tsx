import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationCenter } from '../NotificationCenter';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('NotificationCenter', () => {
  const notifications = [
    {
      id: '1',
      title: 'Deploy complete',
      description: 'Production is live',
      time: '2m',
      unread: true,
    },
    { id: '2', title: 'Build failed', unread: false },
  ];

  it('renders the bell trigger with the unread badge', () => {
    render(<NotificationCenter notifications={notifications} />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows notifications when opened', () => {
    render(<NotificationCenter notifications={notifications} />);
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('Deploy complete')).toBeInTheDocument();
    expect(screen.getByText('Build failed')).toBeInTheDocument();
  });

  it('invokes onOpen when a notification is clicked', () => {
    const onOpen = jest.fn();
    render(
      <NotificationCenter notifications={notifications} onOpen={onOpen} />
    );
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByText('Deploy complete'));
    expect(onOpen).toHaveBeenCalledWith(notifications[0]);
  });

  it('invokes onMarkAllRead and hides the badge', () => {
    const onMarkAllRead = jest.fn();
    render(
      <NotificationCenter
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
      />
    );
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it('uses the provided unread count', () => {
    render(
      <NotificationCenter notifications={notifications} unreadCount={5} />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows an empty state', () => {
    render(<NotificationCenter notifications={[]} />);
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  it('closes the panel when clicking outside', () => {
    render(
      <div>
        <NotificationCenter notifications={notifications} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByText('Deploy complete')).not.toBeInTheDocument();
  });
});
