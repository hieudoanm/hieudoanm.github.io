import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    const { container } = render(<Button variant="secondary">Go</Button>);
    expect(container.firstChild).toHaveClass('btn-secondary');
  });

  it('applies the size class', () => {
    const { container } = render(<Button size="lg">Go</Button>);
    expect(container.firstChild).toHaveClass('btn-lg');
  });

  it('renders as a submit button when type is provided', () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});
