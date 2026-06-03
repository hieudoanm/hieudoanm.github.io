import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ChatSidebar } from '../ChatSidebar';
import type { ChatConversation } from '../../../../data/chat';

const conversations: ChatConversation[] = [
  {
    id: '1',
    title: 'First Chat',
    messages: [{ id: 'm1', role: 'user', content: 'Hi', timestamp: 1000 }],
    model: 'gpt-4',
    createdAt: 1000,
    updatedAt: 1000,
  },
  {
    id: '2',
    title: 'Second Chat',
    messages: [
      { id: 'm2', role: 'user', content: 'Hello', timestamp: 2000 },
      { id: 'm3', role: 'assistant', content: 'Hi back', timestamp: 3000 },
    ],
    model: 'claude-3',
    createdAt: 2000,
    updatedAt: 3000,
  },
];

describe('ChatSidebar', () => {
  it('renders null when closed', () => {
    const { container } = render(() => (
      <ChatSidebar
        conversations={conversations}
        onSelect={() => {}}
        onNewChat={() => {}}
        open={false}
      />
    ));
    expect(container.innerHTML).toBe('');
  });

  it('renders conversations when open', () => {
    render(() => (
      <ChatSidebar
        conversations={conversations}
        onSelect={() => {}}
        onNewChat={() => {}}
        open
      />
    ));
    expect(screen.getByText('First Chat')).toBeInTheDocument();
    expect(screen.getByText('Second Chat')).toBeInTheDocument();
  });

  it('shows message counts', () => {
    render(() => (
      <ChatSidebar
        conversations={conversations}
        onSelect={() => {}}
        onNewChat={() => {}}
        open
      />
    ));
    expect(screen.getByText('1 messages')).toBeInTheDocument();
    expect(screen.getByText('2 messages')).toBeInTheDocument();
  });

  it('highlights active conversation', () => {
    render(() => (
      <ChatSidebar
        conversations={conversations}
        activeId="2"
        onSelect={() => {}}
        onNewChat={() => {}}
        open
      />
    ));
    const secondBtn = screen.getByText('Second Chat').closest('button');
    expect(secondBtn?.className).toContain('border-primary');
  });

  it('calls onSelect when a conversation is clicked', () => {
    const onSelect = vi.fn();
    render(() => (
      <ChatSidebar
        conversations={conversations}
        onSelect={onSelect}
        onNewChat={() => {}}
        open
      />
    ));
    fireEvent.click(screen.getByText('First Chat'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('calls onNewChat when new button is clicked', () => {
    const onNewChat = vi.fn();
    render(() => (
      <ChatSidebar
        conversations={conversations}
        onSelect={() => {}}
        onNewChat={onNewChat}
        open
      />
    ));
    fireEvent.click(screen.getByText('+ New'));
    expect(onNewChat).toHaveBeenCalledOnce();
  });

  it('shows empty state when no conversations', () => {
    render(() => (
      <ChatSidebar
        conversations={[]}
        onSelect={() => {}}
        onNewChat={() => {}}
        open
      />
    ));
    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
  });
});
