import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ChatInput } from '../ChatInput';

describe('ChatInput', () => {
  it('renders textarea with placeholder', () => {
    render(() => (
      <ChatInput value="" onChange={() => {}} onSubmit={() => {}} />
    ));
    expect(
      screen.getByPlaceholderText('Type a message...')
    ).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(() => (
      <ChatInput
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="Ask anything..."
      />
    ));
    expect(screen.getByPlaceholderText('Ask anything...')).toBeInTheDocument();
  });

  it('renders submit button with send icon when not disabled', () => {
    render(() => (
      <ChatInput value="test" onChange={() => {}} onSubmit={() => {}} />
    ));
    const btn = screen.getByRole('button');
    expect(btn.querySelector('svg')).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it('calls onSubmit when submit button is clicked', () => {
    const onSubmit = vi.fn();
    render(() => (
      <ChatInput value="hello" onChange={() => {}} onSubmit={onSubmit} />
    ));
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledWith('hello');
  });

  it('disables submit button when value is empty', () => {
    render(() => (
      <ChatInput value="" onChange={() => {}} onSubmit={() => {}} />
    ));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when disabled', () => {
    render(() => (
      <ChatInput
        value="test"
        onChange={() => {}}
        onSubmit={() => {}}
        disabled
      />
    ));
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('calls onSubmit when Enter is pressed without Shift', () => {
    const onSubmit = vi.fn();
    render(() => (
      <ChatInput value="hello" onChange={() => {}} onSubmit={onSubmit} />
    ));
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    expect(onSubmit).toHaveBeenCalledWith('hello');
  });

  it('does not call onSubmit on Shift+Enter', () => {
    const onSubmit = vi.fn();
    render(() => (
      <ChatInput value="hello" onChange={() => {}} onSubmit={onSubmit} />
    ));
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
