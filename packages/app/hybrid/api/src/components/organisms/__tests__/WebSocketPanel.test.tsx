import { render, screen, fireEvent, act } from '@testing-library/react';
import { WebSocketPanel } from '../WebSocketPanel';
import { connectWebSocket } from '@/lib/websocket';

jest.mock('@/lib/websocket', () => ({
  connectWebSocket: jest.fn(),
}));

const connectMock = connectWebSocket as jest.Mock;

const connection = {
  send: jest.fn(),
  close: jest.fn(),
};

type Handlers = {
  onOpen?: () => void;
  onMessage?: (text: string) => void;
  onClose?: () => void;
  onError?: (message: string) => void;
};

let handlers: Handlers;

const wireHandlers = (): void => {
  connectMock.mockImplementation((_url: string, h: Handlers) => {
    handlers = h;
    return connection;
  });
};

describe('WebSocketPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    wireHandlers();
  });

  it('shows disconnected state initially', () => {
    render(<WebSocketPanel />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('connects to the given url', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    expect(connectMock).toHaveBeenCalledWith(
      'wss://echo.websocket.org',
      expect.any(Object)
    );
  });

  it('does not connect with an empty url', () => {
    render(<WebSocketPanel />);
    fireEvent.change(screen.getByLabelText('WebSocket URL'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByText('Connect'));
    expect(connectMock).not.toHaveBeenCalled();
  });

  it('sends a message when connected', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onOpen?.());
    expect(screen.getByText('Connected')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('WebSocket message'), {
      target: { value: 'ping' },
    });
    fireEvent.click(screen.getByText('Send'));
    expect(connection.send).toHaveBeenCalledWith('ping');
    expect(screen.getByText('ping')).toBeInTheDocument();
  });

  it('receives a message', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onMessage?.('hello'));
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('reports websocket errors', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onError?.('err'));
    expect(screen.getByText('[error] WebSocket error')).toBeInTheDocument();
  });

  it('disconnects and returns to idle', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onOpen?.());
    fireEvent.click(screen.getByText('Disconnect'));
    expect(connection.close).toHaveBeenCalled();
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  it('does not send empty messages when connected', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onOpen?.());
    fireEvent.change(screen.getByLabelText('WebSocket message'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(connection.send).not.toHaveBeenCalled();
  });

  it('disconnects via close handler', () => {
    render(<WebSocketPanel />);
    fireEvent.click(screen.getByText('Connect'));
    act(() => handlers.onClose?.());
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  it('send is disabled until connected', () => {
    render(<WebSocketPanel />);
    const sendButton = screen.getByRole('button', {
      name: /send/i,
    }) as HTMLButtonElement;
    expect(sendButton.disabled).toBe(true);
  });
});
