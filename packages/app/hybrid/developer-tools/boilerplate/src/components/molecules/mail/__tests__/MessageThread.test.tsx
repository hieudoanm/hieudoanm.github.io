import { fireEvent, render, screen } from '@testing-library/react';
import { MessageThread } from '../MessageThread';

const messages = [
  { id: '1', author: 'Alice', time: '09:00', body: 'First message' },
  { id: '2', author: 'Bob', time: '09:05', body: 'Second message' },
  { id: '3', author: 'Alice', time: '09:10', body: 'Third message' },
];

describe('MessageThread', () => {
  it('renders subject and collapses replies by default', () => {
    render(<MessageThread subject="Project" messages={messages} />);
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.queryByText('Second message')).not.toBeInTheDocument();
  });

  it('expands replies on toggle', () => {
    render(<MessageThread subject="Project" messages={messages} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Show 2 more replies' })
    );
    expect(screen.getByText('Second message')).toBeInTheDocument();
    expect(screen.getByText('Third message')).toBeInTheDocument();
  });

  it('calls onReply with the message id', () => {
    const onReply = jest.fn();
    render(
      <MessageThread subject="Project" messages={messages} onReply={onReply} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Reply' })[0]);
    expect(onReply).toHaveBeenCalledWith('1');
  });

  it('hides toggle for a single message', () => {
    render(<MessageThread subject="Project" messages={[messages[0]]} />);
    expect(
      screen.queryByRole('button', { name: /replies/ })
    ).not.toBeInTheDocument();
  });
});
