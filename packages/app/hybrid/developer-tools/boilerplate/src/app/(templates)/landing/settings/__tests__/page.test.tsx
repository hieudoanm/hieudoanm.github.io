import { fireEvent, render, screen } from '@testing-library/react';
import SettingsPage from '@/app/(templates)/landing/settings/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/settings',
}));

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
