import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import type { Conversation, Message, Folder, Settings } from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    conversations: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    messages: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      getByConversation: jest.fn(),
      deleteByConversation: jest.fn(),
    },
    folders: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    settings: { get: jest.fn(), put: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateConversation: jest.fn(),
  generateMessage: jest.fn(),
  generateAIResponse: jest.fn(),
}));

const { db } = jest.requireMock('@/lib/db');
const {
  seedDatabase,
  generateConversation,
  generateMessage,
  generateAIResponse,
} = jest.requireMock('@/data/seed');

const conversation = (
  id: string,
  overrides: Partial<Conversation> = {}
): Conversation => ({
  id,
  title: `Conv ${id}`,
  model: 'gpt-4o',
  createdAt: 1000,
  updatedAt: 1000,
  pinned: false,
  archived: false,
  ...overrides,
});

const message = (
  id: string,
  conversationId: string,
  role: 'user' | 'assistant' = 'user',
  overrides: Partial<Message> = {}
): Message => ({
  id,
  conversationId,
  role,
  content: 'hello',
  timestamp: 1000,
  ...overrides,
});

const folder = (id: string): Folder => ({
  id,
  name: `Folder ${id}`,
  createdAt: 1000,
});

const settings: Settings = {
  theme: 'nothing',
  defaultModel: 'gpt-4o',
  systemPrompt: '',
  mockDelay: 800,
};

const Consumer = () => {
  const data = useData();
  return (
    <div>
      <span data-testid="conv-count">{data.conversations.length}</span>
      <span data-testid="conv-title">{data.conversations[0]?.title}</span>
      <span data-testid="conv-pinned">
        {String(data.conversations[0]?.pinned)}
      </span>
      <span data-testid="conv-archived">
        {String(data.conversations[0]?.archived)}
      </span>
      <span data-testid="msg-count">{data.messages.length}</span>
      <span data-testid="folder-count">{data.folders.length}</span>
      <span data-testid="theme">{data.settings.theme}</span>
      <span data-testid="current-id">{data.currentConversation?.id}</span>
      <span data-testid="current-msg-count">{data.currentMessages.length}</span>
      <span data-testid="is-loading">{String(data.isLoading)}</span>
      <button onClick={() => data.createConversation()}>
        create-conversation
      </button>
      <button onClick={() => data.createConversation('claude-3.5')}>
        create-conversation-model
      </button>
      <button onClick={() => data.deleteConversation('conv-1')}>
        delete-conversation
      </button>
      <button onClick={() => data.renameConversation('conv-1', 'Renamed')}>
        rename-conversation
      </button>
      <button onClick={() => data.renameConversation('missing', 'X')}>
        rename-missing
      </button>
      <button onClick={() => data.duplicateConversation('conv-1')}>
        duplicate-conversation
      </button>
      <button
        onClick={() => data.duplicateConversation('missing').catch(() => {})}>
        duplicate-missing
      </button>
      <button
        onClick={() => data.setCurrentConversation(conversation('conv-1'))}>
        set-current
      </button>
      <button onClick={() => data.setCurrentConversation(null)}>
        clear-current
      </button>
      <button onClick={() => data.sendMessage('hi')}>send-message</button>
      <button onClick={() => data.deleteMessage('m1')}>delete-message</button>
      <button onClick={() => data.updateMessageReaction('m1', 'thumbs-up')}>
        reaction
      </button>
      <button onClick={() => data.updateMessageReaction('m1', null)}>
        reaction-null
      </button>
      <button
        onClick={() => data.updateMessageReaction('missing', 'thumbs-up')}>
        reaction-missing
      </button>
      <button onClick={() => data.togglePin('conv-1')}>toggle-pin</button>
      <button onClick={() => data.togglePin('missing')}>
        toggle-pin-missing
      </button>
      <button onClick={() => data.toggleArchive('conv-1')}>
        toggle-archive
      </button>
      <button onClick={() => data.toggleArchive('missing')}>
        toggle-archive-missing
      </button>
      <button onClick={() => data.createFolder('New Folder')}>
        create-folder
      </button>
      <button onClick={() => data.deleteFolder('f1')}>delete-folder</button>
      <button onClick={() => data.moveToFolder('conv-1', 'f1')}>
        move-to-folder
      </button>
      <button onClick={() => data.moveToFolder('missing', 'f1')}>
        move-to-folder-missing
      </button>
      <button onClick={() => data.updateSettings({ theme: 'dark' })}>
        update-settings
      </button>
      <button onClick={() => data.refreshData()}>refresh</button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <DataProvider>
      <Consumer />
    </DataProvider>
  );

const seedStore = () => {
  db.conversations.getAll.mockResolvedValue([
    conversation('conv-1', { updatedAt: 2000, pinned: true }),
    conversation('conv-2', { updatedAt: 1000 }),
  ]);
  db.messages.getAll.mockResolvedValue([
    message('m1', 'conv-1'),
    message('m2', 'conv-1', 'assistant'),
    message('m3', 'conv-2'),
  ]);
  db.folders.getAll.mockResolvedValue([folder('f1')]);
  db.settings.get.mockResolvedValue(settings);
};

describe('DataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStore();
    db.conversations.get.mockImplementation((id: string) => {
      if (id === 'missing') return Promise.resolve(undefined);
      if (id === 'conv-1')
        return Promise.resolve(conversation('conv-1', { pinned: true }));
      return Promise.resolve(conversation(id));
    });
    db.messages.get.mockImplementation((id: string) =>
      Promise.resolve(id === 'missing' ? undefined : message(id, 'conv-1'))
    );
    generateConversation.mockImplementation((model: string) =>
      Promise.resolve(conversation('new-1', { model }))
    );
    generateMessage.mockImplementation(
      (
        conversationId: string,
        role: 'user' | 'assistant',
        content: string,
        model?: string
      ) =>
        Promise.resolve(
          message(`new-${conversationId}-${role}`, conversationId, role, {
            content,
            model,
          })
        )
    );
    generateAIResponse.mockReturnValue('mock AI response');
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
    spy.mockRestore();
  });

  it('loads data on mount, seeds the database, and sorts conversations', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    expect(seedDatabase).toHaveBeenCalled();
    expect(screen.getByTestId('conv-title').textContent).toBe('Conv conv-1');
    expect(screen.getByTestId('msg-count').textContent).toBe('3');
    expect(screen.getByTestId('folder-count').textContent).toBe('1');
    expect(screen.getByTestId('theme').textContent).toBe('nothing');
    expect(screen.getByTestId('is-loading').textContent).toBe('false');
    expect(screen.getByTestId('current-msg-count').textContent).toBe('0');
  });

  it('creates a conversation with the default model', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create-conversation'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('3')
    );
    expect(generateConversation).toHaveBeenCalledWith('gpt-4o');
    expect(screen.getByTestId('conv-title').textContent).toBe('Conv new-1');
  });

  it('creates a conversation with an explicit model', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create-conversation-model'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('3')
    );
    expect(generateConversation).toHaveBeenCalledWith('claude-3.5');
  });

  it('deletes a conversation and its messages', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('delete-conversation'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('1')
    );
    expect(db.conversations.delete).toHaveBeenCalledWith('conv-1');
    expect(db.messages.deleteByConversation).toHaveBeenCalledWith('conv-1');
    expect(screen.getByTestId('msg-count').textContent).toBe('1');
  });

  it('renames a conversation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('rename-conversation'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-title').textContent).toBe('Renamed')
    );
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Renamed' })
    );
  });

  it('no-ops when renaming a missing conversation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('rename-missing'));
    await waitFor(() =>
      expect(db.conversations.get).toHaveBeenCalledWith('missing')
    );
    expect(db.conversations.put).not.toHaveBeenCalled();
  });

  it('duplicates a conversation with its messages', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    db.conversations.getAll.mockResolvedValue([
      conversation('conv-1', { updatedAt: 2000 }),
      conversation('conv-2'),
      conversation('new-1'),
    ]);
    fireEvent.click(screen.getByText('duplicate-conversation'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('3')
    );
    expect(generateConversation).toHaveBeenCalledWith('gpt-4o');
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Conv conv-1 (Copy)' })
    );
    expect(generateMessage).toHaveBeenCalledTimes(2);
  });

  it('throws when duplicating a missing conversation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fireEvent.click(screen.getByText('duplicate-missing'));
    await waitFor(() =>
      expect(db.conversations.get).toHaveBeenCalledWith('missing')
    );
    expect(generateConversation).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('shows messages for the current conversation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('set-current'));
    await waitFor(() =>
      expect(screen.getByTestId('current-id').textContent).toBe('conv-1')
    );
    expect(screen.getByTestId('current-msg-count').textContent).toBe('2');
  });

  it('sendMessage without a current conversation does nothing', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('send-message'));
    await waitFor(() => {
      expect(generateMessage).not.toHaveBeenCalled();
    });
  });

  it('sendMessage writes user and assistant messages', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('set-current'));
    await waitFor(() =>
      expect(screen.getByTestId('current-id').textContent).toBe('conv-1')
    );
    fireEvent.click(screen.getByText('send-message'));
    await waitFor(() =>
      expect(generateMessage).toHaveBeenCalledWith('conv-1', 'user', 'hi')
    );
    expect(generateAIResponse).toHaveBeenCalledWith('gpt-4o');
    expect(generateMessage).toHaveBeenCalledWith(
      'conv-1',
      'assistant',
      'mock AI response',
      'gpt-4o'
    );
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'conv-1', model: 'gpt-4o' })
    );
  });

  it('deletes a message', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('msg-count').textContent).toBe('3')
    );
    fireEvent.click(screen.getByText('delete-message'));
    await waitFor(() =>
      expect(screen.getByTestId('msg-count').textContent).toBe('2')
    );
    expect(db.messages.delete).toHaveBeenCalledWith('m1');
  });

  it('updates a message reaction and clears it', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('msg-count').textContent).toBe('3')
    );
    fireEvent.click(screen.getByText('reaction'));
    await waitFor(() =>
      expect(db.messages.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'm1', reaction: 'thumbs-up' })
      )
    );
    fireEvent.click(screen.getByText('reaction-null'));
    await waitFor(() =>
      expect(db.messages.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'm1', reaction: null })
      )
    );
  });

  it('no-ops when updating a missing message reaction', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('msg-count').textContent).toBe('3')
    );
    fireEvent.click(screen.getByText('reaction-missing'));
    await waitFor(() =>
      expect(db.messages.get).toHaveBeenCalledWith('missing')
    );
    expect(db.messages.put).not.toHaveBeenCalled();
  });

  it('toggles a conversation pin', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-pinned').textContent).toBe('true')
    );
    fireEvent.click(screen.getByText('toggle-pin'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-pinned').textContent).toBe('false')
    );
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'conv-1', pinned: false })
    );
  });

  it('no-ops when toggling a missing conversation pin', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('toggle-pin-missing'));
    await waitFor(() =>
      expect(db.conversations.get).toHaveBeenCalledWith('missing')
    );
    expect(db.conversations.put).not.toHaveBeenCalled();
  });

  it('toggles a conversation archive', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-archived').textContent).toBe('false')
    );
    fireEvent.click(screen.getByText('toggle-archive'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-archived').textContent).toBe('true')
    );
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'conv-1', archived: true })
    );
  });

  it('no-ops when toggling a missing conversation archive', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('toggle-archive-missing'));
    await waitFor(() =>
      expect(db.conversations.get).toHaveBeenCalledWith('missing')
    );
    expect(db.conversations.put).not.toHaveBeenCalled();
  });

  it('creates a folder', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('folder-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('create-folder'));
    await waitFor(() =>
      expect(screen.getByTestId('folder-count').textContent).toBe('2')
    );
    expect(db.folders.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New Folder' })
    );
  });

  it('deletes a folder', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('folder-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('delete-folder'));
    await waitFor(() =>
      expect(screen.getByTestId('folder-count').textContent).toBe('0')
    );
    expect(db.folders.delete).toHaveBeenCalledWith('f1');
  });

  it('moves a conversation to a folder', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('move-to-folder'));
    await waitFor(() =>
      expect(db.conversations.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'conv-1', folderId: 'f1' })
      )
    );
  });

  it('no-ops when moving a missing conversation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('move-to-folder-missing'));
    await waitFor(() =>
      expect(db.conversations.get).toHaveBeenCalledWith('missing')
    );
    expect(db.conversations.put).not.toHaveBeenCalled();
  });

  it('updates settings', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('nothing')
    );
    fireEvent.click(screen.getByText('update-settings'));
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('dark')
    );
    expect(db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'dark' })
    );
  });

  it('refreshes data on demand', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('2')
    );
    db.conversations.getAll.mockResolvedValue([
      conversation('conv-1'),
      conversation('conv-2'),
      conversation('conv-3'),
    ]);
    fireEvent.click(screen.getByText('refresh'));
    await waitFor(() =>
      expect(screen.getByTestId('conv-count').textContent).toBe('3')
    );
  });
});
