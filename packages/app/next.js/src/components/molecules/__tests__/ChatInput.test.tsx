import { fireEvent, render, screen } from '@testing-library/react';
import { ChatInput } from '../ChatInput';

describe('ChatInput', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChatInput value="" onChange={() => {}} onSubmit={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders textarea with placeholder', () => {
    render(
      <ChatInput
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="Ask something..."
      />
    );
    expect(screen.getByPlaceholderText('Ask something...')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = jest.fn();
    render(<ChatInput value="" onChange={onChange} onSubmit={() => {}} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledWith('Hello');
  });

  it('calls onSubmit on Enter without Shift', () => {
    const onSubmit = jest.fn();
    render(<ChatInput value="Hello" onChange={() => {}} onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    expect(onSubmit).toHaveBeenCalledWith('Hello');
  });

  it('does not call onSubmit on Shift+Enter', () => {
    const onSubmit = jest.fn();
    render(<ChatInput value="Hello" onChange={() => {}} onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables submit button when disabled', () => {
    render(
      <ChatInput
        value="Hello"
        onChange={() => {}}
        onSubmit={() => {}}
        disabled
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables submit button when value is empty', () => {
    render(<ChatInput value="" onChange={() => {}} onSubmit={() => {}} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
