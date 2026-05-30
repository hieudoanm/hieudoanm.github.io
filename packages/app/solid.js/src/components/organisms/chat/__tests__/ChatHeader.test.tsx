import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ChatHeader } from '../ChatHeader';

const models = [
  { company: 'OpenAI', label: 'GPT-4', value: 'gpt-4' },
  { company: 'Anthropic', label: 'Claude 3', value: 'claude-3' },
];

describe('ChatHeader', () => {
  it('renders default title', () => {
    render(() => (
      <ChatHeader
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={() => {}}
        onToggleSidebar={() => {}}
      />
    ));
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(() => (
      <ChatHeader
        title="AI Chat"
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={() => {}}
        onToggleSidebar={() => {}}
      />
    ));
    expect(screen.getByText('AI Chat')).toBeInTheDocument();
  });

  it('renders new chat button', () => {
    render(() => (
      <ChatHeader
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={() => {}}
        onToggleSidebar={() => {}}
      />
    ));
    expect(screen.getByText('New chat')).toBeInTheDocument();
  });

  it('calls onNewChat when new chat button is clicked', () => {
    const onNewChat = vi.fn();
    render(() => (
      <ChatHeader
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={onNewChat}
        onToggleSidebar={() => {}}
      />
    ));
    fireEvent.click(screen.getByText('New chat'));
    expect(onNewChat).toHaveBeenCalledOnce();
  });

  it('calls onToggleSidebar when sidebar button is clicked', () => {
    const onToggleSidebar = vi.fn();
    render(() => (
      <ChatHeader
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={() => {}}
        onToggleSidebar={onToggleSidebar}
      />
    ));
    const sidebarBtn = document.querySelector('button.btn-square');
    fireEvent.click(sidebarBtn!);
    expect(onToggleSidebar).toHaveBeenCalledOnce();
  });

  it('renders model select', () => {
    render(() => (
      <ChatHeader
        model="gpt-4"
        models={models}
        onModelChange={() => {}}
        onNewChat={() => {}}
        onToggleSidebar={() => {}}
      />
    ));
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });
});
