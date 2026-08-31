import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it.each([
    ['info', 'badge-info'],
    ['success', 'badge-success'],
    ['warning', 'badge-warning'],
    ['error', 'badge-error'],
    ['neutral', 'badge-neutral'],
  ])('renders the %s variant', (variant, className) => {
    const { container } = render(
      <Badge variant={variant as 'info'}>x</Badge>
    );
    expect(container.firstChild).toHaveClass('badge', className);
  });

  it('defaults to neutral', () => {
    render(<Badge>plain</Badge>);
    expect(screen.getByText('plain')).toBeInTheDocument();
  });
});
