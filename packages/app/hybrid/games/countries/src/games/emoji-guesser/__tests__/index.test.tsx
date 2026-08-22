import { fireEvent, render, screen } from '@testing-library/react';
import { EmojiGuesser } from '../index';

describe('EmojiGuesser', () => {
  it('renders the country name and four flag options', () => {
    render(<EmojiGuesser />);
    expect(screen.getByTestId('emoji-guesser-name')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^emoji-option-/)).toHaveLength(4);
  });

  it('shows feedback and disables options after a pick', () => {
    const { container } = render(<EmojiGuesser />);
    const first = container.querySelector('[data-testid^="emoji-option-"]')!;
    fireEvent.click(first);
    expect(screen.getByTestId('emoji-guesser-message')).toBeInTheDocument();
    expect(first).toBeDisabled();
  });

  it('advances to a fresh round after Next', () => {
    const { container } = render(<EmojiGuesser />);
    fireEvent.click(container.querySelector('[data-testid^="emoji-option-"]')!);
    fireEvent.click(screen.getByTestId('emoji-guesser-next'));
    expect(screen.queryByTestId('emoji-guesser-message')).toBeNull();
    expect(
      container.querySelectorAll('[data-testid^="emoji-option-"]:disabled')
    ).toHaveLength(0);
  });
});
