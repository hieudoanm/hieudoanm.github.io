import { fireEvent, render, screen } from '@testing-library/react';
import DashboardPage from '../dashboard/page';
import ProfilePage from '@/app/(templates)/social/profile/page';
import SettingsPage from '@/app/(templates)/landing/settings/page';
import VersionPage from '@/app/(templates)/landing/version/page';
import AppLoading from '../loading';

jest.mock('next/navigation', () => ({
  usePathname: () => '/app/dashboard',
}));

describe('DashboardPage', () => {
  it('renders dashboard stats', () => {
    render(<DashboardPage />);
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$48,250')).toBeInTheDocument();
  });
});

describe('ProfilePage', () => {
  it('renders profile settings', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Account settings')).toBeInTheDocument();
    expect(screen.getByText('Change password')).toBeInTheDocument();
  });
});

describe('SettingsPage', () => {
  it('renders settings selects', () => {
    render(<SettingsPage />);
    expect(screen.getAllByRole('combobox')).toHaveLength(4);
    expect(screen.getAllByText('Language').length).toBeGreaterThan(0);
  });

  it('updates language selection', () => {
    render(<SettingsPage />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'vi' } });
    expect(selects[0]).toHaveValue('vi');
  });

  it('updates theme selection', () => {
    render(<SettingsPage />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'dark' } });
    expect(selects[1]).toHaveValue('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});

describe('VersionPage', () => {
  it('renders the current build version segments', () => {
    render(<VersionPage />);
    expect(
      screen.getByText(String(new Date().getFullYear()))
    ).toBeInTheDocument();
  });
});

describe('AppLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AppLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
