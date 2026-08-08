import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders children with default neutral variant', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('badge', 'badge-neutral');
  });

  it('applies variant and outline classes', () => {
    render(
      <Badge variant="success" outline>
        Done
      </Badge>
    );
    expect(screen.getByText('Done')).toHaveClass(
      'badge-success',
      'badge-outline'
    );
  });

  it.each(['primary', 'secondary', 'accent', 'warning', 'error', 'info'])(
    'supports %s variant',
    (variant) => {
      render(<Badge variant={variant as 'primary'}>{variant}</Badge>);
      expect(screen.getByText(variant)).toHaveClass(`badge-${variant}`);
    }
  );
});
