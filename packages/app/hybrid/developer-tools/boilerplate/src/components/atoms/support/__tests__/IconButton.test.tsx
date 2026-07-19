import { fireEvent, render, screen } from '@testing-library/react';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
  it('renders a round button with aria-label and icon', () => {
    const { container } = render(
      <IconButton icon={<span>+</span>} label="Add" />
    );
    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toHaveClass('btn-circle', 'btn-primary');
    expect(button.textContent).toBe('+');
    expect(container.querySelector('span')).toHaveTextContent('+');
  });

  it('applies variant and size classes', () => {
    const { rerender } = render(
      <IconButton icon={<span>x</span>} label="x" variant="ghost" size="sm" />
    );
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass(
      'btn-ghost',
      'btn-sm'
    );
    rerender(<IconButton icon={<span>x</span>} label="x" size="lg" />);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-lg');
  });

  it('calls onClick and disables when disabled', () => {
    const onClick = jest.fn();
    render(
      <IconButton icon={<span>x</span>} label="x" onClick={onClick} disabled />
    );
    expect(screen.getByRole('button', { name: 'x' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'x' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
