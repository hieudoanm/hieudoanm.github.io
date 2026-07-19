import { render, screen } from '@testing-library/react';
import { ChatBubble } from '../ChatBubble';

describe('ChatBubble', () => {
  it('renders assistant message on the start side', () => {
    const { container } = render(
      <ChatBubble message="Hello" sender="assistant" name="Bot" time="10:00" />
    );
    expect(container.querySelector('.chat-start')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Bot')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders user message on the end side with primary bubble', () => {
    const { container } = render(<ChatBubble message="Hi" sender="user" />);
    expect(container.querySelector('.chat-end')).toBeInTheDocument();
    expect(container.querySelector('.chat-bubble-primary')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    const { container } = render(
      <ChatBubble message="Hi" sender="assistant" avatar={<span>R</span>} />
    );
    expect(container.querySelector('.chat-image')).toBeInTheDocument();
  });
});
