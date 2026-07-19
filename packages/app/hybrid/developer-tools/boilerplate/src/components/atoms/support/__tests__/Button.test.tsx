import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children with default variant and size', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('btn', 'btn-primary');
    expect(button).not.toHaveClass('btn-sm', 'btn-lg');
  });

  it.each(['secondary', 'accent', 'ghost', 'outline', 'link'] as const)(
    'applies %s variant',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: variant })).toHaveClass(
        `btn-${variant}`
      );
    }
  );

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">x</Button>);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-sm');
    rerender(<Button size="lg">x</Button>);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-lg');
  });

  it('renders a spinner and disables when loading', () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('disables when disabled prop is set', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('calls onClick and forwards type', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} type="submit">
        Save
      </Button>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});
