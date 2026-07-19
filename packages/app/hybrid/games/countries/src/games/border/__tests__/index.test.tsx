import { fireEvent, render, screen } from '@testing-library/react';
import { Border } from '../index';

describe('Border', () => {
  it('renders the prompt country and four options', () => {
    render(<Border />);
    expect(screen.getByTestId('border-options')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^border-option-/)).toHaveLength(4);
  });

  it('shows feedback and disables options after a pick', () => {
    const { container } = render(<Border />);
    const first = container.querySelector('[data-testid^="border-option-"]')!;
    fireEvent.click(first);
    expect(screen.getByTestId('border-message')).toBeInTheDocument();
    expect(first).toBeDisabled();
  });

  it('advances to a fresh round after Next', () => {
    const { container } = render(<Border />);
    fireEvent.click(
      container.querySelector('[data-testid^="border-option-"]')!
    );
    fireEvent.click(screen.getByTestId('border-next'));
    expect(screen.queryByTestId('border-message')).toBeNull();
    expect(
      container.querySelectorAll('[data-testid^="border-option-"]:disabled')
    ).toHaveLength(0);
  });
});
