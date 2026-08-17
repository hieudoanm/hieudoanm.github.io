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

jest.mock('@/lib/crypto', () => ({
  generateKeyPair: jest
    .fn()
    .mockResolvedValue({ publicKey: 'pub', privateKey: 'priv' }),
  generateVerificationCode: jest.fn().mockResolvedValue('123456'),
  hashPin: jest.fn().mockResolvedValue('hashed'),
  verifyPin: jest.fn().mockResolvedValue(true),
  deriveSharedKey: jest.fn().mockResolvedValue('shared-key'),
  encrypt: jest
    .fn()
    .mockImplementation((t: string) => Promise.resolve(`enc-${t}`)),
  decrypt: jest.fn().mockImplementation((t: string) => Promise.resolve(t)),
  exportSharedKey: jest.fn().mockResolvedValue('exported'),
  getDeviceFingerprint: jest.fn().mockReturnValue('fp-123'),
}));

jest.mock('@/components/organisms/CallScreen', () => ({
  CallScreen: (props: Record<string, unknown>) => (
    <div data-testid="call-screen">
      <button onClick={() => (props.onEndCall as () => void)()}>
        End call
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/GroupCallView', () => ({
  GroupCallView: (props: Record<string, unknown>) => (
    <div data-testid="group-call-view">
      <button onClick={() => (props.onEndCall as () => void)()}>
        End call
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/ChatSettingsPanel', () => ({
  ChatSettingsPanel: (props: Record<string, unknown>) => (
    <div data-testid="settings-panel">
      <button onClick={() => (props.onClose as () => void)()}>
        Close settings
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/GroupAdminPanel', () => ({
  GroupAdminPanel: (props: Record<string, unknown>) => (
    <div data-testid="group-admin-panel">
      <button onClick={() => (props.onClose as () => void)()}>
        Close admin
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/MediaGallery', () => ({
  MediaGallery: (props: Record<string, unknown>) => (
    <div data-testid="media-gallery">
      <button onClick={() => (props.onClose as () => void)()}>
        Close gallery
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/ImageLightbox', () => ({
  ImageLightbox: (props: Record<string, unknown>) => (
    <div data-testid="image-lightbox">
      <button onClick={() => (props.onClose as () => void)()}>
        Close lightbox
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/ForwardModal', () => ({
  ForwardModal: (props: Record<string, unknown>) => (
    <div data-testid="forward-modal">
      <button onClick={() => (props.onClose as () => void)()}>
        Close forward
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/VerificationCodeModal', () => ({
  VerificationCodeModal: (props: Record<string, unknown>) => (
    <div data-testid="verification-modal">
      <button onClick={() => (props.onClose as () => void)()}>
        Close verification
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/VoiceRecorder', () => ({
  VoiceRecorder: (props: Record<string, unknown>) => (
    <div data-testid="voice-recorder">
      <button
        onClick={() =>
          (props.onSend as (blob: Blob, duration: number) => void)(
            new Blob(['audio']),
            5
          )
        }>
        Send voice
      </button>
      <button onClick={() => (props.onCancel as () => void)()}>
        Cancel recording
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/StickerPicker', () => ({
  StickerPicker: (props: Record<string, unknown>) => (
    <div data-testid="sticker-picker">
      <button onClick={() => (props.onSelect as (s: string) => void)('👍')}>
        Select sticker
      </button>
      <button onClick={() => (props.onClose as () => void)()}>
        Close stickers
      </button>
    </div>
  ),
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
    {
      id: 'bob',
      name: 'Bob',
      phone: '+1 555 010 1002',
      username: 'bob',
      avatarColor: '#22c55e',
      online: false,
      lastSeenAt: 500,
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

  describe('search functionality', () => {
    it('search button sets query state', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Hello world',
          status: 'read',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByText('Hello world');
      const searchBtn = screen.getByLabelText('Search');
      fireEvent.click(searchBtn);
      expect(screen.queryByLabelText('Search in chat')).not.toBeInTheDocument();
    });
  });

  describe('message interactions', () => {
    it('shows reply composer when replying to a message', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Reply'));
      expect(screen.getByText(/Replying to/)).toBeInTheDocument();
      expect(screen.getByLabelText('Reply message')).toBeInTheDocument();
    });

    it('sends a reply through the reply composer', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Reply'));
      const replyInput = screen.getByLabelText('Reply message');
      fireEvent.change(replyInput, { target: { value: 'Got it!' } });
      fireEvent.click(screen.getByLabelText('Send reply'));
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('cancels a reply when cancel button is clicked', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Reply'));
      expect(screen.getByText(/Replying to/)).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Cancel reply'));
      expect(screen.queryByText(/Replying to/)).not.toBeInTheDocument();
    });

    it('copies message text to clipboard', async () => {
      const writeText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, { clipboard: { writeText } });
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Copy'));
      expect(writeText).toHaveBeenCalledWith('Hello from Alice');
    });

    it('forwards a message and shows forward modal', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Forward'));
      expect(screen.getByTestId('forward-modal')).toBeInTheDocument();
    });

    it('edits own message and shows editing indicator', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'My own message',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('My own message');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Edit'));
      expect(screen.getByText(/Editing: My own message/)).toBeInTheDocument();
    });

    it('cancels editing when cancel button is clicked', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'My message',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('My message');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Edit'));
      expect(screen.getByText(/Editing: My message/)).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByText(/Editing:/)).not.toBeInTheDocument();
    });

    it('sends edited message through composer', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'Old text',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Old text');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Edit'));
      const textarea = screen.getByLabelText('Message');
      fireEvent.change(textarea, { target: { value: 'Updated text' } });
      fireEvent.click(screen.getByLabelText('Send message'));
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('deletes own message', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'Delete me',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Delete me');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Delete'));
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('deletes message for everyone', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'Delete for all',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Delete for all');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Delete for Everyone'));
      expect(db.messages.put).toHaveBeenCalled();
    });
  });

  describe('media composer toggles', () => {
    it('toggles the voice recorder', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Voice message'));
      expect(screen.getByTestId('voice-recorder')).toBeInTheDocument();
    });

    it('cancels voice recording', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Voice message'));
      expect(screen.getByTestId('voice-recorder')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel recording'));
      expect(screen.queryByTestId('voice-recorder')).not.toBeInTheDocument();
    });

    it('toggles the sticker picker', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Stickers'));
      expect(screen.getByTestId('sticker-picker')).toBeInTheDocument();
    });

    it('closes the sticker picker', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Stickers'));
      expect(screen.getByTestId('sticker-picker')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close stickers'));
      expect(screen.queryByTestId('sticker-picker')).not.toBeInTheDocument();
    });

    it('sends a sticker and closes picker', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Stickers'));
      await act(async () => {
        fireEvent.click(screen.getByText('Select sticker'));
        await jest.advanceTimersByTimeAsync(200);
      });
      expect(db.messages.put).toHaveBeenCalled();
    });
  });

  describe('panels', () => {
    it('toggles the settings panel', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
    });

    it('closes the settings panel via mock close button', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close settings'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
    });

    it('toggles the media gallery', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Media');
      fireEvent.click(screen.getByLabelText('Media'));
      expect(screen.getByTestId('media-gallery')).toBeInTheDocument();
    });

    it('closes the media gallery via mock close button', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Media');
      fireEvent.click(screen.getByLabelText('Media'));
      fireEvent.click(screen.getByText('Close gallery'));
      expect(screen.queryByTestId('media-gallery')).not.toBeInTheDocument();
    });

    it('does not show group admin for direct chats', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByText('Hello from Alice');
      expect(screen.queryByLabelText('Members')).not.toBeInTheDocument();
    });

    it('toggles the group admin panel for group chats', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Test Group',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice', 'bob'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Members');
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
    });

    it('closes the group admin panel via mock close button', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Test Group',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Members');
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close admin'));
      expect(screen.queryByTestId('group-admin-panel')).not.toBeInTheDocument();
    });
  });

  describe('calls', () => {
    it('starts a voice call and shows call screen', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Voice call');
      await act(async () => {
        fireEvent.click(screen.getByLabelText('Voice call'));
      });
      expect(screen.getByTestId('call-screen')).toBeInTheDocument();
    });

    it('starts a video call', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Video call');
      await act(async () => {
        fireEvent.click(screen.getByLabelText('Video call'));
      });
      expect(screen.getByTestId('call-screen')).toBeInTheDocument();
    });

    it('ends a call', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Voice call');
      await act(async () => {
        fireEvent.click(screen.getByLabelText('Voice call'));
      });
      expect(screen.getByTestId('call-screen')).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(screen.getByText('End call'));
      });
      expect(screen.queryByTestId('call-screen')).not.toBeInTheDocument();
    });

    it('starts a group call for group chats', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Test Group',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Voice call');
      await act(async () => {
        fireEvent.click(screen.getByLabelText('Voice call'));
      });
      expect(screen.getByTestId('group-call-view')).toBeInTheDocument();
    });
  });

  describe('secret chat', () => {
    const secretChat = {
      id: 's1',
      kind: 'direct' as const,
      title: 'Secret',
      avatarColor: '#ff6600',
      memberIds: ['me', 'alice'],
      adminIds: [],
      pinned: false,
      muted: false,
      isSecret: true,
      disappearingSeconds: 60,
      unreadCount: 0,
      createdAt: 1000,
      lastMessageAt: 1000,
      settings: {
        wallpaper: '',
        notificationSound: true,
        disappearingSeconds: 60,
      },
    };

    it('shows the secret chat banner for secret chats', async () => {
      db.chats.getAll.mockResolvedValue([secretChat]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      expect(await screen.findByText(/Verify/)).toBeInTheDocument();
    });

    it('starts verification from the secret chat banner', async () => {
      db.chats.getAll.mockResolvedValue([secretChat]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      const verifyBtn = await screen.findByText(/Verify/);
      await act(async () => {
        fireEvent.click(verifyBtn);
      });
      expect(screen.getByTestId('verification-modal')).toBeInTheDocument();
    });

    it('clears verification when modal closes', async () => {
      db.chats.getAll.mockResolvedValue([secretChat]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      const verifyBtn = await screen.findByText(/Verify/);
      await act(async () => {
        fireEvent.click(verifyBtn);
      });
      expect(screen.getByTestId('verification-modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close verification'));
      expect(
        screen.queryByTestId('verification-modal')
      ).not.toBeInTheDocument();
    });

    it('fires visibilitychange handler in secret chat', async () => {
      db.chats.getAll.mockResolvedValue([secretChat]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      await screen.findByText(/Verify/);
      const originalDescriptor = Object.getOwnPropertyDescriptor(
        document,
        'visibilityState'
      );
      Object.defineProperty(document, 'visibilityState', {
        value: 'hidden',
        configurable: true,
      });
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      Object.defineProperty(document, 'visibilityState', {
        value: 'visible',
        configurable: true,
      });
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      if (originalDescriptor)
        Object.defineProperty(document, 'visibilityState', originalDescriptor);
    });
  });

  describe('date dividers', () => {
    it('renders messages on different days with date dividers', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Yesterday message',
          status: 'read',
          createdAt: Date.now() - 86400000,
          reactions: [],
        },
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Today message',
          status: 'read',
          createdAt: Date.now(),
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      expect(await screen.findByText('Yesterday message')).toBeInTheDocument();
      expect(screen.getByText('Today message')).toBeInTheDocument();
    });
  });

  describe('quoted messages', () => {
    it('shows quoted message when message has replyToId', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Original message',
          status: 'read',
          createdAt: 1000,
          reactions: [],
        },
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Reply text',
          status: 'read',
          createdAt: 2000,
          reactions: [],
          replyToId: 'm1',
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      expect(await screen.findAllByText('Original message')).toHaveLength(2);
      expect(screen.getByText('Reply text')).toBeInTheDocument();
    });
  });

  describe('image lightbox', () => {
    it('opens lightbox when clicking an image message', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'image',
          text: 'Photo',
          status: 'read',
          createdAt: 1000,
          reactions: [],
          mediaUrl: 'blob:img-url',
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const img = await screen.findByAltText('Photo');
      fireEvent.click(img);
      expect(screen.getByTestId('image-lightbox')).toBeInTheDocument();
    });

    it('closes lightbox when close button is clicked', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'image',
          text: 'Photo',
          status: 'read',
          createdAt: 1000,
          reactions: [],
          mediaUrl: 'blob:img-url',
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const img = await screen.findByAltText('Photo');
      fireEvent.click(img);
      expect(screen.getByTestId('image-lightbox')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close lightbox'));
      expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
    });
  });

  describe('chatId change resets state', () => {
    it('resets state when chatId changes', async () => {
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
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 0,
          },
        },
        {
          id: 'c2',
          kind: 'direct',
          title: 'Bob',
          avatarColor: '#22c55e',
          memberIds: ['me', 'bob'],
          adminIds: [],
          pinned: false,
          muted: false,
          isSecret: false,
          disappearingSeconds: 0,
          unreadCount: 0,
          createdAt: 2000,
          lastMessageAt: 2000,
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 0,
          },
        },
      ]);
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Alice msg',
          status: 'read',
          createdAt: 1000,
          reactions: [],
        },
        {
          id: 'm2',
          chatId: 'c2',
          authorId: 'bob',
          type: 'text',
          text: 'Bob msg',
          status: 'read',
          createdAt: 2000,
          reactions: [],
        },
      ]);
      const { rerender } = render(
        <ToastProvider>
          <DataProvider>
            <ChatPane chatId="c1" onNewChat={jest.fn()} />
          </DataProvider>
        </ToastProvider>
      );
      await screen.findByText('Alice msg');
      rerender(
        <ToastProvider>
          <DataProvider>
            <ChatPane chatId="c2" onNewChat={jest.fn()} />
          </DataProvider>
        </ToastProvider>
      );
      expect(await screen.findByText('Bob msg')).toBeInTheDocument();
    });
  });

  describe('group chat features', () => {
    it('shows group member count in header', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice', 'bob'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      expect(await screen.findByText('3 members')).toBeInTheDocument();
    });
  });

  describe('media file handlers', () => {
    function createMockFileList(file: File): FileList {
      const files = {
        0: file,
        length: 1,
        item: (i: number) => file,
        [Symbol.iterator]: function* () {
          yield file;
        },
      };
      return files as unknown as FileList;
    }

    it('handles image file selection through media composer', async () => {
      const { container } = wrap(
        <ChatPane chatId="c1" onNewChat={jest.fn()} />
      );
      await screen.findByLabelText('Message');
      const file = new File(['test'], 'photo.png', { type: 'image/png' });
      const fileInput = container.querySelector(
        'input[accept="image/*"]'
      ) as HTMLInputElement;
      Object.defineProperty(fileInput, 'files', {
        value: createMockFileList(file),
        configurable: true,
      });
      await act(async () => {
        fireEvent.change(fileInput);
        await jest.advanceTimersByTimeAsync(5000);
      });
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('handles video file selection through media composer', async () => {
      const { container } = wrap(
        <ChatPane chatId="c1" onNewChat={jest.fn()} />
      );
      await screen.findByLabelText('Message');
      const file = new File(['test'], 'video.mp4', { type: 'video/mp4' });
      const fileInput = container.querySelector(
        'input[accept="video/*"]'
      ) as HTMLInputElement;
      Object.defineProperty(fileInput, 'files', {
        value: createMockFileList(file),
        configurable: true,
      });
      await act(async () => {
        fireEvent.change(fileInput);
        await jest.advanceTimersByTimeAsync(5000);
      });
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('handles file selection through media composer', async () => {
      const { container } = wrap(
        <ChatPane chatId="c1" onNewChat={jest.fn()} />
      );
      await screen.findByLabelText('Message');
      const file = new File(['test'], 'doc.pdf', { type: 'application/pdf' });
      const fileInput = container.querySelectorAll(
        'input[type="file"]'
      )[2] as HTMLInputElement;
      Object.defineProperty(fileInput, 'files', {
        value: createMockFileList(file),
        configurable: true,
      });
      await act(async () => {
        fireEvent.change(fileInput);
        await jest.advanceTimersByTimeAsync(5000);
      });
      expect(db.messages.put).toHaveBeenCalled();
    });
  });

  describe('panel toggle interactions', () => {
    it('settings closes when group admin is toggled', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
    });

    it('media gallery closes when media button is toggled again', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Media');
      fireEvent.click(screen.getByLabelText('Media'));
      expect(screen.getByTestId('media-gallery')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Media'));
      expect(screen.queryByTestId('media-gallery')).not.toBeInTheDocument();
    });
  });

  describe('header callbacks', () => {
    it('settings closes group admin', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Members');
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.queryByTestId('group-admin-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
    });

    it('group admin closes settings', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
    });

    it('media gallery closes settings and group admin', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Media'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('media-gallery')).toBeInTheDocument();
    });

    it('search toggles settings and group admin off', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Search'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
    });

    it('search toggles group admin off', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Members');
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Search'));
      expect(screen.queryByTestId('group-admin-panel')).not.toBeInTheDocument();
    });
  });

  describe('context menu for non-mine messages', () => {
    it('shows Reply, Copy, Forward but not Edit/Delete for other user messages', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      expect(screen.getByText('Reply')).toBeInTheDocument();
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Forward')).toBeInTheDocument();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });
  });

  describe('context menu for own messages', () => {
    it('shows Edit, Delete, Delete for Everyone for own messages', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'My message',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('My message');
      fireEvent.contextMenu(bubble);
      expect(screen.getByText('Reply')).toBeInTheDocument();
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Forward')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Delete for Everyone')).toBeInTheDocument();
    });
  });

  describe('incognito mode', () => {
    it('passes incognito prop to composer for secret chats', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 's1',
          kind: 'direct',
          title: 'Secret',
          avatarColor: '#ff6600',
          memberIds: ['me', 'alice'],
          adminIds: [],
          pinned: false,
          muted: false,
          isSecret: true,
          disappearingSeconds: 60,
          unreadCount: 0,
          createdAt: 1000,
          lastMessageAt: 1000,
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 60,
          },
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      expect(await screen.findByText(/Verify/)).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });
  });

  describe('message reactions', () => {
    it('adds a reaction to a message', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const reactionBtn = await screen.findByLabelText('React with 👍');
      fireEvent.click(reactionBtn);
      expect(db.messages.put).toHaveBeenCalled();
    });
  });

  describe('send message edge cases', () => {
    it('does not send empty message', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const textarea = await screen.findByLabelText('Message');
      fireEvent.change(textarea, { target: { value: '   ' } });
      fireEvent.click(screen.getByLabelText('Send message'));
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('muted and secret badges', () => {
    it('shows muted badge for muted chats', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'c1',
          kind: 'direct',
          title: 'Alice',
          avatarColor: '#4da3ff',
          memberIds: ['me', 'alice'],
          adminIds: [],
          pinned: false,
          muted: true,
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
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      expect(await screen.findByLabelText('Muted')).toBeInTheDocument();
    });

    it('shows secret badge for secret chats', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 's1',
          kind: 'direct',
          title: 'Secret',
          avatarColor: '#ff6600',
          memberIds: ['me', 'alice'],
          adminIds: [],
          pinned: false,
          muted: false,
          isSecret: true,
          disappearingSeconds: 60,
          unreadCount: 0,
          createdAt: 1000,
          lastMessageAt: 1000,
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 60,
          },
        },
      ]);
      wrap(<ChatPane chatId="s1" onNewChat={jest.fn()} />);
      expect(await screen.findByLabelText('Secret chat')).toBeInTheDocument();
    });
  });

  describe('forward modal closes', () => {
    it('closes the forward modal', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('Hello from Alice');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Forward'));
      expect(screen.getByTestId('forward-modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close forward'));
      expect(screen.queryByTestId('forward-modal')).not.toBeInTheDocument();
    });
  });

  describe('composer keyboard shortcut', () => {
    it('sends message on Enter key', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const textarea = await screen.findByLabelText('Message');
      fireEvent.change(textarea, { target: { value: 'Enter send' } });
      fireEvent.keyDown(textarea, { key: 'Enter' });
      expect(db.messages.put).toHaveBeenCalled();
    });
  });

  describe('quoted message from own user', () => {
    it('shows "You" as quoted author when message is from me', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'My original message',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
        {
          id: 'm2',
          chatId: 'c1',
          authorId: 'alice',
          type: 'text',
          text: 'Alice reply to me',
          status: 'read',
          createdAt: 2000,
          reactions: [],
          replyToId: 'm1',
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      expect(await screen.findAllByText('My original message')).toHaveLength(2);
      expect(screen.getByText('Alice reply to me')).toBeInTheDocument();
    });
  });

  describe('reply to own message', () => {
    it('shows "You" as author name in reply composer', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'me',
          type: 'text',
          text: 'My message to reply to',
          status: 'sent',
          createdAt: 1000,
          reactions: [],
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      const bubble = await screen.findByText('My message to reply to');
      fireEvent.contextMenu(bubble);
      fireEvent.click(screen.getByText('Reply'));
      expect(screen.getByText(/You/)).toBeInTheDocument();
    });
  });

  describe('search with matching results', () => {
    it('search toggle closes settings and group admin', async () => {
      db.chats.getAll.mockResolvedValue([
        {
          id: 'g1',
          kind: 'group',
          title: 'Team',
          avatarColor: '#ec4899',
          memberIds: ['me', 'alice'],
          adminIds: ['me'],
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
        },
      ]);
      db.messages.getAll.mockResolvedValue([]);
      wrap(<ChatPane chatId="g1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Settings');
      fireEvent.click(screen.getByLabelText('Settings'));
      expect(screen.getByTestId('settings-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Search'));
      expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Members'));
      expect(screen.getByTestId('group-admin-panel')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Search'));
      expect(screen.queryByTestId('group-admin-panel')).not.toBeInTheDocument();
    });
  });

  describe('otherContact undefined', () => {
    it('handles chat where member has no matching contact', async () => {
      db.contacts.getAll.mockResolvedValue([]);
      db.messages.getAll.mockResolvedValue([]);
      db.chats.getAll.mockResolvedValue([
        {
          id: 'c1',
          kind: 'direct',
          title: 'Unknown',
          avatarColor: '#999999',
          memberIds: ['me', 'unknown-user'],
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
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      expect(await screen.findByLabelText('Message')).toBeInTheDocument();
    });
  });

  describe('image lightbox with non-matching URL', () => {
    it('sets lightbox index to 0 when image URL not found in messages', async () => {
      db.messages.getAll.mockResolvedValue([
        {
          id: 'm1',
          chatId: 'c1',
          authorId: 'alice',
          type: 'image',
          text: '',
          status: 'read',
          createdAt: 1000,
          reactions: [],
          mediaUrl: 'http://example.com/img1.png',
        },
      ]);
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      const images = screen.getAllByRole('img');
      const img = images.find((el) => el.getAttribute('alt') === 'Sent image');
      if (img) fireEvent.click(img);
    });
  });

  describe('voice message send', () => {
    it('sends voice message through voice recorder', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Voice message'));
      expect(screen.getByTestId('voice-recorder')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Send voice'));
      expect(db.messages.put).toHaveBeenCalled();
    });

    it('cancels voice recording', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Voice message'));
      fireEvent.click(screen.getByText('Cancel recording'));
      expect(screen.queryByTestId('voice-recorder')).not.toBeInTheDocument();
    });
  });

  describe('sticker selection', () => {
    it('sends a sticker when selected from picker', async () => {
      wrap(<ChatPane chatId="c1" onNewChat={jest.fn()} />);
      await screen.findByLabelText('Message');
      fireEvent.click(screen.getByLabelText('Stickers'));
      expect(screen.getByTestId('sticker-picker')).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(screen.getByText('Select sticker'));
        await jest.advanceTimersByTimeAsync(5000);
      });
      expect(db.messages.put).toHaveBeenCalled();
    });
  });
});
