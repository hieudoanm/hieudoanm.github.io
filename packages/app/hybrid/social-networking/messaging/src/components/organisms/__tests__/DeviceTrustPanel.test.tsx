import { render, screen, fireEvent } from '@testing-library/react';

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

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  ...jest.requireActual('@/providers/DataProvider'),
  useData: (...args: any[]) => mockUseData(...args),
}));

const mockClose = jest.fn();

const BASE_CONTEXT = {
  deviceTrustList: [],
  removeTrustedDevice: jest.fn(),
  verifyDevice: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue(BASE_CONTEXT);
});

import { DeviceTrustPanel } from '@/components/organisms/DeviceTrustPanel';

const wrap = (ui: React.ReactElement) => render(ui);

describe('DeviceTrustPanel', () => {
  it('shows "No trusted devices." when list is empty', () => {
    wrap(<DeviceTrustPanel onClose={mockClose} />);
    expect(screen.getByText('No trusted devices.')).toBeInTheDocument();
  });

  it('shows device label when list has items', () => {
    mockUseData.mockReturnValue({
      ...BASE_CONTEXT,
      deviceTrustList: [
        {
          deviceId: 'dev-abc',
          deviceLabel: 'MacBook Pro',
          publicKey: 'pk1',
          trustedAt: Date.now(),
          verified: false,
        },
      ],
    });
    wrap(<DeviceTrustPanel onClose={mockClose} />);
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
  });

  it('Verify button calls verifyDevice', () => {
    const verifyDevice = jest.fn().mockResolvedValue(undefined);
    mockUseData.mockReturnValue({
      ...BASE_CONTEXT,
      deviceTrustList: [
        {
          deviceId: 'dev-abc',
          deviceLabel: 'Unverified Phone',
          publicKey: 'pk1',
          trustedAt: Date.now(),
          verified: false,
        },
      ],
      verifyDevice,
    });
    wrap(<DeviceTrustPanel onClose={mockClose} />);
    fireEvent.click(screen.getByText('Verify'));
    expect(verifyDevice).toHaveBeenCalledWith('dev-abc');
  });

  it('Remove button calls removeTrustedDevice', () => {
    const removeTrustedDevice = jest.fn().mockResolvedValue(undefined);
    mockUseData.mockReturnValue({
      ...BASE_CONTEXT,
      deviceTrustList: [
        {
          deviceId: 'dev-xyz',
          deviceLabel: 'Old Laptop',
          publicKey: 'pk2',
          trustedAt: Date.now(),
          verified: true,
        },
      ],
      removeTrustedDevice,
    });
    wrap(<DeviceTrustPanel onClose={mockClose} />);
    fireEvent.click(screen.getByText('Remove'));
    expect(removeTrustedDevice).toHaveBeenCalledWith('dev-xyz');
  });

  it('Close button calls onClose', () => {
    wrap(<DeviceTrustPanel onClose={mockClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
