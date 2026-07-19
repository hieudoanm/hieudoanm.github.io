import { render, screen } from '@testing-library/react';
import { DiscountTag } from '../DiscountTag';

describe('DiscountTag', () => {
  it('renders the discount percentage', () => {
    render(<DiscountTag discount={20} />);
    expect(screen.getByTestId('discount-tag')).toHaveTextContent('-20%');
  });

  it('uses the absolute value for negative input', () => {
    render(<DiscountTag discount={-15} />);
    expect(screen.getByTestId('discount-tag')).toHaveTextContent('-15%');
  });

  it('applies the variant class', () => {
    render(<DiscountTag discount={10} variant="success" />);
    expect(screen.getByTestId('discount-tag')).toHaveClass('badge-success');
  });

  it('defaults to the error variant', () => {
    render(<DiscountTag discount={30} />);
    expect(screen.getByTestId('discount-tag')).toHaveClass('badge-error');
  });
});
