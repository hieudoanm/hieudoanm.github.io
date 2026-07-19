import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionBar } from '@/components/molecules/ReactionBar';
import type { Message } from '@/types';

const message: Message = {
  id: 'm1',
  chatId: 'c1',
  authorId: 'me',
  type: 'text',
  text: 'hi',
  status: 'read',
  createdAt: 1000,
  reactions: [
    { emoji: '👍', authorId: 'me', createdAt: 1500 },
    { emoji: '👍', authorId: 'alice', createdAt: 1501 },
    { emoji: '❤️', authorId: 'bob', createdAt: 1502 },
  ],
};

describe('ReactionBar', () => {
  it('groups reactions and shows counts', () => {
    render(<ReactionBar message={message} mine onReact={jest.fn()} />);
    const like = screen.getByLabelText('React with 👍');
    expect(like).toHaveTextContent('2');
    expect(screen.getByLabelText('React with ❤️')).toHaveTextContent('1');
  });

  it('calls onReact when an existing reaction is clicked', () => {
    const onReact = jest.fn();
    render(<ReactionBar message={message} mine={false} onReact={onReact} />);
    fireEvent.click(screen.getByLabelText('React with 👍'));
    expect(onReact).toHaveBeenCalledWith('👍');
  });

  it('offers the emoji picker dropdown', () => {
    render(<ReactionBar message={message} mine onReact={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Add reaction'));
    expect(screen.getByLabelText('Add ❤️')).toBeInTheDocument();
    expect(screen.getByLabelText('Add 😂')).toBeInTheDocument();
  });
});
