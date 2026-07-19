import { fireEvent, render, screen } from '@testing-library/react';
import { CheckoutFlow } from '../CheckoutFlow';

describe('CheckoutFlow', () => {
  it('renders all checkout steps', () => {
    render(<CheckoutFlow subtotal={50} />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('advances to the next step on Continue', () => {
    render(<CheckoutFlow subtotal={50} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByLabelText('Shipping address')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByLabelText('Card number')).toBeInTheDocument();
  });

  it('navigates back to the previous step', () => {
    render(<CheckoutFlow subtotal={50} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByLabelText('Shipping address')).toBeInTheDocument();
  });

  it('fires onComplete on the final step', () => {
    const onComplete = jest.fn();
    render(<CheckoutFlow subtotal={50} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Place order' }));
    expect(onComplete).toHaveBeenCalled();
  });
});
