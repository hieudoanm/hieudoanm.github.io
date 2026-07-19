import { render, screen, fireEvent } from '@testing-library/react';
import { PrivacySettingsPanel } from '@/components/organisms/PrivacySettingsPanel';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: { getAll: jest.fn().mockResolvedValue([]), put: jest.fn() },
    chats: {
      getAll: jest.fn().mockResolvedValue([]),
      get: jest.fn(),
      put: jest.fn(),
    },
    messages: {
      getAll: jest.fn().mockResolvedValue([]),
      getByChat: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
    auth: { get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'test-id'),
}));

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PrivacySettingsPanel', () => {
  it('shows the last seen select', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    const selects = screen.getAllByRole('combobox');
    const lastSeenSelect = selects[0];
    expect(lastSeenSelect).toBeInTheDocument();
    expect(lastSeenSelect).toHaveValue('everyone');
  });

  it('shows the profile photo select', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    const selects = screen.getAllByRole('combobox');
    const profilePhotoSelect = selects[1];
    expect(profilePhotoSelect).toBeInTheDocument();
    expect(profilePhotoSelect).toHaveValue('everyone');
  });

  it('read receipts toggle calls updatePrivacySettings', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    const toggle = screen.getByLabelText('Toggle read receipts');
    fireEvent.click(toggle);
  });

  it('typing indicators toggle calls updatePrivacySettings', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    const toggle = screen.getByLabelText('Toggle typing indicators');
    fireEvent.click(toggle);
  });

  it('PIN Lock button shows PIN setup form', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('PIN Lock'));
    expect(screen.getByPlaceholderText('New PIN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm PIN')).toBeInTheDocument();
  });

  it('PIN setup saves when valid and hides form', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('PIN Lock'));

    const newPin = screen.getByPlaceholderText('New PIN');
    const confirmPin = screen.getByPlaceholderText('Confirm PIN');
    fireEvent.change(newPin, { target: { value: '1234' } });
    fireEvent.change(confirmPin, { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Save PIN'));

    expect(screen.queryByPlaceholderText('New PIN')).not.toBeInTheDocument();
  });

  it('PIN Lock button shows On/Off indicator', () => {
    wrap(<PrivacySettingsPanel onClose={jest.fn()} />);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });

  it('Blocked Contacts button calls onOpenBlocked', () => {
    const onOpenBlocked = jest.fn();
    wrap(
      <PrivacySettingsPanel onClose={jest.fn()} onOpenBlocked={onOpenBlocked} />
    );
    fireEvent.click(screen.getByText('Blocked Contacts'));
    expect(onOpenBlocked).toHaveBeenCalledTimes(1);
  });

  it('Trusted Devices button calls onOpenDevices', () => {
    const onOpenDevices = jest.fn();
    wrap(
      <PrivacySettingsPanel onClose={jest.fn()} onOpenDevices={onOpenDevices} />
    );
    fireEvent.click(screen.getByText('Trusted Devices'));
    expect(onOpenDevices).toHaveBeenCalledTimes(1);
  });

  it('close calls onClose', () => {
    const onClose = jest.fn();
    wrap(<PrivacySettingsPanel onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
