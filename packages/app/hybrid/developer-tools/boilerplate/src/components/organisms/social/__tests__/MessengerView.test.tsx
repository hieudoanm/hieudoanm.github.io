import { fireEvent, render, screen } from '@testing-library/react';
import { MessengerView } from '../MessengerView';

const initial = [
  { id: 'm1', sender: 'them' as const, text: 'Hello there', time: '10:12' },
  { id: 'm2', sender: 'me' as const, text: 'Hi!', time: '10:13' },
];

describe('MessengerView', () => {
  it('renders initial messages and contact name', () => {
    render(<MessengerView initialMessages={initial} contactName="Leo" />);
    expect(screen.getByText('Leo')).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('Hi!')).toBeInTheDocument();
  });

  it('appends a new message on send', () => {
    render(<MessengerView initialMessages={initial} />);
    const input = screen.getByLabelText('Message input');
    fireEvent.change(input, { target: { value: 'How are you?' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('calls onSend with the message text', () => {
    const onSend = jest.fn();
    render(<MessengerView onSend={onSend} />);
    const input = screen.getByLabelText('Message input');
    fireEvent.change(input, { target: { value: 'Going offline' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Going offline');
  });

  it('shows an empty state when there are no messages', () => {
    render(<MessengerView />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });
});
