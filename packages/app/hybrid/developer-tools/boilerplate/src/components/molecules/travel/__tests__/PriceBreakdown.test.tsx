import { render, screen } from '@testing-library/react';
import { PriceBreakdown } from '../PriceBreakdown';

describe('PriceBreakdown', () => {
  const items = [
    { label: 'Flight', amount: 120 },
    { label: 'Hotel', amount: 240.5 },
  ];

  it('renders each item label and amount', () => {
    render(<PriceBreakdown items={items} />);
    expect(screen.getByText('Flight')).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getByText('Hotel')).toBeInTheDocument();
    expect(screen.getByText('$240.50')).toBeInTheDocument();
  });

  it('computes and renders the total', () => {
    render(<PriceBreakdown items={items} />);
    expect(screen.getByTestId('price-breakdown-total')).toHaveTextContent(
      '$360.50'
    );
  });

  it('handles an empty items list with zero total', () => {
    render(<PriceBreakdown items={[]} />);
    expect(screen.getByTestId('price-breakdown-total')).toHaveTextContent(
      '$0.00'
    );
  });
});
