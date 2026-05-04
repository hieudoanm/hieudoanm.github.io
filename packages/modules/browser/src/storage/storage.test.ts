import { createStorage } from './storage';

type TestSchema = {
  user: { id: string; name: string };
  theme: 'light' | 'dark';
  token: string;
};

describe('createStorage', () => {
  beforeEach(() => {
    globalThis.window.localStorage.clear();
    globalThis.window.sessionStorage.clear();
  });

  describe('basic operations (localStorage)', () => {
    const store = createStorage<TestSchema>('local');

    it('sets and gets values', () => {
      store.set('theme', 'dark');

      expect(store.get('theme')).toBe('dark');
    });

    it('returns null for missing keys', () => {
      expect(store.get('token')).toBeNull();
    });

    it('removes values', () => {
      store.set('token', 'abc');
      expect(store.has('token')).toBe(true);

      store.remove('token');
      expect(store.has('token')).toBe(false);
    });

    it('has() works correctly', () => {
      store.set('theme', 'light');
      expect(store.has('theme')).toBe(true);
      expect(store.has('token')).toBe(false);
    });
  });

  describe('namespace support', () => {
    const store = createStorage<TestSchema>('local', {
      namespace: 'test',
    });

    it('prefixes keys with namespace', () => {
      store.set('theme', 'dark');

      expect(globalThis.window.localStorage.getItem('test:theme')).toBe(
        JSON.stringify('dark')
      );
    });

    it('clear removes only namespaced keys', () => {
      globalThis.window.localStorage.setItem('other:key', 'value');

      store.set('token', '123');
      store.clear();

      expect(globalThis.window.localStorage.getItem('test:token')).toBeNull();
      expect(globalThis.window.localStorage.getItem('other:key')).toBe('value');
    });
  });

  describe('custom serializer/deserializer', () => {
    const store = createStorage<TestSchema>('local', {
      serialize: (value: unknown): string => `custom:${JSON.stringify(value)}`,
      deserialize: (value: string): unknown =>
        JSON.parse(value.replace('custom:', '')),
    });

    it('uses custom serializer/deserializer', () => {
      store.set('theme', 'light');

      const raw = globalThis.window.localStorage.getItem('theme');
      expect(raw?.startsWith('custom:')).toBe(true);

      expect(store.get('theme')).toBe('light');
    });
  });

  describe('sessionStorage support', () => {
    const store = createStorage<TestSchema>('session');

    it('uses sessionStorage', () => {
      store.set('token', 'abc');
      expect(globalThis.window.sessionStorage.getItem('token')).toBe(
        JSON.stringify('abc')
      );
    });
  });

  describe('SSR (no window)', () => {
    const originalWindow = globalThis.window;

    beforeAll(() => {
      delete (globalThis as { window?: unknown }).window;
    });

    afterAll(() => {
      globalThis.window = originalWindow;
    });

    it('gracefully no-ops when window is undefined', () => {
      const store = createStorage<TestSchema>('local');

      expect(store.get('theme')).toBeNull();
      expect(store.has('theme')).toBe(false);

      expect(() => store.set('theme', 'dark')).not.toThrow();
      expect(() => store.remove('theme')).not.toThrow();
      expect(() => store.clear()).not.toThrow();
    });
  });
});
