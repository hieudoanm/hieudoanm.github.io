import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewChatModal } from '@/components/organisms/NewChatModal';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastViewport } from '@/components/molecules/ToastViewport';

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
  generateId: jest.fn(() => 'gen-id'),
}));

const { db } = jest.requireMock('@/lib/db');

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
      <ToastViewport />
    </ToastProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  db.account.get.mockResolvedValue(null);
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
      starred: false,
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
  db.chats.getAll.mockResolvedValue([]);
  db.messages.getAll.mockResolvedValue([]);
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

describe('NewChatModal', () => {
  it('renders nothing when closed', () => {
    const { container } = wrap(
      <NewChatModal
        open={false}
        onClose={jest.fn()}
        onChatCreated={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('starts a direct chat from a contact', async () => {
    const onChatCreated = jest.fn();
    const onClose = jest.fn();
    wrap(<NewChatModal open onClose={onClose} onChatCreated={onChatCreated} />);
    fireEvent.click(await screen.findByLabelText('Start chat with Alice'));
    await waitFor(() => {
      expect(onChatCreated).toHaveBeenCalled();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('creates a group with selected members', async () => {
    const onChatCreated = jest.fn();
    wrap(
      <NewChatModal open onClose={jest.fn()} onChatCreated={onChatCreated} />
    );
    fireEvent.click(await screen.findByText('Group'));
    fireEvent.change(screen.getByLabelText('Group name'), {
      target: { value: 'Hikers' },
    });
    fireEvent.click(screen.getByLabelText('Select Alice'));
    fireEvent.click(screen.getByLabelText('Select Bob'));
    fireEvent.click(screen.getByLabelText('Create group'));
    await waitFor(() => {
      expect(onChatCreated).toHaveBeenCalledWith('gen-id');
    });
    expect(db.chats.put).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: 'group',
        title: 'Hikers',
        memberIds: ['me', 'alice', 'bob'],
      })
    );
  });

  it('warns when creating a group without members', async () => {
    wrap(<NewChatModal open onClose={jest.fn()} onChatCreated={jest.fn()} />);
    fireEvent.click(await screen.findByText('Group'));
    fireEvent.click(screen.getByLabelText('Create group'));
    expect(
      await screen.findByText('Pick at least one member')
    ).toBeInTheDocument();
    expect(db.chats.put).not.toHaveBeenCalled();
  });

  it('closes via the close button', async () => {
    const onClose = jest.fn();
    wrap(<NewChatModal open onClose={onClose} onChatCreated={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
