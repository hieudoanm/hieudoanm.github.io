import { copyText } from '@/lib/clipboard';

describe('copyText', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('returns true when the write succeeds', async () => {
    await expect(copyText('hello')).resolves.toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when the write is rejected', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });
    await expect(copyText('hello')).resolves.toBe(false);
  });
});
