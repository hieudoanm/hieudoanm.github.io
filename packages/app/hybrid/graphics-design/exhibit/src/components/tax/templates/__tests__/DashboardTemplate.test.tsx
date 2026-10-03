import { render, screen } from '@testing-library/react';
import { DashboardTemplate } from '../DashboardTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/personal'),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('@/providers/tax/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    loading: false,
  }),
}));

jest.mock('@/providers/tax/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

describe('DashboardTemplate', () => {
  it('renders children with personal layout', () => {
    render(
      <DashboardTemplate>
        <div>Dashboard Content</div>
      </DashboardTemplate>
    );
    expect(screen.getByText('Dashboard Content')).toBeTruthy();
  });

  it('renders business layout', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/tax');
    render(
      <DashboardTemplate>
        <div>Business Content</div>
      </DashboardTemplate>
    );
    expect(screen.getByText('Business Content')).toBeTruthy();
  });
});
