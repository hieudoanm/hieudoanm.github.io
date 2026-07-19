import { fireEvent, render, screen } from '@testing-library/react';
import { Guess } from '../index';

describe('Guess', () => {
  it('starts in flag mode with a prompt and four options', () => {
    render(<Guess />);
    expect(screen.getByTestId('guess-prompt')).toBeInTheDocument();
    expect(screen.getByTestId('guess-options')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^guess-option-/)).toHaveLength(4);
  });

  it('renders the score in the stats row', () => {
    render(<Guess />);
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });

  it('switches to emoji mode', () => {
    render(<Guess />);
    fireEvent.click(screen.getByTestId('mode-emoji'));
    expect(screen.getByTestId('mode-emoji')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getAllByTestId(/^guess-option-/)).toHaveLength(4);
  });

  it('switches to border mode', () => {
    render(<Guess />);
    fireEvent.click(screen.getByTestId('mode-border'));
    expect(screen.getByTestId('mode-border')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getAllByTestId(/^guess-option-/)).toHaveLength(4);
  });

  it('shows feedback and disables options after a pick', () => {
    const { container } = render(<Guess />);
    const first = container.querySelector('[data-testid^="guess-option-"]')!;
    fireEvent.click(first);
    expect(screen.getByTestId('guess-message')).toBeInTheDocument();
    expect(first).toBeDisabled();
  });

  it('advances to a fresh round after Next', () => {
    const { container } = render(<Guess />);
    fireEvent.click(container.querySelector('[data-testid^="guess-option-"]')!);
    fireEvent.click(screen.getByTestId('guess-next'));
    expect(screen.queryByTestId('guess-message')).toBeNull();
    expect(
      container.querySelectorAll('[data-testid^="guess-option-"]:disabled')
    ).toHaveLength(0);
  });
});
