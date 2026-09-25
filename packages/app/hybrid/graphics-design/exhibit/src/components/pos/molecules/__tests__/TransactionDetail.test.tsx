import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionDetail } from '@/components/pos/molecules/TransactionDetail';
import type { Transaction } from '@/types/pos';

const makeTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => ({
  id: 'tx-abc12345def',
  items: [
    {
      item: {
        id: 'i1',
        name: 'Coffee',
        price: 3.5,
        category: 'Drinks',
        stock: 100,
        lowStockThreshold: 10,
      },
      quantity: 2,
      discount: 0,
    },
  ],
  subtotal: 7,
  tax: 0.56,
  total: 7.56,
  payments: [{ method: 'cash', amount: 10 }],
  status: 'completed',
  createdAt: '2026-08-18T10:00:00.000Z',
  ...overrides,
});

describe('TransactionDetail', () => {
  it('renders the truncated id and the status badge', () => {
    render(
      <TransactionDetail
        transaction={makeTransaction()}
        onVoid={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(screen.getByText('tx-abc12...')).toBeInTheDocument();
    expect(screen.getByText('completed')).toHaveClass('badge-success');
  });

  it('renders the totals', () => {
    render(
      <TransactionDetail
        transaction={makeTransaction()}
        onVoid={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(screen.getAllByText('$7.00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('$0.56')).toBeInTheDocument();
    expect(screen.getByText('$7.56')).toBeInTheDocument();
  });

  it('renders the payment summary', () => {
    render(
      <TransactionDetail
        transaction={makeTransaction()}
        onVoid={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(screen.getByText('$10.00 cash')).toBeInTheDocument();
  });

  it('calls onVoid for a completed transaction', () => {
    const onVoid = jest.fn();
    render(
      <TransactionDetail
        transaction={makeTransaction()}
        onVoid={onVoid}
        onBack={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Void Transaction'));
    expect(onVoid).toHaveBeenCalledWith('tx-abc12345def');
  });

  it('hides the void action for a voided transaction', () => {
    render(
      <TransactionDetail
        transaction={makeTransaction({ status: 'voided' })}
        onVoid={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(screen.queryByText('Void Transaction')).not.toBeInTheDocument();
    expect(screen.getByText('voided')).toHaveClass('badge-error');
  });

  it('calls onBack from the header', () => {
    const onBack = jest.fn();
    render(
      <TransactionDetail
        transaction={makeTransaction()}
        onVoid={jest.fn()}
        onBack={onBack}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
