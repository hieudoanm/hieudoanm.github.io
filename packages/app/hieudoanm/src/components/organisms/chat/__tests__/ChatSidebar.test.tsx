import { fireEvent, render, screen } from '@testing-library/react';
import { ChatSidebar } from '../ChatSidebar';

const mockConversations = [
  {
    id: 'conv-1',
    title: 'First Chat',
    messages: [
      { id: '1', role: 'user' as const, content: 'Hi', timestamp: 100 },
    ],
    model: 'gpt-4',
    createdAt: 100,
    updatedAt: 100,
  },
  {
    id: 'conv-2',
    title: 'Second Chat',
    messages: [
      { id: '2', role: 'user' as const, content: 'Hello', timestamp: 200 },
      { id: '3', role: 'assistant' as const, content: 'Hi!', timestamp: 300 },
    ],
    model: 'claude-3',
    createdAt: 200,
    updatedAt: 300,
  },
];

describe('ChatSidebar', () => {
  const baseProps = {
    conversations: mockConversations,
    activeId: 'conv-1',
    onSelect: () => {},
    onNewChat: () => {},
    open: true,
  };

  it('to match snapshot', () => {
    const { container } = render(<ChatSidebar {...baseProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when closed', () => {
    const { container } = render(<ChatSidebar {...baseProps} open={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders conversations', () => {
    render(<ChatSidebar {...baseProps} />);
    expect(screen.getByText('First Chat')).toBeInTheDocument();
    expect(screen.getByText('Second Chat')).toBeInTheDocument();
  });

  it('shows message count', () => {
    render(<ChatSidebar {...baseProps} />);
    expect(screen.getByText('2 messages')).toBeInTheDocument();
    expect(screen.getByText('1 messages')).toBeInTheDocument();
  });

  it('calls onSelect when conversation clicked', () => {
    const onSelect = jest.fn();
    render(<ChatSidebar {...baseProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Second Chat'));
    expect(onSelect).toHaveBeenCalledWith('conv-2');
  });

  it('calls onNewChat when + New clicked', () => {
    const onNewChat = jest.fn();
    render(<ChatSidebar {...baseProps} onNewChat={onNewChat} />);
    fireEvent.click(screen.getByText('+ New'));
    expect(onNewChat).toHaveBeenCalledTimes(1);
  });

  it('shows empty state when no conversations', () => {
    render(<ChatSidebar {...baseProps} conversations={[]} />);
    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
  });
});
