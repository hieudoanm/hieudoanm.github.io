import { render, screen } from '@testing-library/react';
import ProfilePage from '../profile/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/profile'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name', () => {
    mockUseData.mockReturnValue({
      user: {
        id: '1',
        name: 'Hieu Doan',
        email: 'hieumdoan@gmail.com',
        role: 'admin',
      },
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('Hieu Doan')).toBeTruthy();
  });

  it('renders user email', () => {
    mockUseData.mockReturnValue({
      user: {
        id: '1',
        name: 'Hieu Doan',
        email: 'hieumdoan@gmail.com',
        role: 'admin',
      },
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('hieumdoan@gmail.com')).toBeTruthy();
  });

  it('renders avatar initial', () => {
    mockUseData.mockReturnValue({
      user: {
        id: '1',
        name: 'Hieu Doan',
        email: 'hieumdoan@gmail.com',
        role: 'admin',
      },
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('H')).toBeTruthy();
  });

  it('renders Ho So title', () => {
    mockUseData.mockReturnValue({
      user: {
        id: '1',
        name: 'Hieu Doan',
        email: 'hieumdoan@gmail.com',
        role: 'admin',
      },
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('Ho So')).toBeTruthy();
  });

  it('renders fallback when user is null', () => {
    mockUseData.mockReturnValue({
      user: null,
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('Nguoi dung')).toBeTruthy();
  });

  it('renders avatar fallback when user is null', () => {
    mockUseData.mockReturnValue({
      user: null,
      loading: false,
    });
    render(<ProfilePage />);
    expect(screen.getByText('U')).toBeTruthy();
  });
});
