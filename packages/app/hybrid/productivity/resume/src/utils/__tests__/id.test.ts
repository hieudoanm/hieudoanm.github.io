import { createId } from '../id';

describe('createId', () => {
  it('returns a non-empty string', () => {
    expect(createId()).toBeTruthy();
  });

  it('returns unique ids', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => createId()));
    expect(ids.size).toBe(1000);
  });
});
