import { render, screen } from '@solidjs/testing-library';
import { ChatBubble } from '../ChatBubble';

describe('ChatBubble', () => {
  it('renders user message on the right', () => {
    const { container } = render(() => (
      <ChatBubble role="user" content="Hello" />
    ));
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(container.innerHTML).toContain('justify-end');
  });

  it('renders assistant message on the left', () => {
    const { container } = render(() => (
      <ChatBubble role="assistant" content="Hi there" />
    ));
    expect(screen.getByText('Hi there')).toBeInTheDocument();
    expect(container.innerHTML).toContain('justify-start');
  });

  it('renders the message content', () => {
    render(() => <ChatBubble role="user" content="How are you?" />);
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('shows model name for assistant messages', () => {
    render(() => (
      <ChatBubble role="assistant" content="I am fine" model="GPT-4" />
    ));
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });

  it('does not show model name for user messages', () => {
    render(() => <ChatBubble role="user" content="Hello" model="GPT-4" />);
    expect(screen.queryByText('GPT-4')).not.toBeInTheDocument();
  });

  it('applies primary styling for user messages', () => {
    const { container } = render(() => (
      <ChatBubble role="user" content="Hello" />
    ));
    expect(container.innerHTML).toContain('bg-primary');
  });

  it('applies base styling for assistant messages', () => {
    const { container } = render(() => (
      <ChatBubble role="assistant" content="Hello" />
    ));
    expect(container.innerHTML).toContain('bg-base-200');
  });
});
