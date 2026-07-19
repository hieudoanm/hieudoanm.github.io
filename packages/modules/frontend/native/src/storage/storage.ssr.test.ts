/** @jest-environment node */

import { createStorage } from './storage';

type TestSchema = {
  theme: 'light' | 'dark';
};

describe('createStorage SSR', () => {
  it('gracefully no-ops when window is undefined', () => {
    const store = createStorage<TestSchema>('local');

    expect(store.get('theme')).toBeNull();
    expect(store.has('theme')).toBe(false);

    expect(() => store.set('theme', 'dark')).not.toThrow();
    expect(() => store.remove('theme')).not.toThrow();
    expect(() => store.clear()).not.toThrow();
  });
});
