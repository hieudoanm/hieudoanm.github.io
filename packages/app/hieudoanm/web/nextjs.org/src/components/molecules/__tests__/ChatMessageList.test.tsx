import { render, screen } from '@testing-library/react';
import { ChatMessageList } from '../ChatMessageList';

const mockMessages = [
  {
    id: '1',
    role: 'user' as const,
    content: 'Hello',
    timestamp: new Date('2024-01-15T10:00:00').getTime(),
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: 'Hi there!',
    timestamp: new Date('2024-01-15T10:00:05').getTime(),
    model: 'GPT-4',
  },
];

describe('ChatMessageList', () => {
  it('to match snapshot', () => {
    const { container } = render(<ChatMessageList messages={mockMessages} />);
    expect(container).toMatchSnapshot();
  });

  it('renders all messages', () => {
    render(<ChatMessageList messages={mockMessages} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('shows empty state when no messages', () => {
    render(<ChatMessageList messages={[]} />);
    expect(screen.getByText('Start a conversation')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    const { container } = render(
      <ChatMessageList messages={mockMessages} loading />
    );
    const dots = container.querySelectorAll('.animate-bounce');
    expect(dots.length).toBe(3);
  });

  it('shows model name for assistant messages', () => {
    render(<ChatMessageList messages={mockMessages} />);
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });
});
