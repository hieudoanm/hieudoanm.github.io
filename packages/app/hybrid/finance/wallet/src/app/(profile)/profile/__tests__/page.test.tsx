import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../page';

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/components/templates', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-template">{children}</div>
  ),
}));

jest.mock('@/components/organisms/ProfileForm', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-form" />,
}));

jest.mock('@/components/atoms', () => ({
  UserCard: ({ user }: { user: { name: string } }) => (
    <div data-testid="user-card">{user.name}</div>
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
  SkeletonCard: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-card" className={className} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('react-icons/fi', () => ({
  FiSettings: () => <span data-testid="fi-settings" />,
}));

describe('ProfilePage', () => {
  const mockUser = {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '',
    phone: '123',
    country: 'USA',
    timezone: 'UTC-5',
    currency: 'USD',
  };

  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows skeleton when loading', () => {
    mockUseData.mockReturnValue({
      user: null,
      logout: mockLogout,
      loading: true,
    });
    render(<ProfilePage />);
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('skeleton-text').length).toBeGreaterThan(0);
  });

  it('shows skeleton when user is null and not loading', () => {
    mockUseData.mockReturnValue({
      user: null,
      logout: mockLogout,
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
  });

  it('renders profile content when user exists', () => {
    mockUseData.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Manage your account')).toBeInTheDocument();
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
  });

  it('renders settings link', () => {
    mockUseData.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      loading: false,
    });
    render(<ProfilePage />);
    const link = screen.getByText('Settings').closest('a');
    expect(link).toHaveAttribute('href', '/settings');
  });

  it('calls logout on sign out click', () => {
    mockUseData.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      loading: false,
    });
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
