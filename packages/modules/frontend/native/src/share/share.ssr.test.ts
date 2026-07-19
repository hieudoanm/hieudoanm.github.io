/** @jest-environment node */

import { createShare } from './share';

describe('createShare SSR', () => {
  it('is SSR safe', async () => {
    const share = createShare();

    expect(share.isSupported()).toBe(false);
    await expect(share.share({ title: 'x' })).rejects.toThrow(
      'Web Share API is not supported'
    );
  });
});
