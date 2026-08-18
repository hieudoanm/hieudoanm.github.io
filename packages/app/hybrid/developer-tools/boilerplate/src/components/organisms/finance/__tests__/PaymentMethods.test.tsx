import { render, screen } from '@testing-library/react';
import { PaymentMethods } from '../PaymentMethods';

describe('PaymentMethods', () => {
  const methods = [
    { id: '1', brand: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    { id: '2', brand: 'Mastercard', last4: '5100', expiry: '09/27' },
  ];

  it('renders each payment method with masked details', () => {
    render(<PaymentMethods methods={methods} />);
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText(/•••• 4242/)).toBeInTheDocument();
    expect(screen.getByText(/Expires 12\/28/)).toBeInTheDocument();
  });

  it('marks the default method with a badge', () => {
    render(<PaymentMethods methods={methods} />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('shows an empty state when there are no methods', () => {
    render(<PaymentMethods methods={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No payment methods saved.'
    );
  });
});
