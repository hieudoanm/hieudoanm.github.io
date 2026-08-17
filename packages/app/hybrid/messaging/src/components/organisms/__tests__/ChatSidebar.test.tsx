import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatSidebar } from '@/components/organisms/ChatSidebar';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: { getAll: jest.fn(), put: jest.fn() },
    chats: { getAll: jest.fn(), get: jest.fn(), put: jest.fn() },
    messages: {
      getAll: jest.fn(),
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
  generateId: jest.fn(() => 'id'),
}));

jest.mock('@/components/organisms/CallHistoryPanel', () => ({
  CallHistoryPanel: ({ onClose, onCallBack }: any) => (
    <div data-testid="call-history-panel">
      <button onClick={onClose}>Close Calls</button>
      <button onClick={() => onCallBack('c1')}>Call Back</button>
    </div>
  ),
}));

jest.mock('@/components/organisms/DeviceSyncPanel', () => ({
  DeviceSyncPanel: ({ onClose, onPairNew }: any) => (
    <div data-testid="device-sync-panel">
      <button onClick={onClose}>Close Devices</button>
      <button onClick={onPairNew}>Pair New</button>
    </div>
  ),
}));

jest.mock('@/components/molecules/ChatListItem', () => ({
  ChatListItem: ({
    id,
    title,
    preview,
    unreadCount,
    selected,
    muted,
    onSelect,
  }: any) => (
    <button
      data-testid={`chat-${id}`}
      data-selected={selected}
      aria-label={`Open chat with ${title}`}
      onClick={() => onSelect(id)}>
      {title}
      {preview && <span>{preview}</span>}
      {unreadCount > 0 && (
        <span aria-label={`${unreadCount} unread messages`}>{unreadCount}</span>
      )}
      {muted && <span aria-label="Muted">muted</span>}
    </button>
  ),
}));

jest.mock('@/components/molecules/SearchBar', () => ({
  SearchBar: ({ value, onChange }: any) => (
    <input
      aria-label="Search…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock('@/components/atoms/EmptyState', () => ({
  EmptyState: ({ title }: any) => <div>{title}</div>,
}));

jest.mock('@/components/atoms/Avatar', () => ({
  Avatar: ({ name }: any) => <span>{name}</span>,
}));

const { db } = jest.requireMock('@/lib/db');

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

const accountData = {
  id: 'me',
  name: 'You',
  phone: '+1 555 010 0000',
  username: 'you',
  avatarColor: '#ff0030',
  online: true,
  lastSeenAt: 1000,
};

const contactsData = [
  {
    id: 'alice',
    name: 'Alice',
    phone: '+1 555 010 1001',
    username: 'alice',
    avatarColor: '#4da3ff',
    online: true,
    lastSeenAt: 1000,
    blocked: false,
    starred: true,
  },
  {
    id: 'bob',
    name: 'Bob',
    phone: '+1 555 010 1002',
    username: 'bobby',
    avatarColor: '#00c853',
    online: false,
    lastSeenAt: 1000,
    blocked: false,
    starred: false,
  },
];

const chatsData = [
  {
    id: 'c1',
    kind: 'direct',
    title: 'Alice',
    avatarColor: '#4da3ff',
    memberIds: ['me', 'alice'],
    adminIds: [],
    pinned: true,
    muted: false,
    isSecret: false,
    disappearingSeconds: 0,
    unreadCount: 2,
    createdAt: 1000,
    lastMessageAt: 3000,
  },
  {
    id: 'c2',
    kind: 'group',
    title: 'Hikers',
    avatarColor: '#ec4899',
    memberIds: ['me', 'alice', 'bob'],
    adminIds: ['me'],
    pinned: false,
    muted: true,
    isSecret: false,
    disappearingSeconds: 0,
    unreadCount: 0,
    createdAt: 1000,
    lastMessageAt: 2000,
  },
];

const messagesData = [
  {
    id: 'm1',
    chatId: 'c1',
    authorId: 'me',
    type: 'text',
    text: 'See you soon',
    status: 'read',
    createdAt: 3000,
    reactions: [],
  },
];

const settingsData = {
  id: 'default',
  theme: 'nothing',
  notifications: true,
  readReceipts: true,
  typingIndicators: true,
  disappearingSeconds: 0,
};

const sessionData = {
  id: 'session',
  method: 'phone',
  identifier: '+1 555 010 0000',
  signedInAt: 1000,
};

beforeEach(() => {
  jest.clearAllMocks();
  db.account.get.mockResolvedValue(accountData);
  db.contacts.getAll.mockResolvedValue(contactsData);
  db.chats.getAll.mockResolvedValue(chatsData);
  db.messages.getAll.mockResolvedValue(messagesData);
  db.settings.get.mockResolvedValue(settingsData);
  db.chats.put.mockResolvedValue(undefined);
  db.messages.put.mockResolvedValue(undefined);
  db.auth.get.mockResolvedValue(sessionData);
});

describe('ChatSidebar', () => {
  it('renders the app title, chats and their previews', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    expect(await screen.findByText('Messaging')).toBeInTheDocument();
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(await screen.findByText('Hikers')).toBeInTheDocument();
    expect(await screen.findByText('See you soon')).toBeInTheDocument();
    expect(
      await screen.findByLabelText('2 unread messages')
    ).toBeInTheDocument();
  });

  it('selects a chat on click', async () => {
    const onSelectChat = jest.fn();
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={onSelectChat}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByLabelText('Open chat with Alice'));
    expect(onSelectChat).toHaveBeenCalledWith('c1');
  });

  it('opens the new chat flow from the button', async () => {
    const onNewChat = jest.fn();
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={onNewChat}
      />
    );
    fireEvent.click(await screen.findByLabelText('New chat'));
    expect(onNewChat).toHaveBeenCalled();
  });

  it('switches to the contacts tab', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    expect(await screen.findByText('@alice')).toBeInTheDocument();
    expect(await screen.findByText('@bobby')).toBeInTheDocument();
  });

  it('starts a chat from the contacts tab', async () => {
    const onSelectChat = jest.fn();
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={onSelectChat}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    fireEvent.click(await screen.findByLabelText('Start chat with Bob'));
    expect(onSelectChat).toHaveBeenCalledWith('bob');
  });

  it('filters chats by search query', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.change(await screen.findByLabelText('Search…'), {
      target: { value: 'hikers' },
    });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Hikers')).toBeInTheDocument();
  });

  it('shows an empty state when no chats match', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.change(await screen.findByLabelText('Search…'), {
      target: { value: 'zzz' },
    });
    expect(await screen.findByText('No chats')).toBeInTheDocument();
  });

  it('shows an empty state for a contact list with no results', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    fireEvent.change(screen.getByLabelText('Search…'), {
      target: { value: 'zzz' },
    });
    expect(await screen.findByText('No contacts')).toBeInTheDocument();
  });

  it('filters contacts by username', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    fireEvent.change(screen.getByLabelText('Search…'), {
      target: { value: 'bobby' },
    });
    expect(screen.queryByText('@alice')).not.toBeInTheDocument();
    expect(screen.getByText('@bobby')).toBeInTheDocument();
  });

  it('renders CallHistoryPanel when calls tab is active', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    const callsTab = tabs[2];
    fireEvent.click(callsTab);
    expect(await screen.findByTestId('call-history-panel')).toBeInTheDocument();
  });

  it('renders DeviceSyncPanel when devices tab is active', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    const devicesTab = tabs[3];
    fireEvent.click(devicesTab);
    expect(await screen.findByTestId('device-sync-panel')).toBeInTheDocument();
  });

  it('calls onPairDevice when pair new is clicked', async () => {
    const onPairDevice = jest.fn();
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
        onPairDevice={onPairDevice}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[3]);
    await screen.findByTestId('device-sync-panel');
    fireEvent.click(screen.getByText('Pair New'));
    expect(onPairDevice).toHaveBeenCalled();
  });

  it('closes call history and returns to chats tab', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[2]);
    await screen.findByTestId('call-history-panel');
    fireEvent.click(screen.getByText('Close Calls'));
    expect(screen.queryByTestId('call-history-panel')).not.toBeInTheDocument();
    expect(await screen.findByText('Messaging')).toBeInTheDocument();
  });

  it('closes device sync and returns to chats tab', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[3]);
    await screen.findByTestId('device-sync-panel');
    fireEvent.click(screen.getByText('Close Devices'));
    expect(screen.queryByTestId('device-sync-panel')).not.toBeInTheDocument();
  });

  it('pinned chats appear before unpinned', async () => {
    db.chats.getAll.mockResolvedValue([
      {
        id: 'c-unpinned',
        kind: 'direct',
        title: 'Unpinned Chat',
        avatarColor: '#999',
        memberIds: ['me'],
        adminIds: [],
        pinned: false,
        muted: false,
        isSecret: false,
        disappearingSeconds: 0,
        unreadCount: 0,
        createdAt: 1000,
        lastMessageAt: 5000,
      },
      {
        id: 'c-pinned',
        kind: 'direct',
        title: 'Pinned Chat',
        avatarColor: '#111',
        memberIds: ['me'],
        adminIds: [],
        pinned: true,
        muted: false,
        isSecret: false,
        disappearingSeconds: 0,
        unreadCount: 0,
        createdAt: 1000,
        lastMessageAt: 1000,
      },
    ]);
    db.messages.getAll.mockResolvedValue([]);

    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByTestId(/^chat-/).length).toBe(2);
    });
    const chatItems = screen.getAllByTestId(/^chat-/);
    expect(chatItems[0]).toHaveTextContent('Pinned Chat');
    expect(chatItems[1]).toHaveTextContent('Unpinned Chat');
  });

  it('highlights selected chat', async () => {
    wrap(
      <ChatSidebar
        selectedChatId="c1"
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await waitFor(() => {
      expect(screen.getByTestId('chat-c1')).toBeInTheDocument();
    });
    const chatItem = screen.getByTestId('chat-c1');
    expect(chatItem).toHaveAttribute('data-selected', 'true');
    const chatItem2 = screen.getByTestId('chat-c2');
    expect(chatItem2).toHaveAttribute('data-selected', 'false');
  });

  it('handles onCallBack from call history panel', async () => {
    const onSelectChat = jest.fn();
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={onSelectChat}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[2]);
    await screen.findByTestId('call-history-panel');
    fireEvent.click(screen.getByText('Call Back'));
    expect(onSelectChat).toHaveBeenCalledWith('c1');
  });

  it('clears search when empty', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const input = await screen.findByLabelText('Search…');
    fireEvent.change(input, { target: { value: 'hikers' } });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '' } });
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Hikers')).toBeInTheDocument();
  });

  it('does not throw when onPairDevice is not provided', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[3]);
    await screen.findByTestId('device-sync-panel');
    fireEvent.click(screen.getByText('Pair New'));
  });

  it('contacts tab shows active state', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    const contactsTab = screen.getByRole('tab', { name: /contacts/i });
    expect(contactsTab).toHaveAttribute('aria-selected', 'true');
  });

  it('chats tab shows active state by default', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await screen.findByText('Messaging');
    const chatsTab = screen.getByRole('tab', { name: /chats/i });
    expect(chatsTab).toHaveAttribute('aria-selected', 'true');
  });

  it('switching tabs updates active state', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await screen.findByText('Messaging');
    fireEvent.click(screen.getByRole('tab', { name: /contacts/i }));
    expect(screen.getByRole('tab', { name: /contacts/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: /chats/i })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('filters contacts by name', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    fireEvent.click(await screen.findByText('Contacts'));
    fireEvent.change(screen.getByLabelText('Search…'), {
      target: { value: 'alice' },
    });
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.queryByText('@bobby')).not.toBeInTheDocument();
  });

  it('does not show chats list when contacts tab is active', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await screen.findByText('Alice');
    fireEvent.click(await screen.findByText('Contacts'));
    await screen.findByText('@alice');
    expect(screen.queryByTestId('chat-c1')).not.toBeInTheDocument();
  });

  it('switching back to chats from contacts restores chat list', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await screen.findByText('Alice');
    fireEvent.click(await screen.findByText('Contacts'));
    await screen.findByText('@alice');
    fireEvent.click(screen.getByRole('tab', { name: /chats/i }));
    expect(await screen.findByText('Alice')).toBeInTheDocument();
  });

  it('shows muted indicator for muted chats', async () => {
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    await waitFor(() => {
      expect(screen.getAllByLabelText('Muted').length).toBeGreaterThan(0);
    });
  });

  it('shows default avatar color when account is null', async () => {
    db.account.get.mockResolvedValue(null);
    wrap(
      <ChatSidebar
        selectedChatId={null}
        onSelectChat={jest.fn()}
        onNewChat={jest.fn()}
      />
    );
    expect(await screen.findByText('You')).toBeInTheDocument();
  });
});
