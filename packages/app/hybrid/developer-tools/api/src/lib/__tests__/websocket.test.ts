import { connectWebSocket } from '@/lib/websocket';

class MockWebSocket {
  static instances: MockWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: unknown }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  sent: string[] = [];
  closed = false;

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
  }

  send(text: string): void {
    this.sent.push(text);
  }

  close(): void {
    this.closed = true;
    this.onclose?.();
  }

  emitOpen(): void {
    this.onopen?.();
  }

  emitMessage(data: unknown): void {
    this.onmessage?.({ data });
  }

  emitError(): void {
    this.onerror?.();
  }
}

beforeEach(() => {
  MockWebSocket.instances = [];
  global.WebSocket = MockWebSocket as unknown as typeof WebSocket;
});

describe('connectWebSocket', () => {
  it('opens a socket for the given url', () => {
    const connection = connectWebSocket('wss://echo.websocket.org', {});
    expect(MockWebSocket.instances[0].url).toBe('wss://echo.websocket.org');
    expect(typeof connection.send).toBe('function');
    expect(typeof connection.close).toBe('function');
  });

  it('routes open and close callbacks', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const connection = connectWebSocket('wss://x', { onOpen, onClose });
    const socket = MockWebSocket.instances[0];
    socket.emitOpen();
    expect(onOpen).toHaveBeenCalled();
    connection.close();
    expect(onClose).toHaveBeenCalled();
  });

  it('serializes string messages', () => {
    const onMessage = jest.fn();
    connectWebSocket('wss://x', { onMessage });
    MockWebSocket.instances[0].emitMessage('hello');
    expect(onMessage).toHaveBeenCalledWith('hello');
  });

  it('serializes blob and arraybuffer messages', () => {
    const onMessage = jest.fn();
    connectWebSocket('wss://x', { onMessage });
    const socket = MockWebSocket.instances[0];
    socket.emitMessage(new Blob(['x']));
    expect(onMessage).toHaveBeenCalledWith('[blob]');
    socket.emitMessage(new ArrayBuffer(4));
    expect(onMessage).toHaveBeenCalledWith('[binary]');
  });

  it('serializes structured messages as json', () => {
    const onMessage = jest.fn();
    connectWebSocket('wss://x', { onMessage });
    MockWebSocket.instances[0].emitMessage({ a: 1 });
    expect(onMessage).toHaveBeenCalledWith('{"a":1}');
  });

  it('forwards errors and sends text', () => {
    const onError = jest.fn();
    const connection = connectWebSocket('wss://x', { onError });
    MockWebSocket.instances[0].emitError();
    expect(onError).toHaveBeenCalledWith('WebSocket error');
    connection.send('ping');
    expect(MockWebSocket.instances[0].sent).toEqual(['ping']);
  });
});
