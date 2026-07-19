import { fireEvent, render, screen } from '@testing-library/react';
import { ChatWindow } from '../ChatWindow';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('ChatWindow', () => {
  const messages = [
    { id: '1', sender: 'assistant' as const, text: 'Hello there' },
    { id: '2', sender: 'user' as const, text: 'Hi again' },
  ];

  it('renders title and messages', () => {
    render(
      <ChatWindow messages={messages} onSend={jest.fn()} title="Support" />
    );
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('Hi again')).toBeInTheDocument();
  });

  it('sends message via Enter key', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: 'Need help' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Need help');
    expect(input).toHaveValue('');
  });

  it('sends message via send button', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: 'Help' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).toHaveBeenCalledWith('Help');
  });

  it('does not send empty or whitespace messages', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables input and button when disabled', () => {
    render(<ChatWindow messages={messages} onSend={jest.fn()} disabled />);
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
  });
});
