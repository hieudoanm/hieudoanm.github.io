import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmergencyAccessCard } from '@/components/organisms/EmergencyAccessCard';
import type { Settings, VaultItem } from '@/types';

const minute = 60000;
const now = Date.now();

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

const makeSettings = (overrides: Partial<Settings> = {}): Settings => ({
  theme: 'password-light',
  autoLockTimeout: 5,
  clipboardClear: 30,
  biometricEnabled: false,
  lockOnClose: false,
  ...overrides,
});

describe('EmergencyAccessCard', () => {
  const requestEmergencyAccess = jest.fn();
  const cancelEmergencyRequest = jest.fn();

  beforeEach(() => {
    requestEmergencyAccess.mockClear();
    cancelEmergencyRequest.mockClear();
    mockUseData.mockReturnValue({
      settings: makeSettings(),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
  });

  it('sets up an emergency contact', () => {
    render(<EmergencyAccessCard />);
    fireEvent.change(screen.getByLabelText('Emergency contact email'), {
      target: { value: 'guardian@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Emergency access delay'), {
      target: { value: '60' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Save emergency contact' })
    );
    expect(requestEmergencyAccess).toHaveBeenCalledWith(
      'guardian@example.com',
      60
    );
  });

  it('disables save until an email is provided', () => {
    render(<EmergencyAccessCard />);
    expect(
      screen.getByRole('button', { name: 'Save emergency contact' })
    ).toBeDisabled();
  });

  it('requests access for an existing contact', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Request emergency access' })
    );
    expect(requestEmergencyAccess).toHaveBeenCalledWith('g@e.com', 30);
  });

  it('shows a countdown for a pending request', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
        emergencyRequest: { requestedAt: now, delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    expect(screen.getByText(/Requested — available in/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel request' }));
    expect(cancelEmergencyRequest).toHaveBeenCalled();
  });

  it('shows granted state when the delay has elapsed', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
        emergencyRequest: { requestedAt: now - 30 * minute, delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    expect(screen.getByText('Access granted')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'End emergency access' })
    );
    expect(cancelEmergencyRequest).toHaveBeenCalled();
  });
});
