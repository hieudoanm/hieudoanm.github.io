import { storage } from '../storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns fallback when key does not exist', () => {
    expect(storage.get('missing', 'fallback')).toBe('fallback');
  });

  it('stores and retrieves a string', () => {
    storage.set('name', 'test');
    expect(storage.get('name', '')).toBe('test');
  });

  it('stores and retrieves an object', () => {
    storage.set('obj', { a: 1 });
    expect(storage.get('obj', {})).toEqual({ a: 1 });
  });

  it('stores and retrieves an array', () => {
    storage.set('arr', [1, 2, 3]);
    expect(storage.get('arr', [])).toEqual([1, 2, 3]);
  });

  it('returns fallback for corrupted JSON', () => {
    localStorage.setItem('store:bad', '{invalid json');
    expect(storage.get('bad', 'fallback')).toBe('fallback');
  });

  it('uses store: prefix for keys', () => {
    storage.set('key', 'value');
    expect(localStorage.getItem('store:key')).toBe('"value"');
  });

  it('removes a key', () => {
    storage.set('toRemove', 'value');
    storage.remove('toRemove');
    expect(localStorage.getItem('store:toRemove')).toBeNull();
  });

  it('returns undefined for remove on nonexistent key', () => {
    expect(() => storage.remove('nonexistent')).not.toThrow();
  });

  it('overwrites existing values', () => {
    storage.set('key', 'first');
    storage.set('key', 'second');
    expect(storage.get('key', '')).toBe('second');
  });
});
