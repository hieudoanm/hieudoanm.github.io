import { fireEvent, render, screen } from '@testing-library/react';
import { CheckoutTemplate } from '../CheckoutTemplate';

describe('CheckoutTemplate', () => {
  it('renders shipping and payment forms', () => {
    render(<CheckoutTemplate />);
    expect(screen.getByText('Shipping information')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('4242 4242 4242 4242')
    ).toBeInTheDocument();
  });

  it('shows order summary with items', () => {
    render(<CheckoutTemplate />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getAllByText('x1').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: /Pay \$746/ })
    ).toBeInTheDocument();
  });

  it('shows confirmation after placing order', () => {
    render(<CheckoutTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Pay \$746/ }));
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Continue shopping' })
    ).toHaveAttribute('href', '/store');
  });
});
