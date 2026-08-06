import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';
import { mockDb } from '@/test-utils/fakeDb';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    mockDb.reset();
    mockPush.mockClear();
  });

  it('renders settings with current values', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    expect(screen.getByRole('combobox')).toHaveValue('nothing');
    expect(screen.getByText('Auto-lock timeout: 5 min')).toBeInTheDocument();
    expect(screen.getByText('Clipboard clear: 30s')).toBeInTheDocument();
  });

  it('saves settings and applies the theme', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'night' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() =>
      expect(screen.getByText('Settings saved')).toBeInTheDocument()
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'night',
        autoLockTimeout: 5,
        clipboardClear: 30,
      })
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'night');
  });

  it('updates auto-lock via slider', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getAllByRole('slider')[0], {
      target: { value: '20' },
    });
    expect(screen.getByText('Auto-lock timeout: 20 min')).toBeInTheDocument();
  });

  it('updates clipboard clear via slider', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getAllByRole('slider')[1], {
      target: { value: '45' },
    });
    expect(screen.getByText('Clipboard clear: 45s')).toBeInTheDocument();
  });

  it('navigates back home', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
