import { render, screen, fireEvent } from '@testing-library/react';
import NotificationsPage from '../page';

const mockMarkNotificationRead = jest.fn().mockResolvedValue(undefined);

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

const mockUseData = jest.fn();

jest.mock('@/components/templates', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-template">{children}</div>
  ),
}));

jest.mock('@/components/atoms', () => ({
  NotificationItem: ({
    notification,
    onRead,
  }: {
    notification: { id: string; title: string };
    onRead: (id: string) => void;
  }) => (
    <div data-testid="notification-item">
      <span>{notification.title}</span>
      <button onClick={() => onRead(notification.id)}>Mark Read</button>
    </div>
  ),
}));

jest.mock('@/components/atoms/Skeleton', () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
  SkeletonText: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-text" className={className} />
  ),
}));

describe('NotificationsPage', () => {
  const mockNotifications = [
    {
      id: 'n1',
      title: 'Payment received',
      message: 'You received $100',
      date: '2026-08-17',
      read: false,
      type: 'transaction' as const,
    },
    {
      id: 'n2',
      title: 'Security alert',
      message: 'New login detected',
      date: '2026-08-16',
      read: true,
      type: 'alert' as const,
    },
    {
      id: 'n3',
      title: 'Promo offer',
      message: '2% cashback',
      date: '2026-08-15',
      read: false,
      type: 'promotion' as const,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseData.mockReturnValue({
      notifications: mockNotifications,
      markNotificationRead: mockMarkNotificationRead,
      loading: false,
    });
  });

  it('shows skeleton when loading', () => {
    mockUseData.mockReturnValue({
      notifications: [],
      markNotificationRead: mockMarkNotificationRead,
      loading: true,
    });
    render(<NotificationsPage />);
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('skeleton-text').length).toBeGreaterThan(0);
  });

  it('renders filter buttons', () => {
    render(<NotificationsPage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unread' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Alerts' })).toBeInTheDocument();
  });

  it('shows all notifications by default', () => {
    render(<NotificationsPage />);
    const items = screen.getAllByTestId('notification-item');
    expect(items).toHaveLength(3);
  });

  it('filters unread notifications', () => {
    render(<NotificationsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Unread' }));
    const items = screen.getAllByTestId('notification-item');
    expect(items).toHaveLength(2);
  });

  it('filters alerts notifications', () => {
    render(<NotificationsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Alerts' }));
    const items = screen.getAllByTestId('notification-item');
    expect(items).toHaveLength(1);
    expect(screen.getByText('Security alert')).toBeInTheDocument();
  });

  it('shows empty state when filter yields no results', () => {
    mockUseData.mockReturnValue({
      notifications: [{ ...mockNotifications[0], type: 'system' as const }],
      markNotificationRead: mockMarkNotificationRead,
      loading: false,
    });
    render(<NotificationsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Alerts' }));
    expect(screen.getByText('No notifications found')).toBeInTheDocument();
  });

  it('marks notification as read', () => {
    render(<NotificationsPage />);
    const markReadButtons = screen.getAllByText('Mark Read');
    fireEvent.click(markReadButtons[0]);
    expect(mockMarkNotificationRead).toHaveBeenCalledWith('n1');
  });

  it('switches filters and updates visible items', () => {
    render(<NotificationsPage />);
    expect(screen.getAllByTestId('notification-item')).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Unread' }));
    expect(screen.getAllByTestId('notification-item')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByTestId('notification-item')).toHaveLength(3);
  });

  it('shows empty message with no unread notifications', () => {
    mockUseData.mockReturnValue({
      notifications: [{ ...mockNotifications[1] }],
      markNotificationRead: mockMarkNotificationRead,
      loading: false,
    });
    render(<NotificationsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Unread' }));
    expect(screen.getByText('No notifications found')).toBeInTheDocument();
  });
});
