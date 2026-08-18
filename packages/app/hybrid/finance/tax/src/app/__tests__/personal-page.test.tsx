import { render, screen } from '@testing-library/react';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/personal'),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import PersonalDashboard from '../personal/page';

describe('PersonalDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders greeting with user name', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu', email: 'hieu@test.com', role: 'admin' },
      loading: false,
    });
    render(<PersonalDashboard />);
    expect(screen.getByText(/Xin chao, Hieu/)).toBeTruthy();
  });

  it('renders greeting fallback when user is null', () => {
    mockUseData.mockReturnValue({
      user: null,
      loading: false,
    });
    render(<PersonalDashboard />);
    expect(screen.getByText(/Xin chao, Ban/)).toBeTruthy();
  });

  it('renders calculator card', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu', email: 'hieu@test.com', role: 'admin' },
      loading: false,
    });
    render(<PersonalDashboard />);
    expect(screen.getByText('Tinh Thue')).toBeTruthy();
  });

  it('renders coming soon cards', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu', email: 'hieu@test.com', role: 'admin' },
      loading: false,
    });
    render(<PersonalDashboard />);
    expect(screen.getByText('Lich su tinh thue')).toBeTruthy();
    expect(screen.getByText('Xuat bao cao')).toBeTruthy();
    expect(screen.getByText('Muc thue theo nam')).toBeTruthy();
  });
});
