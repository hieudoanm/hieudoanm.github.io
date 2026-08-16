import { render, screen } from '@testing-library/react';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import type { Message } from '@/types';

const base: Message = {
  id: 'm1',
  chatId: 'c1',
  authorId: 'other',
  type: 'text',
  text: 'Hello',
  status: 'read',
  createdAt: 1000,
  reactions: [],
};

const renderBubble = (message: Message, mine = false) =>
  render(
    <MessageBubble
      message={message}
      mine={mine}
      authorName="Alice"
      onReact={jest.fn()}
    />
  );

describe('MessageBubble', () => {
  it('renders the message text and time', () => {
    renderBubble(base);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText(/AM|PM/)).toBeInTheDocument();
  });

  it('shows the author name for incoming group messages', () => {
    renderBubble(base);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows delivery ticks for own messages', () => {
    renderBubble({ ...base, status: 'delivered' }, true);
    expect(screen.getByTitle('Delivered')).toBeInTheDocument();
  });

  it('does not show ticks for incoming messages', () => {
    renderBubble({ ...base, status: 'read' });
    expect(screen.queryByTitle('Read')).not.toBeInTheDocument();
  });

  it('shows a read style for read messages', () => {
    renderBubble({ ...base, status: 'read' }, true);
    expect(screen.getByTitle('Read')).toHaveClass('text-info');
  });

  it('shows an edited indicator', () => {
    renderBubble({ ...base, editedAt: 2000 });
    expect(screen.getByLabelText('Edited')).toBeInTheDocument();
  });

  it('shows a deleted placeholder without ticks', () => {
    renderBubble({ ...base, deletedAt: 2000 }, true);
    expect(screen.getByText('Message deleted')).toBeInTheDocument();
    expect(screen.queryByTitle('Read')).not.toBeInTheDocument();
  });

  it('shows reply and file metadata', () => {
    renderBubble({
      ...base,
      replyToId: 'm0',
      type: 'file',
      text: '',
      fileName: 'notes.pdf',
      fileSize: 2048,
    });
    expect(screen.getByLabelText('Replied')).toBeInTheDocument();
    expect(screen.getByText('notes.pdf · 2.0 KB')).toBeInTheDocument();
  });

  it('renders reactions when present', () => {
    renderBubble({
      ...base,
      reactions: [{ emoji: '👍', authorId: 'me', createdAt: 1500 }],
    });
    expect(screen.getByLabelText('React with 👍')).toBeInTheDocument();
  });

  it('does not render reactions for deleted messages', () => {
    renderBubble({
      ...base,
      deletedAt: 2000,
      reactions: [{ emoji: '👍', authorId: 'me', createdAt: 1500 }],
    });
    expect(screen.queryByLabelText('React with 👍')).not.toBeInTheDocument();
  });

  it('does not show ticks for a sending own message', () => {
    renderBubble({ ...base, status: 'sending' }, true);
    expect(screen.getByTitle('Sending')).toBeInTheDocument();
  });
});
