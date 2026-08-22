import { fireEvent, render, screen } from '@testing-library/react';
import { FlagGuesser } from '../index';

describe('FlagGuesser', () => {
  it('renders the flag and four options', () => {
    render(<FlagGuesser />);
    expect(screen.getByTestId('flag-guesser-flag')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^flag-option-/)).toHaveLength(4);
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });

  it('shows feedback and disables options after a pick', () => {
    const { container } = render(<FlagGuesser />);
    const first = container.querySelector('[data-testid^="flag-option-"]')!;
    fireEvent.click(first);
    expect(screen.getByTestId('flag-guesser-message')).toBeInTheDocument();
    expect(first).toBeDisabled();
  });

  it('advances to a fresh round after Next', () => {
    const { container } = render(<FlagGuesser />);
    fireEvent.click(container.querySelector('[data-testid^="flag-option-"]')!);
    fireEvent.click(screen.getByTestId('flag-guesser-next'));
    expect(screen.queryByTestId('flag-guesser-message')).toBeNull();
    expect(
      container.querySelectorAll('[data-testid^="flag-option-"]:disabled')
    ).toHaveLength(0);
  });
});
