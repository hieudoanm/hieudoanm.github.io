import { createMockMqttClient } from '@/lib/mqtt';

describe('createMockMqttClient', () => {
  it('connects and reports the url', async () => {
    const onConnect = jest.fn();
    const client = createMockMqttClient({ onConnect });
    await client.connect();
    expect(onConnect).toHaveBeenCalledWith('mqtt');
  });

  it('publishes only to matching subscriptions', async () => {
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onMessage });
    await client.connect();
    await client.subscribe('sensors/+/temp');
    await client.publish('sensors/kitchen/temp', '21');
    await client.publish('sensors/kitchen/humidity', '50');
    expect(onMessage).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledWith('sensors/kitchen/temp', '21');
  });

  it('supports multi-level wildcards', async () => {
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onMessage });
    await client.connect();
    await client.subscribe('sensors/#');
    await client.publish('sensors/a/b/c', 'x');
    expect(onMessage).toHaveBeenCalledWith('sensors/a/b/c', 'x');
  });

  it('ignores publish and subscribe before connecting', async () => {
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onMessage });
    await client.subscribe('a');
    await client.publish('a', 'x');
    expect(onMessage).not.toHaveBeenCalled();
  });

  it('ignores empty topics', async () => {
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onMessage });
    await client.connect();
    await client.subscribe('   ');
    await client.publish('   ', 'x');
    expect(onMessage).not.toHaveBeenCalled();
  });

  it('deduplicates subscriptions', async () => {
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onMessage });
    await client.connect();
    await client.subscribe('a');
    await client.subscribe('a');
    await client.publish('a', 'x');
    expect(onMessage).toHaveBeenCalledTimes(1);
  });

  it('disconnects and clears subscriptions', async () => {
    const onDisconnect = jest.fn();
    const onMessage = jest.fn();
    const client = createMockMqttClient({ onDisconnect, onMessage });
    await client.connect();
    await client.subscribe('a');
    client.disconnect();
    expect(onDisconnect).toHaveBeenCalled();
    await client.publish('a', 'x');
    expect(onMessage).not.toHaveBeenCalled();
  });

  it('does not call onDisconnect when not connected', () => {
    const onDisconnect = jest.fn();
    const client = createMockMqttClient({ onDisconnect });
    client.disconnect();
    expect(onDisconnect).not.toHaveBeenCalled();
  });
});
