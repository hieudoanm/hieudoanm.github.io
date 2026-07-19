import { render, screen } from '@testing-library/react';
import { DealsSection } from '../DealsSection';

const deals = [
  { id: 'd1', title: 'Bean Bag', price: 60, oldPrice: 100, endsIn: '2h' },
  { id: 'd2', title: 'Desk Mat', price: 15, oldPrice: 20 },
];

describe('DealsSection', () => {
  it('renders deal titles and discounted prices', () => {
    render(<DealsSection deals={deals} />);
    expect(screen.getByText('Bean Bag')).toBeInTheDocument();
    expect(screen.getByText('$60.00')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
  });

  it('shows the original price as strikethrough', () => {
    render(<DealsSection deals={deals} />);
    const oldPrice = screen.getByText('$100.00');
    expect(oldPrice).toHaveClass('line-through');
  });

  it('renders discount percentage badges', () => {
    render(<DealsSection deals={deals} />);
    expect(screen.getByText('-40%')).toBeInTheDocument();
  });

  it('renders the countdown when provided', () => {
    render(<DealsSection deals={deals} />);
    expect(screen.getByText(/Ends in 2h/)).toBeInTheDocument();
  });
});
