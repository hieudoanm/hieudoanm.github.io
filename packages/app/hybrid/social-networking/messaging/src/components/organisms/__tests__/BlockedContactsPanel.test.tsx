import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockedContactsPanel } from '@/components/organisms/BlockedContactsPanel';

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useData: () => mockUseData(),
}));

const baseData = {
  contacts: [],
  privacySettings: {
    lastSeen: 'everyone',
    profilePhoto: 'everyone',
    readReceipts: true,
    typingIndicators: true,
    groupsInvite: 'everyone',
    blockedContactIds: [] as string[],
    pinEnabled: false,
    pinHash: '',
  },
  unblockContact: jest.fn(),
  reportSpam: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue({ ...baseData });
});

describe('BlockedContactsPanel', () => {
  it('shows "No blocked contacts." when none are blocked', () => {
    render(<BlockedContactsPanel onClose={jest.fn()} />);
    expect(screen.getByText('No blocked contacts.')).toBeInTheDocument();
  });

  it('shows blocked contact name when contacts are blocked', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      contacts: [
        {
          id: 'bob',
          name: 'Bob',
          phone: '+1 555 010 2000',
          username: 'bob',
          avatarColor: '#ff6600',
          online: false,
          lastSeenAt: 1000,
          blocked: true,
          starred: false,
        },
      ],
      privacySettings: {
        ...baseData.privacySettings,
        blockedContactIds: ['bob'],
      },
    });
    render(<BlockedContactsPanel onClose={jest.fn()} />);
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('@bob')).toBeInTheDocument();
  });

  it('clicking Unblock shows confirm UI', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      contacts: [
        {
          id: 'bob',
          name: 'Bob',
          phone: '+1 555 010 2000',
          username: 'bob',
          avatarColor: '#ff6600',
          online: false,
          lastSeenAt: 1000,
          blocked: true,
          starred: false,
        },
      ],
      privacySettings: {
        ...baseData.privacySettings,
        blockedContactIds: ['bob'],
      },
    });
    render(<BlockedContactsPanel onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Unblock'));
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('confirm Yes calls unblockContact', () => {
    const unblockContact = jest.fn();
    mockUseData.mockReturnValue({
      ...baseData,
      contacts: [
        {
          id: 'bob',
          name: 'Bob',
          phone: '+1 555 010 2000',
          username: 'bob',
          avatarColor: '#ff6600',
          online: false,
          lastSeenAt: 1000,
          blocked: true,
          starred: false,
        },
      ],
      privacySettings: {
        ...baseData.privacySettings,
        blockedContactIds: ['bob'],
      },
      unblockContact,
    });
    render(<BlockedContactsPanel onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Unblock'));
    fireEvent.click(screen.getByText('Yes'));
    expect(unblockContact).toHaveBeenCalledWith('bob');
  });

  it('close button calls onClose', () => {
    const onClose = jest.fn();
    render(<BlockedContactsPanel onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
