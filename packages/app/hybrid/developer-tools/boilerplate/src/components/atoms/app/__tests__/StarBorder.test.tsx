import { render, screen } from '@testing-library/react';
import { StarBorder } from '../StarBorder';

describe('StarBorder', () => {
  it('renders children inside an inner surface', () => {
    render(<StarBorder>Wrapped</StarBorder>);
    expect(screen.getByText('Wrapped')).toHaveClass('bg-base-100');
  });

  it('applies gradient border classes', () => {
    const { container } = render(<StarBorder>Wrapped</StarBorder>);
    expect(container.firstChild).toHaveClass('bg-gradient-to-r');
    expect(container.firstChild).toHaveClass('from-primary');
    expect(container.firstChild).toHaveClass('to-accent');
  });
});
