import { render, screen, fireEvent } from '@testing-library/react';
import { ReplyComposer } from '@/components/molecules/ReplyComposer';
import type { Message } from '@/types';

jest.mock('react-icons/fa', () => ({
  FaPaperPlane: () => null,
  FaTimes: () => null,
}));

jest.mock('@/lib/format', () => ({
  formatChatTime: jest.fn(() => '12:00'),
}));

const baseMessage: Message = {
  id: 'm1',
  chatId: 'c1',
  authorId: 'u1',
  type: 'text',
  text: 'Hello there!',
  status: 'read',
  createdAt: Date.now(),
  reactions: [],
};

const defaultProps = {
  replyingTo: baseMessage,
  authorName: 'Alice',
  onSend: jest.fn(),
  onCancel: jest.fn(),
};

describe('ReplyComposer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Replying to {authorName}" when authorName is provided', () => {
    render(<ReplyComposer {...defaultProps} />);
    expect(screen.getByText('Replying to Alice')).toBeInTheDocument();
  });

  it('renders "Replying to message" when authorName is not provided', () => {
    render(<ReplyComposer {...defaultProps} authorName={undefined} />);
    expect(screen.getByText('Replying to message')).toBeInTheDocument();
  });

  it('shows full text when replyingTo.text is shorter than 60 chars', () => {
    render(<ReplyComposer {...defaultProps} />);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('shows truncated text with ellipsis when replyingTo.text is longer than 60 chars', () => {
    const longText = 'A'.repeat(100);
    render(
      <ReplyComposer
        {...defaultProps}
        replyingTo={{ ...baseMessage, text: longText }}
      />
    );
    expect(screen.getByText(`${'A'.repeat(60)}…`)).toBeInTheDocument();
  });

  it('send button is disabled when input is empty', () => {
    render(<ReplyComposer {...defaultProps} />);
    const sendButton = screen.getByLabelText('Send reply');
    expect(sendButton).toBeDisabled();
  });

  it('typing text enables send button and clicking send calls onSend then clears input', () => {
    render(<ReplyComposer {...defaultProps} />);
    const textarea = screen.getByLabelText('Reply message');
    fireEvent.change(textarea, { target: { value: 'My reply' } });
    const sendButton = screen.getByLabelText('Send reply');
    expect(sendButton).not.toBeDisabled();
    fireEvent.click(sendButton);
    expect(defaultProps.onSend).toHaveBeenCalledWith('My reply');
    expect(textarea).toHaveValue('');
  });

  it('Enter key triggers send', () => {
    render(<ReplyComposer {...defaultProps} />);
    const textarea = screen.getByLabelText('Reply message');
    fireEvent.change(textarea, { target: { value: 'Quick reply' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(defaultProps.onSend).toHaveBeenCalledWith('Quick reply');
  });

  it('Shift+Enter does NOT trigger send', () => {
    render(<ReplyComposer {...defaultProps} />);
    const textarea = screen.getByLabelText('Reply message');
    fireEvent.change(textarea, { target: { value: 'Multi-line' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(defaultProps.onSend).not.toHaveBeenCalled();
  });

  it('cancel button calls onCancel', () => {
    render(<ReplyComposer {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Cancel reply'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
