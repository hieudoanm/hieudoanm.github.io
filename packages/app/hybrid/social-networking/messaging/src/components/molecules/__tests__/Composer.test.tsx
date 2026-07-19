import { render, screen, fireEvent } from '@testing-library/react';
import { Composer } from '@/components/molecules/Composer';

describe('Composer', () => {
  it('renders a textarea and a disabled send button', () => {
    render(<Composer onSend={jest.fn()} />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });

  it('sends trimmed text on Enter and clears the input', () => {
    const onSend = jest.fn();
    render(<Composer onSend={onSend} />);
    const textarea = screen.getByLabelText('Message');
    fireEvent.change(textarea, { target: { value: '  hello  ' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('hello');
    expect(textarea).toHaveValue('');
  });

  it('sends via the send button', () => {
    const onSend = jest.fn();
    render(<Composer onSend={onSend} />);
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'hi' },
    });
    fireEvent.click(screen.getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('hi');
  });

  it('keeps the button disabled for blank text', () => {
    render(<Composer onSend={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: '   ' },
    });
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });

  it('does not send on Shift+Enter', () => {
    const onSend = jest.fn();
    render(<Composer onSend={onSend} />);
    const textarea = screen.getByLabelText('Message');
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('respects a custom placeholder and disabled state', () => {
    render(<Composer onSend={jest.fn()} placeholder="Write here" disabled />);
    expect(screen.getByPlaceholderText('Write here')).toBeDisabled();
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });
});
