import { render, screen } from '@testing-library/react';
import { MoneyRow } from '@/components/pos/molecules/MoneyRow';

describe('MoneyRow', () => {
  it('renders the label and formatted amount', () => {
    render(<MoneyRow label="Subtotal" amount={13} />);
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$13.00')).toBeInTheDocument();
  });

  it('applies the mono font to the amount', () => {
    render(<MoneyRow label="Total" amount={1} />);
    expect(screen.getByText('$1.00')).toHaveClass('font-mono');
  });

  it('applies the primary tone', () => {
    render(<MoneyRow label="Total" amount={1} tone="primary" />);
    expect(screen.getByText('$1.00')).toHaveClass('text-primary');
  });

  it('applies the error tone for a negative change', () => {
    render(<MoneyRow label="Change" amount={-2} tone="error" />);
    expect(screen.getByText('$-2.00')).toHaveClass('text-error');
  });

  it('merges a custom class name', () => {
    render(<MoneyRow label="Total" amount={1} className="mt-2" />);
    expect(screen.getByText('Total').parentElement).toHaveClass('mt-2');
  });
});
