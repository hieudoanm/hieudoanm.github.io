import { render, screen } from '@testing-library/react';
import { PricingTag } from '../PricingTag';

describe('PricingTag', () => {
  it('renders the amount and period', () => {
    render(<PricingTag amount={29} period="month" />);
    expect(screen.getByTestId('pricing-tag')).toHaveTextContent('$29');
    expect(screen.getByTestId('pricing-tag')).toHaveTextContent('/month');
  });

  it('renders a custom currency symbol', () => {
    render(<PricingTag amount={99} period="year" currency="€" />);
    expect(screen.getByTestId('pricing-tag')).toHaveTextContent('€99');
  });
});
