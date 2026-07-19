import { render, screen } from '@testing-library/react';
import { ShippingInfo } from '../ShippingInfo';

describe('ShippingInfo', () => {
  it('renders method, eta and cost', () => {
    render(<ShippingInfo method="Express" eta="1-2 days" cost={9.99} />);
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('1-2 days')).toBeInTheDocument();
    expect(screen.getByTestId('shipping-cost')).toHaveTextContent('$9.99');
  });

  it('shows Free when free is enabled', () => {
    render(<ShippingInfo method="Standard" eta="3-5 days" free />);
    expect(screen.getByTestId('shipping-cost')).toHaveTextContent('Free');
  });

  it('shows the carrier when provided', () => {
    render(<ShippingInfo method="Standard" eta="3-5 days" carrier="DHL" />);
    expect(screen.getByText('DHL')).toBeInTheDocument();
  });
});
