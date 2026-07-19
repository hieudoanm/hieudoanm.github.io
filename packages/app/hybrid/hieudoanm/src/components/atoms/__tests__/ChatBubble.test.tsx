import { render, screen } from '@testing-library/react';
import { ChatBubble } from '../ChatBubble';

describe('ChatBubble', () => {
  it('to match snapshot', () => {
    const { container } = render(<ChatBubble role="user" content="Hello" />);
    expect(container).toMatchSnapshot();
  });

  it('renders user message on the right', () => {
    const { container } = render(
      <ChatBubble role="user" content="Hello from user" />
    );
    expect(screen.getByText('Hello from user')).toBeInTheDocument();
    expect(container.querySelector('.justify-end')).toBeInTheDocument();
  });

  it('renders assistant message on the left', () => {
    const { container } = render(
      <ChatBubble role="assistant" content="Hello from AI" />
    );
    expect(screen.getByText('Hello from AI')).toBeInTheDocument();
    expect(container.querySelector('.justify-start')).toBeInTheDocument();
  });

  it('shows model name for assistant messages', () => {
    render(<ChatBubble role="assistant" content="Response" model="GPT-4" />);
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });

  it('does not show model name for user messages', () => {
    render(<ChatBubble role="user" content="Hi" model="GPT-4" />);
    expect(screen.queryByText('GPT-4')).not.toBeInTheDocument();
  });

  it('applies primary styling to user messages', () => {
    const { container } = render(
      <ChatBubble role="user" content="User text" />
    );
    const bubble = container.querySelector('.bg-primary');
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent('User text');
  });
});
