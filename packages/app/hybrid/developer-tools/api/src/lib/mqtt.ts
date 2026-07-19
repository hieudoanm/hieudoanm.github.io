export interface MqttHandlers {
  onConnect?: (url: string) => void;
  onDisconnect?: () => void;
  onMessage?: (topic: string, message: string) => void;
}

export interface MqttClient {
  connect: () => Promise<void>;
  subscribe: (topic: string) => Promise<void>;
  publish: (topic: string, message: string) => Promise<void>;
  disconnect: () => void;
}

const topicMatches = (filter: string, topic: string): boolean => {
  const filterSegments = filter.split('/');
  const topicSegments = topic.split('/');
  if (filterSegments[filterSegments.length - 1] === '#') {
    const prefix = filterSegments.slice(0, -1);
    return (
      topicSegments.length >= prefix.length &&
      prefix.every(
        (segment, index) => segment === '+' || segment === topicSegments[index]
      )
    );
  }
  if (filterSegments.length !== topicSegments.length) return false;
  return filterSegments.every(
    (segment, index) => segment === '+' || segment === topicSegments[index]
  );
};

export const createMockMqttClient = (handlers: MqttHandlers): MqttClient => {
  const subscriptions: string[] = [];
  let connected = false;

  return {
    connect: async (): Promise<void> => {
      connected = true;
      handlers.onConnect?.('mqtt');
    },
    subscribe: async (topic: string): Promise<void> => {
      if (!connected) return;
      const trimmed = topic.trim();
      if (trimmed === '') return;
      if (!subscriptions.includes(trimmed)) {
        subscriptions.push(trimmed);
      }
    },
    publish: async (topic: string, message: string): Promise<void> => {
      if (!connected) return;
      const trimmed = topic.trim();
      if (trimmed === '') return;
      for (const filter of subscriptions) {
        if (topicMatches(filter, trimmed)) {
          handlers.onMessage?.(trimmed, message);
        }
      }
    },
    disconnect: (): void => {
      if (!connected) return;
      connected = false;
      subscriptions.length = 0;
      handlers.onDisconnect?.();
    },
  };
};
