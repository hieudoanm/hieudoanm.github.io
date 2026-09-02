import { storage } from '../storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('sets and gets a value', () => {
    storage.set('test-key', { foo: 'bar' });
    expect(storage.get('test-key')).toEqual({ foo: 'bar' });
  });

  it('returns null for missing key', () => {
    expect(storage.get('nonexistent')).toBeNull();
  });

  it('removes a value', () => {
    storage.set('to-remove', 'value');
    storage.remove('to-remove');
    expect(storage.get('to-remove')).toBeNull();
  });

  it('lists keys with menu_ prefix', () => {
    storage.set('a', 1);
    storage.set('b', 2);
    const keys = storage.keys();
    expect(keys).toContain('a');
    expect(keys).toContain('b');
  });

  it('returns null for invalid JSON', () => {
    localStorage.setItem('menu_corrupt', '{invalid');
    expect(storage.get('corrupt')).toBeNull();
  });

  it('prefixes all keys with menu_', () => {
    storage.set('x', 1);
    expect(localStorage.getItem('menu_x')).toBe('1');
  });

  it('ignores non-menu_ keys when listing', () => {
    localStorage.setItem('other_key', 'value');
    storage.set('mine', 1);
    expect(storage.keys()).toEqual(['mine']);
  });

  it('handles empty localStorage', () => {
    expect(storage.keys()).toEqual([]);
  });

  it('stores and retrieves strings', () => {
    storage.set('str', 'hello');
    expect(storage.get('str')).toBe('hello');
  });

  it('stores and retrieves arrays', () => {
    storage.set('arr', [1, 2, 3]);
    expect(storage.get('arr')).toEqual([1, 2, 3]);
  });

  it('overwrites existing key', () => {
    storage.set('key', 'first');
    storage.set('key', 'second');
    expect(storage.get('key')).toBe('second');
  });
});