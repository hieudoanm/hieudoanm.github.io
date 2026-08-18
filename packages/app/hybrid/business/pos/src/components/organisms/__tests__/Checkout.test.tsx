import { render, screen, fireEvent } from '@testing-library/react';
import { Checkout } from '../Checkout';
import { CartItem } from '@/types/pos';

const ITEMS: CartItem[] = [
  {
    item: {
      id: '1',
      name: 'Coffee',
      price: 3.5,
      category: 'Drinks',
      stock: 100,
      lowStockThreshold: 10,
    },
    quantity: 2,
    discount: 0,
  },
];

describe('Checkout', () => {
  it('renders total', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    expect(screen.getAllByText('$7.00').length).toBeGreaterThanOrEqual(1);
  });

  it('disables complete payment when amount is insufficient', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    const btn = screen.getByText('Complete Payment');
    expect(btn).toBeDisabled();
  });

  it('enables complete payment when amount is sufficient', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '10' },
    });
    const btn = screen.getByText('Complete Payment');
    expect(btn).not.toBeDisabled();
  });

  it('shows change when amount is entered', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '10' },
    });
    expect(screen.getByText('$3.00')).toBeInTheDocument();
  });

  it('shows negative change with error styling', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '5' },
    });
    const changeEl = screen.getByText('$-2.00');
    expect(changeEl).toBeInTheDocument();
    expect(changeEl.className).toContain('text-error');
  });

  it('calls onComplete with transaction data', () => {
    const onComplete = jest.fn();
    render(
      <Checkout items={ITEMS} onComplete={onComplete} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByText('Complete Payment'));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        items: ITEMS,
        total: 7,
        payments: [{ method: 'cash', amount: 10 }],
      })
    );
  });

  it('does not call onComplete when amount is insufficient', () => {
    const onComplete = jest.fn();
    render(
      <Checkout items={ITEMS} onComplete={onComplete} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByText('Complete Payment'));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = jest.fn();
    render(<Checkout items={ITEMS} onComplete={jest.fn()} onBack={onBack} />);
    const backBtn = screen.getAllByRole('button')[0];
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalled();
  });

  it('renders item names and quantities in order summary', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    expect(screen.getByText('Coffee x2')).toBeInTheDocument();
  });

  it('does not show change section when amount is empty', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    expect(screen.queryByText('Change')).not.toBeInTheDocument();
  });

  it('shows positive change with success styling', () => {
    render(
      <Checkout items={ITEMS} onComplete={jest.fn()} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '100' },
    });
    const changeEl = screen.getByText('$93.00');
    expect(changeEl.className).toContain('text-success');
  });
});
