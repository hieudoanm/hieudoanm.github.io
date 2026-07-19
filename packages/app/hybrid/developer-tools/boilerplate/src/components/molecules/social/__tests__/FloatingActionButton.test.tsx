import { fireEvent, render, screen } from '@testing-library/react';
import { FloatingActionButton } from '../FloatingActionButton';

describe('FloatingActionButton', () => {
  it('renders a labeled circular button', () => {
    render(<FloatingActionButton icon={<span>+</span>} label="Add" />);
    expect(screen.getByRole('button', { name: 'Add' })).toHaveClass(
      'btn-circle'
    );
  });

  it('calls onClick and applies position, size, and variant classes', () => {
    const onClick = jest.fn();
    render(
      <FloatingActionButton
        icon={<span>+</span>}
        label="Add"
        onClick={onClick}
        position="bottom-left"
        size="lg"
        variant="accent"
      />
    );
    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass(
      'fixed',
      'bottom-6',
      'left-6',
      'btn-lg',
      'btn-accent'
    );
  });

  it('renders a disabled button', () => {
    render(<FloatingActionButton icon={<span>+</span>} label="Add" disabled />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });
});
