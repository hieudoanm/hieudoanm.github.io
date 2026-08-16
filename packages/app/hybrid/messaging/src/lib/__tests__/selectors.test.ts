import {
  getChatMessages,
  getMessagePreviewText,
  getLastMessagePreview,
} from '@/lib/selectors';
import type { Chat, Message } from '@/types';

const message = (id: string, overrides: Partial<Message> = {}): Message => ({
  id,
  chatId: 'c1',
  authorId: 'me',
  type: 'text',
  text: 'Hello',
  status: 'read',
  createdAt: Number(id),
  reactions: [],
  ...overrides,
});

const chat = (overrides: Partial<Chat> = {}): Chat => ({
  id: 'c1',
  kind: 'direct',
  title: 'Alice',
  avatarColor: '#000',
  memberIds: ['me', 'alice'],
  adminIds: [],
  pinned: false,
  muted: false,
  isSecret: false,
  disappearingSeconds: 0,
  unreadCount: 0,
  createdAt: 1,
  lastMessageAt: 1,
  ...overrides,
});

describe('getChatMessages', () => {
  it('filters by chat and sorts ascending', () => {
    const messages = [
      message('3'),
      message('1'),
      message('4', { chatId: 'other' }),
      message('2'),
    ];
    const result = getChatMessages(messages, 'c1');
    expect(result.map((m) => m.id)).toEqual(['1', '2', '3']);
  });

  it('returns an empty array for an unknown chat', () => {
    expect(getChatMessages([message('1')], 'nope')).toEqual([]);
  });
});

describe('getMessagePreviewText', () => {
  it('shows deleted placeholder for deleted messages', () => {
    expect(getMessagePreviewText(message('1', { deletedAt: 5 }))).toBe(
      'Message deleted'
    );
  });

  it('shows a photo label for image messages', () => {
    expect(
      getMessagePreviewText(message('1', { type: 'image', text: '' }))
    ).toBe('📷 Photo');
  });

  it('shows a voice label for audio messages', () => {
    expect(
      getMessagePreviewText(message('1', { type: 'audio', text: '' }))
    ).toBe('🎵 Voice message');
  });

  it('shows a file label for file messages', () => {
    expect(
      getMessagePreviewText(
        message('1', { type: 'file', text: '', fileName: 'a.pdf' })
      )
    ).toBe('📎 a.pdf');
  });

  it('shows a generic label for file messages without a name', () => {
    expect(
      getMessagePreviewText(message('1', { type: 'file', text: '' }))
    ).toBe('📎 File');
  });

  it('shows the text for system messages', () => {
    expect(
      getMessagePreviewText(message('1', { type: 'system', text: 'joined' }))
    ).toBe('joined');
  });

  it('truncates long text messages', () => {
    const long = 'a'.repeat(80);
    expect(getMessagePreviewText(message('1', { text: long }))).toBe(
      `${'a'.repeat(50)}…`
    );
  });

  it('normalizes whitespace in short text messages', () => {
    expect(getMessagePreviewText(message('1', { text: 'a\n  b' }))).toBe('a b');
  });
});

describe('getLastMessagePreview', () => {
  it('returns an empty string when there are no messages', () => {
    expect(getLastMessagePreview(chat(), [])).toBe('');
  });

  it('uses the most recent message', () => {
    const messages = [
      message('1', { text: 'older' }),
      message('2', { text: 'newer' }),
    ];
    expect(getLastMessagePreview(chat(), messages)).toBe('newer');
  });

  it('previews deleted messages as deleted', () => {
    const messages = [message('1', { deletedAt: 9, text: 'gone' })];
    expect(getLastMessagePreview(chat(), messages)).toBe('Message deleted');
  });
});
