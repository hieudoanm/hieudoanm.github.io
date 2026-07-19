import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SecurityProvider } from '@/providers/SecurityProvider';
import { hashPassword } from '@/lib/security';
import { DEFAULT_SETTINGS } from '@/test-utils/fakeDb';
import type { Settings } from '@/types';

const mockAddToast = jest.fn();
let mockSettings: Settings = { ...DEFAULT_SETTINGS };

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({ settings: mockSettings }),
}));
jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast: mockAddToast }),
}));

const Harness = ({ onMount }: { onMount?: (api: unknown) => void }) => (
  <SecurityProvider>
    <div data-testid="child" />
  </SecurityProvider>
);

const renderLocked = async (): Promise<void> => {
  window.localStorage.setItem('vault.locked', '1');
  render(<Harness />);
  await screen.findByRole('heading', { name: 'Vault Locked' });
};

describe('SecurityProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockSettings = { ...DEFAULT_SETTINGS };
    mockAddToast.mockClear();
  });

  it('renders children when no master password is configured', async () => {
    render(<Harness />);
    expect(await screen.findByTestId('child')).toBeInTheDocument();
  });

  it('shows the lock screen when the lock flag is set and master password is configured', async () => {
    mockSettings = {
      ...DEFAULT_SETTINGS,
      masterPasswordHash: 'abc',
      masterPasswordSalt: 'salt',
    };
    await renderLocked();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('unlocks with the correct master password', async () => {
    const salt = '0123456789abcdef';
    const hash = await hashPassword('secret', salt);
    mockSettings = {
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
    };
    await renderLocked();
    fireEvent.change(screen.getByLabelText('Master password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    expect(await screen.findByTestId('child')).toBeInTheDocument();
    expect(window.localStorage.getItem('vault.locked')).toBeNull();
  });

  it('shows an error for the wrong password', async () => {
    const salt = '0123456789abcdef';
    const hash = await hashPassword('secret', salt);
    mockSettings = {
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
    };
    await renderLocked();
    fireEvent.change(screen.getByLabelText('Master password'), {
      target: { value: 'wrong' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    await waitFor(() =>
      expect(screen.getByText('Incorrect password')).toBeInTheDocument()
    );
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('unlocks with the biometric mock when enabled', async () => {
    const salt = '0123456789abcdef';
    const hash = await hashPassword('secret', salt);
    mockSettings = {
      ...DEFAULT_SETTINGS,
      masterPasswordHash: hash,
      masterPasswordSalt: salt,
      biometricEnabled: true,
    };
    await renderLocked();
    fireEvent.click(
      screen.getByRole('button', { name: /Unlock with biometrics/ })
    );
    expect(await screen.findByTestId('child')).toBeInTheDocument();
    expect(mockAddToast).toHaveBeenCalledWith(
      'Biometric verified (mock)',
      'success'
    );
  });

  it('does not lock when only the flag is set but no master password exists', async () => {
    window.localStorage.setItem('vault.locked', '1');
    render(<Harness />);
    expect(await screen.findByTestId('child')).toBeInTheDocument();
  });
});
