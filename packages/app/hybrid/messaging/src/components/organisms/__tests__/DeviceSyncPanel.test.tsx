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
const mockPairNew = jest.fn();

const BASE_CONTEXT = {
  pairedDevices: [],
  syncState: {
    deviceId: 'abcdef1234567890',
    lastSyncAt: Date.now(),
    keyBackupVersion: 1,
    pendingSyncCount: 0,
  },
  syncNow: jest.fn(),
  removePairedDevice: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue(BASE_CONTEXT);
});

import { DeviceSyncPanel } from '@/components/organisms/DeviceSyncPanel';

const wrap = (ui: React.ReactElement) => render(ui);

describe('DeviceSyncPanel', () => {
  it('shows current device ID truncated', () => {
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText(/…/)).toBeInTheDocument();
  });

  it('shows "No paired devices yet." when list is empty', () => {
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    expect(screen.getByText('No paired devices yet.')).toBeInTheDocument();
  });

  it('shows paired device name when devices exist', () => {
    mockUseData.mockReturnValue({
      ...BASE_CONTEXT,
      pairedDevices: [
        {
          id: 'dev-1',
          label: 'Living Room Laptop',
          publicKey: 'pk1',
          pairedAt: Date.now(),
          lastSeenAt: Date.now(),
          online: true,
        },
      ],
    });
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    expect(screen.getByText('Living Room Laptop')).toBeInTheDocument();
  });

  it('+ Pair button calls onPairNew', () => {
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    fireEvent.click(screen.getByText('+ Pair'));
    expect(mockPairNew).toHaveBeenCalledTimes(1);
  });

  it('Sync Now button calls syncNow', () => {
    const syncNow = jest.fn();
    mockUseData.mockReturnValue({ ...BASE_CONTEXT, syncNow });
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    fireEvent.click(screen.getByText('Sync Now'));
    expect(syncNow).toHaveBeenCalledTimes(1);
  });

  it('Remove button calls removePairedDevice', () => {
    const removePairedDevice = jest.fn();
    mockUseData.mockReturnValue({
      ...BASE_CONTEXT,
      pairedDevices: [
        {
          id: 'dev-1',
          label: 'Office Phone',
          publicKey: 'pk1',
          pairedAt: Date.now(),
          lastSeenAt: Date.now(),
          online: false,
        },
      ],
      removePairedDevice,
    });
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    fireEvent.click(screen.getByLabelText('Remove device'));
    expect(removePairedDevice).toHaveBeenCalledWith('dev-1');
  });

  it('Close button calls onClose', () => {
    wrap(<DeviceSyncPanel onClose={mockClose} onPairNew={mockPairNew} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
