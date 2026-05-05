import { createClipboard } from './clipboard';

describe('createClipboard', () => {
  const originalClipboard = globalThis.navigator.clipboard;

  beforeEach(() => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
        readText: jest.fn().mockResolvedValue('mock-text'),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
    jest.clearAllMocks();
  });

  it('detects support correctly', () => {
    const clipboard = createClipboard();
    expect(clipboard.isSupported()).toBe(true);
  });

  it('copies text', async () => {
    const clipboard = createClipboard();

    await clipboard.copy('hello');

    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalledWith(
      'hello'
    );
  });

  it('pastes text', async () => {
    const clipboard = createClipboard();

    const result = await clipboard.paste();

    expect(result).toBe('mock-text');
    expect(globalThis.navigator.clipboard.readText).toHaveBeenCalled();
  });

  it('throws if unsupported', async () => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });

    const clipboard = createClipboard();

    expect(clipboard.isSupported()).toBe(false);

    await expect(clipboard.copy('x')).rejects.toThrow();
    await expect(clipboard.paste()).rejects.toThrow();
  });
});
