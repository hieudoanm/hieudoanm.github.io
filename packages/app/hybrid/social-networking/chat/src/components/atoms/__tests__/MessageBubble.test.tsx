import { render, screen, fireEvent, act } from '@testing-library/react';
import { MessageBubble } from '../MessageBubble';
import type { Message } from '@/types';

jest.mock('@/utils/format', () => ({
  formatRelativeTime: jest.fn(() => 'just now'),
  formatAbsoluteTime: jest.fn(() => '2026-01-01'),
  copyToClipboard: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(() => ({ addToast: jest.fn() })),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(() => ({ updateMessageReaction: jest.fn() })),
}));

const { copyToClipboard } = jest.requireMock('@/utils/format');
const { useToast } = jest.requireMock('@/providers/ToastProvider');
const { useData } = jest.requireMock('@/providers/DataProvider');
const addToast = jest.fn();
const updateMessageReaction = jest.fn();

const message = (overrides: Partial<Message> = {}): Message => ({
  id: 'm1',
  conversationId: 'conv-1',
  role: 'user',
  content: 'Hello',
  timestamp: 1000,
  ...overrides,
});

describe('MessageBubble', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useToast.mockReturnValue({ addToast });
    useData.mockReturnValue({ updateMessageReaction });
    jest.useRealTimers();
  });

  it('renders a user message with "You"', () => {
    render(<MessageBubble message={message()} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  it('renders an assistant message with the model name', () => {
    render(
      <MessageBubble
        message={message({ role: 'assistant', model: 'gpt-4o' })}
      />
    );
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
  });

  it('renders "Assistant" when no model is set', () => {
    render(<MessageBubble message={message({ role: 'assistant' })} />);
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });

  it('copies the message content on success', async () => {
    jest.useFakeTimers();
    copyToClipboard.mockResolvedValue(true);
    render(<MessageBubble message={message()} />);
    fireEvent.click(screen.getByTitle('Copy message'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(copyToClipboard).toHaveBeenCalledWith('Hello');
    expect(addToast).toHaveBeenCalledWith('Message copied', 'success');
    expect(document.querySelector('svg polyline')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(document.querySelector('svg polyline')).toBeNull();
  });

  it('does not toast when copy fails', async () => {
    copyToClipboard.mockResolvedValue(false);
    render(<MessageBubble message={message()} />);
    fireEvent.click(screen.getByTitle('Copy message'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(addToast).not.toHaveBeenCalled();
  });

  it('shows reaction buttons only for assistant messages', () => {
    const { unmount } = render(<MessageBubble message={message()} />);
    expect(screen.queryByTitle('Thumbs up')).toBeNull();
    unmount();
    render(<MessageBubble message={message({ role: 'assistant' })} />);
    expect(screen.getByTitle('Thumbs up')).toBeInTheDocument();
    expect(screen.getByTitle('Thumbs down')).toBeInTheDocument();
  });

  it('sets a reaction when none is active', async () => {
    render(<MessageBubble message={message({ role: 'assistant' })} />);
    fireEvent.click(screen.getByTitle('Thumbs up'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(updateMessageReaction).toHaveBeenCalledWith('m1', 'thumbs-up');
  });

  it('clears a reaction when toggling the same one', async () => {
    render(
      <MessageBubble
        message={message({ role: 'assistant', reaction: 'thumbs-up' })}
      />
    );
    fireEvent.click(screen.getByTitle('Thumbs up'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(updateMessageReaction).toHaveBeenCalledWith('m1', null);
  });

  it('sets a thumbs-down reaction', async () => {
    render(<MessageBubble message={message({ role: 'assistant' })} />);
    fireEvent.click(screen.getByTitle('Thumbs down'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(updateMessageReaction).toHaveBeenCalledWith('m1', 'thumbs-down');
  });
});
