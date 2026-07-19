import { render, screen, fireEvent } from '@testing-library/react';
import { Receipt } from '../Receipt';
import { Transaction } from '@/types/pos';

const TRANSACTION: Transaction = {
  id: 'test-id',
  items: [
    {
      item: { id: '1', name: 'Coffee', price: 3.5, category: 'Drinks' },
      quantity: 2,
    },
  ],
  subtotal: 7,
  total: 7,
  paymentMethod: 'cash',
  amountTendered: 10,
  change: 3,
  timestamp: '2026-07-31T12:00:00.000Z',
};

describe('Receipt', () => {
  it('renders payment complete', () => {
    render(<Receipt transaction={TRANSACTION} onNewSale={jest.fn()} />);
    expect(screen.getByText('Payment Complete')).toBeInTheDocument();
  });

  it('renders item details', () => {
    render(<Receipt transaction={TRANSACTION} onNewSale={jest.fn()} />);
    expect(screen.getByText('Coffee x2')).toBeInTheDocument();
  });

  it('renders total', () => {
    render(<Receipt transaction={TRANSACTION} onNewSale={jest.fn()} />);
    expect(screen.getAllByText('$7.00').length).toBeGreaterThanOrEqual(1);
  });

  it('renders cash and change', () => {
    render(<Receipt transaction={TRANSACTION} onNewSale={jest.fn()} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$3.00')).toBeInTheDocument();
  });

  it('calls onNewSale when new sale button is clicked', () => {
    const onNewSale = jest.fn();
    render(<Receipt transaction={TRANSACTION} onNewSale={onNewSale} />);
    fireEvent.click(screen.getByText('New Sale'));
    expect(onNewSale).toHaveBeenCalled();
  });
});
