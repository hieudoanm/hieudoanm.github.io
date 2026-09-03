import { render, screen, fireEvent } from '@testing-library/react';
import { AppShell } from '@/components/templates/AppShell';
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
  db.contacts.getAll.mockResolvedValue([]);
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
      text: 'hi',
      status: 'read',
      createdAt: 1000,
      reactions: [],
    },
  ]);
  db.settings.get.mockResolvedValue({
    id: 'default',
    theme: 'messaging-light',
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

describe('AppShell', () => {
  it('shows the sidebar and chat pane when a chat is selected', async () => {
    wrap(<AppShell selectedChatId="c1" onSelectChat={jest.fn()} />);
    expect(await screen.findByText('Messaging')).toBeInTheDocument();
    expect((await screen.findAllByText('hi')).length).toBeGreaterThan(0);
  });

  it('shows the sidebar without a chat pane when nothing is selected', async () => {
    wrap(<AppShell selectedChatId={null} onSelectChat={jest.fn()} />);
    expect(await screen.findByText('Messaging')).toBeInTheDocument();
  });

  it('selecting a chat updates the pane via onSelectChat', async () => {
    const onSelectChat = jest.fn();
    wrap(<AppShell selectedChatId={null} onSelectChat={onSelectChat} />);
    fireEvent.click(await screen.findByLabelText('Open chat with Alice'));
    expect(onSelectChat).toHaveBeenCalledWith('c1');
  });

  it('clears the selection with the back button', async () => {
    const onSelectChat = jest.fn();
    wrap(<AppShell selectedChatId="c1" onSelectChat={onSelectChat} />);
    fireEvent.click(await screen.findByLabelText('Back'));
    expect(onSelectChat).toHaveBeenCalledWith(null);
  });

  it('opens and closes the new chat modal', async () => {
    wrap(<AppShell selectedChatId={null} onSelectChat={jest.fn()} />);
    fireEvent.click(await screen.findByLabelText('New chat'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
