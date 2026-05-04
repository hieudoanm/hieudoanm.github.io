import { createBroadcastChannel } from './boardcast-channel';

type TestMessage =
  | { type: 'theme'; value: 'light' | 'dark' }
  | { type: 'logout' };

class MockBroadcastChannel {
  public name: string;
  public postMessage = jest.fn();
  public close = jest.fn();

  private listeners: Array<(event: MessageEvent) => void> = [];

  constructor(name: string) {
    this.name = name;
  }

  addEventListener(
    type: string,
    listener: (event: MessageEvent) => void
  ): void {
    if (type === 'message') {
      this.listeners.push(listener);
    }
  }

  removeEventListener(
    type: string,
    listener: (event: MessageEvent) => void
  ): void {
    if (type === 'message') {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  }

  emit(data: unknown): void {
    const event = { data } as MessageEvent;
    this.listeners.forEach((listener) => listener(event));
  }
}

describe('createBroadcastChannel', () => {
  const originalBroadcast = globalThis.BroadcastChannel;
  const originalWindow = globalThis.window;

  let mockInstance: MockBroadcastChannel | null;

  beforeEach(() => {
    mockInstance = null;

    Object.defineProperty(globalThis, 'BroadcastChannel', {
      value: jest.fn().mockImplementation((name: string) => {
        mockInstance = new MockBroadcastChannel(name);
        return mockInstance;
      }),
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'BroadcastChannel', {
      value: originalBroadcast,
      configurable: true,
    });

    globalThis.window = originalWindow;

    jest.clearAllMocks();
  });

  it('detects support correctly', () => {
    const channel = createBroadcastChannel<TestMessage>('app');
    expect(channel.isSupported()).toBe(true);
  });

  it('publishes messages', () => {
    const channel = createBroadcastChannel<TestMessage>('app');

    channel.publish({ type: 'logout' });

    expect(mockInstance?.postMessage).toHaveBeenCalledWith({
      type: 'logout',
    });
  });

  it('subscribes and receives messages', () => {
    const channel = createBroadcastChannel<TestMessage>('app');

    const handler = jest.fn();
    const unsubscribe = channel.subscribe(handler);

    mockInstance?.emit({ type: 'theme', value: 'dark' });

    expect(handler).toHaveBeenCalledWith({
      type: 'theme',
      value: 'dark',
    });

    unsubscribe();

    mockInstance?.emit({ type: 'logout' });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('closes channel', () => {
    const channel = createBroadcastChannel<TestMessage>('app');

    channel.close();

    expect(mockInstance?.close).toHaveBeenCalled();
  });

  it('returns no-op when unsupported', () => {
    Object.defineProperty(globalThis, 'BroadcastChannel', {
      value: undefined,
      configurable: true,
    });

    const channel = createBroadcastChannel<TestMessage>('app');

    expect(channel.isSupported()).toBe(false);

    expect(() => channel.publish({ type: 'logout' })).not.toThrow();

    const unsubscribe = channel.subscribe(jest.fn());
    expect(typeof unsubscribe).toBe('function');

    expect(() => channel.close()).not.toThrow();
  });

  it('is SSR safe (no BroadcastChannel)', () => {
    Object.defineProperty(globalThis, 'BroadcastChannel', {
      value: undefined,
      configurable: true,
    });

    const channel = createBroadcastChannel<TestMessage>('app');

    expect(channel.isSupported()).toBe(false);
  });
});
