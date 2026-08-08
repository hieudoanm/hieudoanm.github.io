import { fireEvent, render, screen } from '@testing-library/react';
import { LiveChatTemplate } from '../LiveChatTemplate';

describe('LiveChatTemplate', () => {
  it('renders the initial support messages and summary', () => {
    render(<LiveChatTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Chat' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 messages')).toBeInTheDocument();
    expect(
      screen.getByText('Support: Hi! How can we help you today?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Support: Let us know your issue and we will take a look.'
      )
    ).toBeInTheDocument();
  });

  it('sends a typed message', () => {
    render(<LiveChatTemplate />);
    fireEvent.change(screen.getByLabelText('Type a message'), {
      target: { value: 'I am locked out' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('You: I am locked out')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });

  it('sends a quick reply', () => {
    render(<LiveChatTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));
    expect(screen.getByText('You: Reset password')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });
});
