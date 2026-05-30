import { render, screen } from '@solidjs/testing-library';
import { ChatMessageList } from '../ChatMessageList';
import type { ChatMessage } from '../../../data/chat';

const messages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hello', timestamp: 1000 },
  {
    id: '2',
    role: 'assistant',
    content: 'Hi there',
    timestamp: 2000,
    model: 'GPT-4',
  },
];

describe('ChatMessageList', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('renders all messages', () => {
    render(() => <ChatMessageList messages={messages} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there')).toBeInTheDocument();
  });

  it('shows empty state when no messages', () => {
    render(() => <ChatMessageList messages={[]} />);
    expect(screen.getByText('Start a conversation')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    render(() => <ChatMessageList messages={messages} loading />);
    const loadingDots = document.querySelectorAll('.animate-bounce');
    expect(loadingDots.length).toBe(3);
  });

  it('does not show loading indicator when not loading', () => {
    render(() => <ChatMessageList messages={messages} />);
    expect(document.querySelectorAll('.animate-bounce').length).toBe(0);
  });
});
