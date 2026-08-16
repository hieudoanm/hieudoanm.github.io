import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatPane } from '@/components/organisms/ChatPane';
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
  jest.useFakeTimers();
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
  ]);
  db.chats.getAll.mockResolvedValue([
    {
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
    },
  ]);
  db.messages.getAll.mockResolvedValue([
    {
      id: 'm1',
      chatId: 'c1',
      authorId: 'alice',
      type: 'text',
      text: 'Hello from Alice',
      status: 'read',
      createdAt: 1000,
      reactions: [{ emoji: '👍', authorId: 'me', createdAt: 1100 }],
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

afterEach(() => {
  jest.useRealTimers();
});

describe('ChatPane', () => {
  it('shows an empty state when no chat is selected', async () => {
    wrap(<ChatPane chatId={null} onNewChat={jest.fn()} />);
    expect(await screen.findByText('Select a chat')).toBeInTheDocument();
  });

  it('renders the chat header, messages and composer', async () => {
    wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
    expect((await screen.findAllByText('Alice')).length).toBeGreaterThan(0);
    expect(await screen.findByText('Hello from Alice')).toBeInTheDocument();
    expect(await screen.findByLabelText('Message')).toBeInTheDocument();
    expect(await screen.findByLabelText('React with 👍')).toBeInTheDocument();
  });

  it('marks the chat read when opened', async () => {
    wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
    await screen.findByText('Hello from Alice');
  });

  it('sends a message through the composer', async () => {
    wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
    const textarea = await screen.findByLabelText('Message');
    fireEvent.change(textarea, { target: { value: 'Hey Alice' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    expect(db.messages.put).toHaveBeenCalled();
    expect(await screen.findByText('Hey Alice')).toBeInTheDocument();
  });

  it('shows the empty message hint when a chat has no messages', async () => {
    db.messages.getAll.mockResolvedValue([]);
    wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
    expect(
      await screen.findByText('No messages yet — say hello!')
    ).toBeInTheDocument();
  });

  it('triggers the new chat flow from the header', async () => {
    const onNewChat = jest.fn();
    wrap(<ChatPane chatId="c1" onNewChat={onNewChat} />);
    fireEvent.click(await screen.findByLabelText('New chat'));
    expect(onNewChat).toHaveBeenCalled();
  });

  it('renders a back button when onBack is provided', async () => {
    const onBack = jest.fn();
    wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} onBack={onBack} />);
    fireEvent.click(await screen.findByLabelText('Back'));
    expect(onBack).toHaveBeenCalled();
  });
});
