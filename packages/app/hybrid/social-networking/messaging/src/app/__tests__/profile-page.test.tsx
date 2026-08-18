import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '@/app/(auth)/profile/page';
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

const renderPage = () =>
  render(
    <ToastProvider>
      <DataProvider>
        <ProfilePage />
      </DataProvider>
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
      authorId: 'me',
      type: 'text',
      text: 'hi',
      status: 'read',
      createdAt: 1000,
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
  db.account.put.mockResolvedValue(undefined);
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
});

describe('ProfilePage', () => {
  it('renders account info and statistics', async () => {
    renderPage();
    expect(await screen.findByText('Profile')).toBeInTheDocument();
    expect(await screen.findByText('You')).toBeInTheDocument();
    expect(
      await screen.findByText('@you · +1 555 010 0000')
    ).toBeInTheDocument();
    expect((await screen.findAllByText('1')).length).toBeGreaterThan(0);
  });

  it('edits the display name', async () => {
    renderPage();
    fireEvent.click(await screen.findByText('Edit'));
    fireEvent.change(screen.getByLabelText('Display name'), {
      target: { value: 'Jane' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(db.account.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Jane' })
    );
    expect(await screen.findByText('Jane')).toBeInTheDocument();
  });

  it('cancels the edit without saving', async () => {
    renderPage();
    fireEvent.click(await screen.findByText('Edit'));
    fireEvent.change(screen.getByLabelText('Display name'), {
      target: { value: 'Jane' },
    });
    fireEvent.click(screen.getByText('Cancel'));
    expect(db.account.put).not.toHaveBeenCalled();
  });
});
