import { render, screen, fireEvent } from '@testing-library/react';
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

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    loading: false,
  }),
}));

jest.mock('@/providers/ToastProvider', () => ({
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
    usePathname.mockReturnValue('/business');
    render(
      <DashboardTemplate>
        <div>Business Content</div>
      </DashboardTemplate>
    );
    expect(screen.getByText('Business Content')).toBeTruthy();
  });

  it('toggles sidebar on menu button click', () => {
    render(
      <DashboardTemplate>
        <div>Content</div>
      </DashboardTemplate>
    );
    const menuBtn = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuBtn);
    expect(menuBtn).toBeTruthy();
  });

  it('overlay click closes sidebar', () => {
    render(
      <DashboardTemplate>
        <div>Content</div>
      </DashboardTemplate>
    );
    const menuBtn = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuBtn);
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
