import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallHistoryPanel } from '@/components/organisms/CallHistoryPanel';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: {
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
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
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useData: () => mockUseData(),
}));

const chatAlice = {
  id: 'c1',
  kind: 'direct',
  title: 'Alice',
  avatarColor: '#4da3ff',
  memberIds: ['me', 'alice'],
  adminIds: [],
  pinned: false,
  muted: false,
  isSecret: false,
  disappearingSeconds: 0,
  unreadCount: 0,
  createdAt: 1000,
  lastMessageAt: 1000,
  settings: {
    wallpaper: '',
    notificationSound: true,
    disappearingSeconds: 0,
  },
};

const baseData = {
  callHistory: [],
  chats: [],
  contacts: [],
  privacySettings: {
    lastSeen: 'everyone',
    profilePhoto: 'everyone',
    readReceipts: true,
    typingIndicators: true,
    groupsInvite: 'everyone',
    blockedContactIds: [],
    pinEnabled: false,
    pinHash: '',
  },
  toggleMute: jest.fn(),
  toggleSecret: jest.fn(),
  updateChatSettings: jest.fn(),
  unblockContact: jest.fn(),
  reportSpam: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue({ ...baseData });
});

describe('CallHistoryPanel', () => {
  it('shows "No calls yet." when call history is empty', () => {
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText('No calls yet.')).toBeInTheDocument();
  });

  it('shows call entry with chat title', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 60,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows "Missed" for missed calls', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'missed',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText(/Missed/)).toBeInTheDocument();
  });

  it('shows duration for ended calls', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call2',
          chatId: 'c1',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 125,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText(/2m 5s/)).toBeInTheDocument();
  });

  it('call-back button calls onCallBack with chatId', () => {
    const onCallBack = jest.fn();
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 60,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={onCallBack} />);
    fireEvent.click(screen.getByLabelText('Call back'));
    expect(onCallBack).toHaveBeenCalledWith('c1');
  });

  it('close button calls onClose', () => {
    const onClose = jest.fn();
    render(<CallHistoryPanel onClose={onClose} onCallBack={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows "s" suffix for calls under 60 seconds', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 30,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText(/30s/)).toBeInTheDocument();
  });

  it('shows "Unknown" for chat not found', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [],
      callHistory: [
        {
          id: 'call1',
          chatId: 'nonexistent',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 60,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('shows video icon for video calls', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'video',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          duration: 60,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows "Declined" for declined calls', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'declined',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText(/Declined/)).toBeInTheDocument();
  });

  it('shows "In progress" for calls without duration', () => {
    mockUseData.mockReturnValue({
      ...baseData,
      chats: [chatAlice],
      callHistory: [
        {
          id: 'call1',
          chatId: 'c1',
          type: 'voice',
          status: 'ended',
          participants: [
            {
              userId: 'alice',
              name: 'Alice',
              avatarColor: '#4da3ff',
              audioMuted: false,
              videoOff: false,
              joinedAt: 1000,
            },
          ],
          startedAt: 1000,
          isGroup: false,
        },
      ],
    });
    render(<CallHistoryPanel onClose={jest.fn()} onCallBack={jest.fn()} />);
    expect(screen.getByText(/In progress/)).toBeInTheDocument();
  });
});
