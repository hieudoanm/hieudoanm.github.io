import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';
import { mockDb, DEFAULT_SETTINGS } from '@/test-utils/fakeDb';
import { hashPassword } from '@/lib/security';
import type { Settings } from '@/types';

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
    expect(screen.getByRole('combobox', { name: 'Theme' })).toHaveValue(
      'nothing'
    );
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
    fireEvent.change(screen.getByRole('combobox', { name: 'Theme' }), {
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

  it('sets a master password', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('New master password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new master password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Set Master Password' })
    );
    await waitFor(() =>
      expect(screen.getByText('Master password set')).toBeInTheDocument()
    );
    const put = mockDb.db.settings.put as jest.Mock;
    const arg = put.mock.calls.at(-1)[0];
    expect(arg.masterPasswordHash).toBeTruthy();
    expect(arg.masterPasswordSalt).toBeTruthy();
    expect(screen.getByText('Master password enabled')).toBeInTheDocument();
  });

  it('rejects mismatched master password confirmation', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('New master password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new master password'), {
      target: { value: 'different' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Set Master Password' })
    );
    await waitFor(() =>
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    );
    expect(
      screen.queryByText('Master password enabled')
    ).not.toBeInTheDocument();
  });

  it('changes the master password when the current one is correct', async () => {
    const salt = 'fixed-salt';
    const hash = await hashPassword('oldpass', salt);
    await mockDb.db.settings.put({
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
    });
    render(<SettingsPage />);
    await waitFor(() =>
      expect(screen.getByText('Master password enabled')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('Current master password'), {
      target: { value: 'oldpass' },
    });
    fireEvent.change(screen.getByLabelText('New master password'), {
      target: { value: 'newpass' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new master password'), {
      target: { value: 'newpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Change' }));
    await waitFor(() =>
      expect(screen.getByText('Master password updated')).toBeInTheDocument()
    );
  });

  it('rejects a wrong current master password', async () => {
    const salt = 'fixed-salt';
    const hash = await hashPassword('oldpass', salt);
    await mockDb.db.settings.put({
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
    });
    render(<SettingsPage />);
    await waitFor(() =>
      expect(screen.getByText('Master password enabled')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('Current master password'), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByLabelText('New master password'), {
      target: { value: 'newpass' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new master password'), {
      target: { value: 'newpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Change' }));
    await waitFor(() =>
      expect(screen.getByText('Current password incorrect')).toBeInTheDocument()
    );
  });

  it('removes the master password', async () => {
    const salt = 'fixed-salt';
    const hash = await hashPassword('oldpass', salt);
    await mockDb.db.settings.put({
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
    });
    render(<SettingsPage />);
    await waitFor(() =>
      expect(screen.getByText('Master password enabled')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitFor(() =>
      expect(screen.getByText('Master password removed')).toBeInTheDocument()
    );
    expect(
      screen.queryByText('Master password enabled')
    ).not.toBeInTheDocument();
    const put = mockDb.db.settings.put as jest.Mock;
    const arg = put.mock.calls.at(-1)[0];
    expect(arg.masterPasswordHash).toBeUndefined();
    expect(arg.masterPasswordSalt).toBeUndefined();
  });

  it('locks the vault immediately', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('New master password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new master password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Set Master Password' })
    );
    await waitFor(() =>
      expect(screen.getByText('Master password set')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Lock now' }));
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Vault Locked' })
      ).toBeInTheDocument()
    );
  });

  it('saves biometric and lock-on-close toggles', async () => {
    render(<SettingsPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Biometric unlock (mock)' })
    );
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Auto-lock on browser close' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() =>
      expect(screen.getByText('Settings saved')).toBeInTheDocument()
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({
        biometricEnabled: true,
        lockOnClose: true,
      })
    );
  });
});
