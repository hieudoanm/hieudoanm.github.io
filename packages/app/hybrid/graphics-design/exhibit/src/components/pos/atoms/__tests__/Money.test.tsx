import { render, screen } from '@testing-library/react';
import { Money } from '@/components/pos/atoms/Money';

describe('Money', () => {
  it('formats the amount as currency', () => {
    render(<Money amount={13.5} />);
    expect(screen.getByText('$13.50')).toBeInTheDocument();
  });

  it('does not apply the mono font class by default', () => {
    render(<Money amount={1} />);
    expect(screen.getByText('$1.00')).not.toHaveClass('font-mono');
  });

  it('applies the mono font class when requested', () => {
    render(<Money amount={1} mono />);
    expect(screen.getByText('$1.00')).toHaveClass('font-mono');
  });

  it('merges a custom class name', () => {
    render(<Money amount={1} className="text-primary" />);
    expect(screen.getByText('$1.00')).toHaveClass('text-primary');
  });

  it('renders a negative amount', () => {
    render(<Money amount={-2} />);
    expect(screen.getByText('$-2.00')).toBeInTheDocument();
  });
});
