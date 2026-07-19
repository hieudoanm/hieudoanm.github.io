import { render, screen } from '@testing-library/react';
import SettingsPage from '../settings/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/settings'),
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

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('SettingsPage', () => {
  it('renders settings title', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Cai Dat')).toBeTruthy();
  });

  it('renders theme section', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Giao dien')).toBeTruthy();
    expect(screen.getByText('Chu de')).toBeTruthy();
  });

  it('renders data section', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Du lieu')).toBeTruthy();
  });

  it('renders export button', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Xuat JSON')).toBeTruthy();
  });

  it('renders theme selector options', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Dark (Default)')).toBeTruthy();
    expect(screen.getByText('Light')).toBeTruthy();
  });
});
