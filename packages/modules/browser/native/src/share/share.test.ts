import { createShare } from './share';

describe('createShare', () => {
  const originalWindow = globalThis.window;
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    jest.resetModules();
    globalThis.window = originalWindow;
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
    jest.clearAllMocks();
  });

  it('detects support correctly', async () => {
    Object.defineProperty(globalThis.navigator, 'share', {
      value: jest.fn().mockResolvedValue(undefined),
      configurable: true,
    });

    const share = createShare();

    expect(share.isSupported()).toBe(true);
  });

  it('calls navigator.share with correct data', async () => {
    const mockShare = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(globalThis.navigator, 'share', {
      value: mockShare,
      configurable: true,
    });

    const share = createShare();

    const payload = {
      title: 'Hello',
      text: 'World',
      url: 'https://example.com',
    };

    await share.share(payload);

    expect(mockShare).toHaveBeenCalledWith(payload);
  });

  it('returns false if navigator.share is not supported', async () => {
    Object.defineProperty(globalThis.navigator, 'share', {
      value: undefined,
      configurable: true,
    });

    const share = createShare();

    expect(share.isSupported()).toBe(false);
    await expect(share.share({ title: 'Test' })).rejects.toThrow(
      'Web Share API is not supported'
    );
  });

  it('is SSR safe', async () => {
    // simulate SSR
    delete (globalThis as { window?: unknown }).window;

    const share = createShare();

    expect(share.isSupported()).toBe(false);
    await expect(share.share({ title: 'x' })).rejects.toThrow(
      'Web Share API is not supported'
    );
  });
});
