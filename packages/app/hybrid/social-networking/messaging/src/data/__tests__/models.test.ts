import {
  generateId,
  ME,
  MOCK_CONTACTS,
  MOCK_CHATS,
  MOCK_MESSAGES,
} from '@/data/models';

describe('models', () => {
  describe('generateId', () => {
    it('returns string containing a dash', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id).toContain('-');
    });

    it('returns unique values on successive calls', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('ME', () => {
    it('has correct structure', () => {
      expect(ME).toHaveProperty('id');
      expect(ME).toHaveProperty('name');
      expect(ME).toHaveProperty('phone');
      expect(ME).toHaveProperty('username');
      expect(ME).toHaveProperty('avatarColor');
      expect(ME).toHaveProperty('online');
      expect(ME).toHaveProperty('lastSeenAt');
      expect(ME.id).toBe('me');
    });
  });

  describe('MOCK_CONTACTS', () => {
    it('has 4 contacts', () => {
      expect(MOCK_CONTACTS).toHaveLength(4);
    });
  });

  describe('MOCK_CHATS', () => {
    it('has 4 chats', () => {
      expect(MOCK_CHATS).toHaveLength(4);
    });

    it('each chat has required fields', () => {
      for (const chat of MOCK_CHATS) {
        expect(chat).toHaveProperty('id');
        expect(chat).toHaveProperty('kind');
        expect(chat).toHaveProperty('title');
        expect(chat).toHaveProperty('memberIds');
        expect(chat).toHaveProperty('settings');
        expect(Array.isArray(chat.memberIds)).toBe(true);
      }
    });

    it('includes direct and group kinds', () => {
      const kinds = MOCK_CHATS.map((c) => c.kind);
      expect(kinds).toContain('direct');
      expect(kinds).toContain('group');
    });
  });

  describe('MOCK_MESSAGES', () => {
    it('has 10 messages', () => {
      expect(MOCK_MESSAGES).toHaveLength(10);
    });

    it('each message has required fields', () => {
      for (const msg of MOCK_MESSAGES) {
        expect(msg).toHaveProperty('id');
        expect(msg).toHaveProperty('chatId');
        expect(msg).toHaveProperty('authorId');
        expect(msg).toHaveProperty('type');
        expect(msg).toHaveProperty('text');
        expect(msg).toHaveProperty('status');
        expect(msg).toHaveProperty('createdAt');
        expect(msg).toHaveProperty('reactions');
        expect(Array.isArray(msg.reactions)).toBe(true);
      }
    });
  });
});
