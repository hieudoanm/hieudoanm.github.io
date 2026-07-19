export interface WebSocketHandlers {
  onOpen?: () => void;
  onMessage?: (text: string) => void;
  onClose?: () => void;
  onError?: (message: string) => void;
}

export interface WebSocketConnection {
  send: (text: string) => void;
  close: () => void;
}

const serialize = (data: unknown): string => {
  if (typeof data === 'string') return data;
  if (data instanceof Blob) return '[blob]';
  if (data instanceof ArrayBuffer) return '[binary]';
  return JSON.stringify(data);
};

export const connectWebSocket = (
  url: string,
  handlers: WebSocketHandlers
): WebSocketConnection => {
  const socket = new WebSocket(url);
  socket.onopen = () => handlers.onOpen?.();
  socket.onmessage = (event: MessageEvent) =>
    handlers.onMessage?.(serialize(event.data));
  socket.onclose = () => handlers.onClose?.();
  socket.onerror = () => handlers.onError?.('WebSocket error');
  return {
    send: (text: string): void => socket.send(text),
    close: (): void => socket.close(),
  };
};
