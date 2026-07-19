import { getChatIdFromURL } from '@/lib/url';

describe('getChatIdFromURL', () => {
  it('returns null in a non-browser environment', () => {
    expect(getChatIdFromURL()).toBeNull();
  });
});
