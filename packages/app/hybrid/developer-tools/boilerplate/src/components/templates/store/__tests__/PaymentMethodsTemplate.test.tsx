import { fireEvent, render, screen } from '@testing-library/react';
import { PaymentMethodsTemplate } from '../PaymentMethodsTemplate';

describe('PaymentMethodsTemplate', () => {
  it('renders saved cards with default and expired badges', () => {
    render(<PaymentMethodsTemplate />);
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
    expect(
      screen.getByText('Visa ending in 4242').parentElement
    ).toHaveTextContent('Default');
    expect(
      screen.getByText('Mastercard ending in 5555').parentElement
    ).toHaveTextContent('Expired');
    expect(screen.getByText('Expires 12/27')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(1);
  });

  it('shows an error when the card number is empty', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Card number required')).toBeInTheDocument();
  });

  it('adds a Visa card', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '4111 1111 1111 1234' },
    });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), {
      target: { value: '09/29' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Visa ending in 1234')).toBeInTheDocument();
    expect(screen.getByText('Expires 09/29')).toBeInTheDocument();
    expect(screen.queryByText('Card number required')).not.toBeInTheDocument();
  });

  it('adds a Mastercard when the number does not start with 4', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '5555 5555 5555 8888' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Mastercard ending in 8888')).toBeInTheDocument();
  });

  it('adds a card with no digits using fallbacks', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Mastercard ending in 0000')).toBeInTheDocument();
    expect(screen.getByText('Expires MM/YY')).toBeInTheDocument();
  });

  it('removes a saved card', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[1]);
    expect(
      screen.queryByText('Mastercard ending in 5555')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  it('updates the default badge via set as default', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Set as default' }));
    expect(
      screen.getByText('Mastercard ending in 5555').parentElement
    ).toHaveTextContent('Default');
    expect(
      screen.getByText('Visa ending in 4242').parentElement
    ).not.toHaveTextContent('Default');
  });

  it('shows empty state and marks the first added card as default', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('No saved payment methods')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '4111 1111 1111 4321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Visa ending in 4321')).toBeInTheDocument();
    expect(
      screen.getByText('Visa ending in 4321').parentElement
    ).toHaveTextContent('Default');
  });
});
