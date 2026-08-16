import { render, screen, fireEvent } from '@testing-library/react';
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

const { db } = jest.requireMock('@/lib/db');

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  db.account.get.mockResolvedValue({
    id: 'me',
    name: 'You',
    phone: '+1 555 010 0000',
    username: 'you',
    avatarColor: '#ff0030',
    online: true,
    lastSeenAt: 1000,
  });
  db.contacts.getAll.mockResolvedValue([
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
      username: 'bob',
      avatarColor: '#00c853',
      online: false,
      lastSeenAt: 1000,
      blocked: false,
      starred: false,
    },
  ]);
  db.chats.getAll.mockResolvedValue([
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
  ]);
  db.messages.getAll.mockResolvedValue([
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
  ]);
  db.settings.get.mockResolvedValue({
    id: 'default',
    theme: 'nothing',
    notifications: true,
    readReceipts: true,
    typingIndicators: true,
    disappearingSeconds: 0,
  });
  db.chats.put.mockResolvedValue(undefined);
  db.messages.put.mockResolvedValue(undefined);
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
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
    expect(await screen.findByText('@bob')).toBeInTheDocument();
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
});
