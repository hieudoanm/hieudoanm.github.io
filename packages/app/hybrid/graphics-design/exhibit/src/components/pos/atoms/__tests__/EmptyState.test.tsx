import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/pos/atoms/EmptyState';

describe('EmptyState', () => {
  it('renders its message', () => {
    render(<EmptyState>No transactions found</EmptyState>);
    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  it('applies the muted text styling', () => {
    render(<EmptyState>Nothing</EmptyState>);
    expect(screen.getByText('Nothing')).toHaveClass('text-base-content/50');
  });

  it('merges a custom class name', () => {
    render(<EmptyState className="py-4">Padded</EmptyState>);
    expect(screen.getByText('Padded')).toHaveClass('py-4');
  });
});
