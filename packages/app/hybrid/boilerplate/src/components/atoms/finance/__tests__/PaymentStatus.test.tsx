import { render, screen } from '@testing-library/react';
import { PaymentStatus } from '../PaymentStatus';

describe('PaymentStatus', () => {
  it('renders the paid label with success class', () => {
    render(<PaymentStatus status="paid" />);
    expect(screen.getByTestId('payment-status')).toHaveTextContent('Paid');
    expect(screen.getByTestId('payment-status')).toHaveClass('badge-success');
  });

  it('renders the overdue label with error class', () => {
    render(<PaymentStatus status="overdue" />);
    expect(screen.getByTestId('payment-status')).toHaveTextContent('Overdue');
    expect(screen.getByTestId('payment-status')).toHaveClass('badge-error');
  });

  it('renders the pending label with warning class', () => {
    render(<PaymentStatus status="pending" />);
    expect(screen.getByTestId('payment-status')).toHaveTextContent('Pending');
    expect(screen.getByTestId('payment-status')).toHaveClass('badge-warning');
  });
});
