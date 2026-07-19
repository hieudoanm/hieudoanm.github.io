import { render, screen } from '@testing-library/react';
import { OrderConfirmationTemplate } from '../OrderConfirmationTemplate';

describe('OrderConfirmationTemplate', () => {
  it('renders confirmation and order details', () => {
    render(<OrderConfirmationTemplate />);
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
    expect(screen.getByText('#ORD-2024-3847')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
  });

  it('links to store and order history', () => {
    render(<OrderConfirmationTemplate />);
    expect(screen.getByRole('link', { name: 'View orders' })).toHaveAttribute(
      'href',
      '/store/order-history'
    );
    expect(
      screen.getAllByRole('link', { name: 'Continue shopping' }).length
    ).toBeGreaterThan(0);
  });
});
