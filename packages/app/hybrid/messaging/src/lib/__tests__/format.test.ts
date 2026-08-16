import {
  formatRelativeTime,
  formatChatTime,
  formatDayDivider,
  formatLastSeen,
  formatFileSize,
  getInitials,
  statusTicks,
  statusLabel,
  isEdited,
  searchMessages,
} from '@/lib/format';
import type { Message } from '@/types';

const now = Date.now();
const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe('formatRelativeTime', () => {
  it('returns now for timestamps under a minute', () => {
    expect(formatRelativeTime(now - 1000)).toBe('now');
  });

  it('returns minutes for recent timestamps', () => {
    expect(formatRelativeTime(now - 5 * MIN)).toBe('5m');
  });

  it('returns hours for timestamps within a day', () => {
    expect(formatRelativeTime(now - 3 * HOUR)).toBe('3h');
  });

  it('returns days for timestamps within a week', () => {
    expect(formatRelativeTime(now - 2 * DAY)).toBe('2d');
  });

  it('returns a short date for older timestamps', () => {
    expect(formatRelativeTime(now - 30 * DAY)).toMatch(/^[A-Za-z]{3} \d{1,2}$/);
  });
});

describe('formatChatTime', () => {
  it('formats a timestamp as HH:MM', () => {
    const date = new Date(2026, 0, 1, 14, 5);
    expect(formatChatTime(date.getTime())).toMatch(/^0?2:05 PM$/);
  });
});

describe('formatDayDivider', () => {
  it('returns Today for the current day', () => {
    expect(formatDayDivider(now)).toBe('Today');
  });

  it('returns Yesterday for the previous day', () => {
    expect(formatDayDivider(now - DAY)).toBe('Yesterday');
  });

  it('returns a full date for older days', () => {
    const old = new Date(2026, 0, 1, 12, 0).getTime();
    expect(formatDayDivider(old)).toContain('January');
  });
});

describe('formatLastSeen', () => {
  it('returns online when the user is online', () => {
    expect(formatLastSeen(true, now)).toBe('online');
  });

  it('returns just now for a recent last seen', () => {
    expect(formatLastSeen(false, now - 30 * 1000)).toBe('last seen just now');
  });

  it('returns minutes for recent last seen', () => {
    expect(formatLastSeen(false, now - 10 * MIN)).toBe('last seen 10m ago');
  });

  it('returns hours for last seen within a day', () => {
    expect(formatLastSeen(false, now - 5 * HOUR)).toBe('last seen 5h ago');
  });

  it('returns a time for last seen over a day ago', () => {
    expect(formatLastSeen(false, now - 2 * DAY)).toMatch(/last seen \d+:\d\d/);
  });
});

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB');
  });
});

describe('getInitials', () => {
  it('returns a question mark for an empty name', () => {
    expect(getInitials('')).toBe('?');
  });

  it('returns a single initial for a single-word name', () => {
    expect(getInitials('alice')).toBe('A');
  });

  it('returns two initials for a full name', () => {
    expect(getInitials('alice nguyen')).toBe('AN');
  });
});

describe('statusTicks', () => {
  it.each([
    ['sending', '✓'],
    ['sent', '✓✓'],
    ['delivered', '✓✓'],
    ['read', '✓✓'],
  ])('returns the ticks for %s', (status, expected) => {
    expect(statusTicks(status as Message['status'])).toBe(expected);
  });
});

describe('statusLabel', () => {
  it.each([
    ['sending', 'Sending'],
    ['sent', 'Sent'],
    ['delivered', 'Delivered'],
    ['read', 'Read'],
  ])('labels %s', (status, expected) => {
    expect(statusLabel(status as Message['status'])).toBe(expected);
  });
});

describe('isEdited', () => {
  const base = {
    id: 'm1',
    chatId: 'c1',
    authorId: 'me',
    type: 'text' as const,
    text: 'hi',
    status: 'read' as const,
    reactions: [],
  };

  it('returns false without an editedAt', () => {
    expect(isEdited({ ...base, createdAt: 1000 })).toBe(false);
  });

  it('returns false when editedAt is not newer than createdAt', () => {
    expect(isEdited({ ...base, createdAt: 1000, editedAt: 1000 })).toBe(false);
  });

  it('returns true when editedAt is newer than createdAt', () => {
    expect(isEdited({ ...base, createdAt: 1000, editedAt: 2000 })).toBe(true);
  });
});

describe('searchMessages', () => {
  const messages: Message[] = [
    {
      id: 'm1',
      chatId: 'c1',
      authorId: 'me',
      type: 'text',
      text: 'Hiking this weekend',
      status: 'read',
      createdAt: 1,
      reactions: [],
    },
    {
      id: 'm2',
      chatId: 'c1',
      authorId: 'other',
      type: 'text',
      text: 'Nice!',
      status: 'read',
      createdAt: 2,
      deletedAt: 3,
      reactions: [],
    },
    {
      id: 'm3',
      chatId: 'c1',
      authorId: 'other',
      type: 'image',
      text: '',
      status: 'read',
      createdAt: 4,
      reactions: [],
    },
  ];

  it('returns an empty array for a blank query', () => {
    expect(searchMessages(messages, '   ')).toEqual([]);
  });

  it('matches text case-insensitively', () => {
    const result = searchMessages(messages, 'HIKING');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('m1');
  });

  it('excludes deleted messages', () => {
    expect(searchMessages(messages, 'nice')).toEqual([]);
  });

  it('excludes non-text messages', () => {
    expect(searchMessages(messages, '')).toEqual([]);
  });
});
