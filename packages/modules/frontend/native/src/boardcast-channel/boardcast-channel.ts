export interface BroadcastAPI<TMessage> {
  publish: (message: TMessage) => void;
  subscribe: (handler: (message: TMessage) => void) => () => void;
  close: () => void;
  isSupported: () => boolean;
}

const getBroadcastChannel = (name: string): BroadcastChannel | null => {
  if (typeof globalThis.BroadcastChannel !== 'function') {
    return null;
  }

  return new globalThis.BroadcastChannel(name);
};

export const createBroadcastChannel = <TMessage>(
  name: string
): BroadcastAPI<TMessage> => {
  const channel = getBroadcastChannel(name);

  const isSupported = (): boolean => channel !== null;

  const publish = (message: TMessage): void => {
    if (!channel) return;
    channel.postMessage(message);
  };

  const subscribe = (handler: (message: TMessage) => void): (() => void) => {
    if (!channel) return () => {};

    const listener = (event: MessageEvent): void => {
      handler(event.data as TMessage);
    };

    channel.addEventListener('message', listener);

    return () => {
      channel.removeEventListener('message', listener);
    };
  };

  const close = (): void => {
    if (!channel) return;
    channel.close();
  };

  return {
    publish,
    subscribe,
    close,
    isSupported,
  };
};
