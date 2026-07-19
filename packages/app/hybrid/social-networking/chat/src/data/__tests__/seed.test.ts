import {
  seedDatabase,
  generateConversation,
  generateMessage,
  generateAIResponse,
  generateId,
} from '@/data/seed';

jest.mock('@/lib/db', () => ({
  db: {
    conversations: { getAll: jest.fn(), put: jest.fn() },
    messages: { put: jest.fn() },
  },
}));

const { db } = jest.requireMock('@/lib/db');

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds conversations and messages when empty', async () => {
    db.conversations.getAll.mockResolvedValue([]);
    await seedDatabase();
    expect(db.conversations.put).toHaveBeenCalledTimes(3);
    expect(db.messages.put).toHaveBeenCalledTimes(6);
    expect(db.conversations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'conv-1', pinned: true })
    );
    expect(db.messages.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'msg-1-2', role: 'assistant' })
    );
  });

  it('skips seeding when conversations already exist', async () => {
    db.conversations.getAll.mockResolvedValue([{ id: 'conv-1' }]);
    await seedDatabase();
    expect(db.conversations.put).not.toHaveBeenCalled();
    expect(db.messages.put).not.toHaveBeenCalled();
  });
});

describe('generateConversation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates and persists a new conversation', async () => {
    const conv = await generateConversation('claude-3.5');
    expect(conv).toMatchObject({
      title: 'New Chat',
      model: 'claude-3.5',
      pinned: false,
      archived: false,
    });
    expect(conv.id).toBeTruthy();
    expect(db.conversations.put).toHaveBeenCalledWith(conv);
  });
});

describe('generateMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user message', async () => {
    const msg = await generateMessage('conv-1', 'user', 'hello');
    expect(msg).toMatchObject({
      conversationId: 'conv-1',
      role: 'user',
      content: 'hello',
    });
    expect(db.messages.put).toHaveBeenCalledWith(msg);
  });

  it('creates an assistant message with a model', async () => {
    const msg = await generateMessage('conv-1', 'assistant', 'hi', 'gpt-4o');
    expect(msg).toMatchObject({
      role: 'assistant',
      model: 'gpt-4o',
      content: 'hi',
    });
    expect(db.messages.put).toHaveBeenCalledWith(msg);
  });
});

describe('generateAIResponse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a response for a known model', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(generateAIResponse('gpt-4o')).toContain("I'd be happy to help");
    spy.mockRestore();
  });

  it('falls back to gpt-4o responses for unknown models', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const out = generateAIResponse('unknown-model');
    expect(out.length).toBeGreaterThan(0);
    expect(require('@/data/models').MOCK_RESPONSES['gpt-4o']).toContain(out);
    spy.mockRestore();
  });
});

describe('generateId', () => {
  it('returns a string id', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });
});
