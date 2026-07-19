import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/pos/atoms/StatusBadge';

describe('StatusBadge', () => {
  it('renders the status label', () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText('completed')).toBeInTheDocument();
  });

  it('uses the success modifier for a completed transaction', () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText('completed')).toHaveClass('badge-success');
  });

  it('uses the error modifier for a voided transaction', () => {
    render(<StatusBadge status="voided" />);
    expect(screen.getByText('voided')).toHaveClass('badge-error');
  });

  it('renders at the small size by default', () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText('completed')).toHaveClass('badge-xs');
  });

  it('honours the size prop', () => {
    render(<StatusBadge status="completed" size="sm" />);
    expect(screen.getByText('completed')).toHaveClass('badge-sm');
  });
});
