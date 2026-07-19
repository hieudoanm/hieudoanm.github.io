import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import ChatPage from '../page';
import type { Conversation } from '@/types';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/hooks/useStreaming', () => ({
  useStreaming: jest.fn(),
}));

jest.mock('@/hooks/useKeyboard', () => ({
  useKeyboard: jest.fn(),
}));

jest.mock('@/components/organisms/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar" />,
}));

jest.mock('@/components/organisms/ChatHeader', () => ({
  ChatHeader: () => <div data-testid="chat-header" />,
}));

jest.mock('@/components/molecules/ChatInput', () => ({
  ChatInput: (props: { onSend: (content: string) => void }) => (
    <>
      <textarea data-testid="chat-input" />
      <button type="button" onClick={() => props.onSend('sent text')}>
        Send
      </button>
    </>
  ),
}));

jest.mock('@/components/atoms/MessageBubble', () => ({
  MessageBubble: ({ message }: { message: { content: string } }) => (
    <div data-testid="message">{message.content}</div>
  ),
}));

jest.mock('@/components/templates/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const { useSearchParams, useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/DataProvider');
const { useStreaming } = jest.requireMock('@/hooks/useStreaming');
const { useKeyboard } = jest.requireMock('@/hooks/useKeyboard');

let keyboardHandlers: Record<string, () => void> = {};
let resolveSend: () => void;

const conv: Conversation = {
  id: 'conv-1',
  title: 'My Chat',
  model: 'gpt-4o',
  createdAt: 1000,
  updatedAt: 2000,
  pinned: false,
  archived: false,
};

const data = {
  conversations: [conv],
  currentConversation: conv,
  currentMessages: [
    {
      id: 'm1',
      conversationId: 'conv-1',
      role: 'user',
      content: 'hi',
      timestamp: 1000,
    },
  ],
  setCurrentConversation: jest.fn(),
  sendMessage: jest.fn(),
  isLoading: false,
  createConversation: jest.fn(),
};

describe('ChatPage', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearchParams.mockReturnValue({ get: jest.fn(() => null) });
    useRouter.mockReturnValue({ push });
    useData.mockReturnValue(data);
    useStreaming.mockReturnValue({
      text: '',
      isStreaming: false,
      start: jest.fn(),
      stop: jest.fn(),
    });
    useKeyboard.mockImplementation((handlers: Record<string, () => void>) => {
      keyboardHandlers = handlers;
    });
    resolveSend = () => {};
  });

  it('shows a loading skeleton while loading', () => {
    useData.mockReturnValue({ ...data, isLoading: true });
    render(<ChatPage />);
    expect(document.querySelectorAll('.skeleton')).toHaveLength(3);
  });

  it('shows "Conversation not found" without a conversation', () => {
    useData.mockReturnValue({
      ...data,
      currentConversation: null,
      isLoading: false,
    });
    render(<ChatPage />);
    expect(screen.getByText('Conversation not found')).toBeInTheDocument();
  });

  it('renders the header and message bubbles', () => {
    render(<ChatPage />);
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    expect(screen.getByTestId('message')).toHaveTextContent('hi');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('sends a message through the chat input', async () => {
    data.sendMessage.mockResolvedValue(undefined);
    render(<ChatPage />);
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() =>
      expect(data.sendMessage).toHaveBeenCalledWith('sent text')
    );
  });

  it('selects the conversation matching the id param', async () => {
    useSearchParams.mockReturnValue({ get: jest.fn(() => 'conv-1') });
    render(<ChatPage />);
    await waitFor(() =>
      expect(data.setCurrentConversation).toHaveBeenCalledWith(conv)
    );
  });

  it('navigates home when the id does not match a conversation', async () => {
    useSearchParams.mockReturnValue({ get: jest.fn(() => 'missing') });
    useData.mockReturnValue({
      ...data,
      conversations: [conv],
      currentConversation: null,
      isLoading: false,
    });
    render(<ChatPage />);
    await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  });

  it('creates a new chat via the ctrl+n shortcut', async () => {
    data.createConversation.mockResolvedValue({ id: 'new-chat' });
    render(<ChatPage />);
    await act(async () => {
      keyboardHandlers['ctrl+n']();
    });
    await waitFor(() => expect(push).toHaveBeenCalledWith('/chat?id=new-chat'));
  });

  it('focuses the input via the ctrl+k shortcut', async () => {
    render(<ChatPage />);
    await act(async () => {
      keyboardHandlers['ctrl+k']();
    });
    expect(document.activeElement).toBe(screen.getByTestId('chat-input'));
  });

  it('shows streaming text while generating', async () => {
    useStreaming.mockReturnValue({
      text: 'Hello stream',
      isStreaming: true,
      start: jest.fn(),
      stop: jest.fn(),
    });
    data.sendMessage.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveSend = resolve;
      })
    );
    render(<ChatPage />);
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getByText('Hello stream')).toBeInTheDocument();
    await act(async () => {
      resolveSend();
    });
  });

  it('shows typing dots while generating without text', async () => {
    data.sendMessage.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveSend = resolve;
      })
    );
    render(<ChatPage />);
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getAllByText('•')).toHaveLength(3);
    await act(async () => {
      resolveSend();
    });
  });
});
