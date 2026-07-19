import { fireEvent, render, screen } from '@testing-library/react';
import { MessagesTemplate } from '../MessagesTemplate';

describe('MessagesTemplate', () => {
  it('renders threads and the selected conversation', () => {
    render(<MessagesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Messages' })
    ).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Alex Chen')).toBeInTheDocument();
    expect(screen.getByText('Sam Rivera')).toBeInTheDocument();
    expect(screen.getByText('Conversation with Jane Doe')).toBeInTheDocument();
    expect(
      screen.getByText('Jane Doe: Are we still on for Friday?')
    ).toBeInTheDocument();
  });

  it('selects another thread and clears unread', () => {
    render(<MessagesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Alex Chen/ }));
    expect(screen.getByText('Conversation with Alex Chen')).toBeInTheDocument();
    expect(
      screen.getByText('Alex Chen: Thanks for the review!')
    ).toBeInTheDocument();
  });

  it('sends a message to the selected thread', () => {
    render(<MessagesTemplate />);
    fireEvent.change(screen.getByLabelText('Type a message'), {
      target: { value: 'Sounds good' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('You: Sounds good')).toBeInTheDocument();
  });
});
