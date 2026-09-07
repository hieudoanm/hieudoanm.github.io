import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  it('renders children with primary/md defaults and button type', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toHaveClass('btn-primary');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('applies variant, size and extra class names', () => {
    render(
      <Button
        variant="secondary"
        size="lg"
        className="extra-class"
        type="submit">
        Go
      </Button>
    );
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn).toHaveClass('btn-secondary');
    expect(btn).toHaveClass('btn-lg');
    expect(btn).toHaveClass('extra-class');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('supports ghost and outline variants with sm size', () => {
    const { rerender } = render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: 'Ghost' })).toHaveClass(
      'btn-ghost'
    );

    rerender(
      <Button variant="outline" size="sm">
        Outline
      </Button>
    );
    const btn = screen.getByRole('button', { name: 'Outline' });
    expect(btn).toHaveClass('btn-outline');
    expect(btn).toHaveClass('btn-sm');
  });

  it('spreads additional props onto the button element', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
