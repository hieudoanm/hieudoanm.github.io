import { fireEvent, render, screen } from '@testing-library/react';
import { CartTemplate } from '../CartTemplate';

describe('CartTemplate', () => {
  it('renders items and subtotal', () => {
    render(<CartTemplate />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Cart (3)')).toBeInTheDocument();
    expect(screen.getAllByText('$746').length).toBeGreaterThan(0);
  });

  it('increments quantity and updates totals', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    expect(screen.getByText('$698')).toBeInTheDocument();
    expect(screen.getAllByText('$1095').length).toBeGreaterThan(0);
  });

  it('decrements quantity', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[3]);
    expect(screen.getAllByText('$587').length).toBeGreaterThan(0);
  });

  it('disables minus button at quantity one', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    expect(buttons[0]).toBeDisabled();
  });

  it('removes items', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[8]);
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
    expect(screen.getByText('Cart (2)')).toBeInTheDocument();
  });

  it('shows empty state after removing all items', () => {
    render(<CartTemplate />);
    let buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[8]);
    buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[5]);
    buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[2]);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Browse products' })
    ).toHaveAttribute('href', '/store');
  });

  it('links to checkout with total', () => {
    render(<CartTemplate />);
    expect(
      screen.getByRole('link', { name: /Checkout — \$746/ })
    ).toHaveAttribute('href', '/store/checkout');
  });
});
