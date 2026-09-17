import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from '../ChatInput';

describe('ChatInput', () => {
  it('sends trimmed content and clears the textarea', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    const textarea = screen.getByPlaceholderText(
      'Type a message... (Shift+Enter for newline)'
    );
    fireEvent.change(textarea, { target: { value: '  hello  ' } });
    fireEvent.click(screen.getByTitle('Send message'));
    expect(onSend).toHaveBeenCalledWith('hello');
    expect(textarea).toHaveValue('');
  });

  it('does not send when empty', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    fireEvent.click(screen.getByTitle('Send message'));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('does not send when disabled', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled />);
    const textarea = screen.getByPlaceholderText(
      'Type a message... (Shift+Enter for newline)'
    );
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends on Enter', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    const textarea = screen.getByPlaceholderText(
      'Type a message... (Shift+Enter for newline)'
    );
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('hi');
  });

  it('does not send on Shift+Enter', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    const textarea = screen.getByPlaceholderText(
      'Type a message... (Shift+Enter for newline)'
    );
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables the send button when the text is blank', () => {
    render(<ChatInput onSend={jest.fn()} />);
    expect(screen.getByTitle('Send message')).toBeDisabled();
  });

  it('renders the attach button', () => {
    render(<ChatInput onSend={jest.fn()} />);
    expect(screen.getByTitle('Attach file')).toBeInTheDocument();
  });
});
