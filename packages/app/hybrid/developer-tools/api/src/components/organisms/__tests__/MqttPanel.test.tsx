import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MqttPanel } from '../MqttPanel';
import { createMockMqttClient } from '@/lib/mqtt';

jest.mock('@/lib/mqtt', () => ({
  createMockMqttClient: jest.fn(),
}));

const createMock = createMockMqttClient as jest.Mock;

const client = {
  connect: jest.fn(),
  subscribe: jest.fn(),
  publish: jest.fn(),
  disconnect: jest.fn(),
};

type Handlers = {
  onConnect?: (url: string) => void;
  onDisconnect?: () => void;
  onMessage?: (topic: string, message: string) => void;
};

let handlers: Handlers;

const wireHandlers = (): void => {
  createMock.mockImplementation((h: Handlers) => {
    handlers = h;
    client.connect.mockImplementation(async () => h.onConnect?.('mqtt'));
    client.disconnect.mockImplementation(() => h.onDisconnect?.());
    return client;
  });
};

const connect = async (): Promise<void> => {
  render(<MqttPanel />);
  fireEvent.click(screen.getByText('Connect'));
  await waitFor(() => {
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });
};

describe('MqttPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    wireHandlers();
  });

  it('shows disconnected state initially', () => {
    render(<MqttPanel />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  it('connects to the broker', async () => {
    render(<MqttPanel />);
    fireEvent.click(screen.getByText('Connect'));
    await waitFor(() => {
      expect(client.connect).toHaveBeenCalled();
    });
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('subscribes to a topic', async () => {
    await connect();
    fireEvent.click(screen.getByText('Subscribe'));
    expect(client.subscribe).toHaveBeenCalledWith('test/topic');
    await waitFor(() => {
      expect(screen.getByText('test/topic')).toBeInTheDocument();
    });
  });

  it('publishes a message and logs it', async () => {
    await connect();
    fireEvent.change(screen.getByLabelText('Publish message'), {
      target: { value: 'hi' },
    });
    fireEvent.click(screen.getByText('Publish'));
    expect(client.publish).toHaveBeenCalledWith('test/topic', 'hi');
    await waitFor(() => {
      expect(screen.getByText('[test/topic] hi')).toBeInTheDocument();
    });
  });

  it('shows received messages', async () => {
    await connect();
    act(() => handlers.onMessage?.('test/topic', 'from broker'));
    expect(screen.getByText('[test/topic] from broker')).toBeInTheDocument();
  });

  it('disconnects', async () => {
    await connect();
    fireEvent.click(screen.getByText('Disconnect'));
    expect(client.disconnect).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Disconnected')).toBeInTheDocument();
    });
  });

  it('disconnects via close handler', async () => {
    await connect();
    act(() => handlers.onDisconnect?.());
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  it('does not connect with an empty broker url', async () => {
    render(<MqttPanel />);
    fireEvent.change(screen.getByLabelText('MQTT broker URL'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByText('Connect'));
    expect(client.connect).not.toHaveBeenCalled();
  });

  it('disables controls until connected', () => {
    render(<MqttPanel />);
    const publishButton = screen.getByRole('button', {
      name: /publish/i,
    }) as HTMLButtonElement;
    expect(publishButton.disabled).toBe(true);
  });
});
