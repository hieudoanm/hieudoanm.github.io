import { render, screen, fireEvent } from '@testing-library/react';
import { Transaction } from '@/types/pos';
import { TransactionHistory } from '../TransactionHistory';

const TRANSACTIONS: Transaction[] = [
  {
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
  },
  {
    id: 'tx-xyz98765abc',
    items: [
      {
        item: {
          id: 'i2',
          name: 'Tea',
          price: 2.5,
          category: 'Drinks',
          stock: 50,
          lowStockThreshold: 10,
        },
        quantity: 1,
        discount: 0,
      },
    ],
    subtotal: 2.5,
    tax: 0.2,
    total: 2.7,
    payments: [{ method: 'card', amount: 2.7 }],
    status: 'voided',
    createdAt: '2026-08-18T11:00:00.000Z',
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof TransactionHistory>> = {}
) => {
  const defaultProps = {
    transactions: TRANSACTIONS,
    onBack: jest.fn(),
    onVoid: jest.fn(),
    ...props,
  };
  return {
    ...render(<TransactionHistory {...defaultProps} />),
    ...defaultProps,
  };
};

describe('TransactionHistory', () => {
  it('renders header with transaction count', () => {
    renderComponent();
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('2 transactions')).toBeInTheDocument();
  });

  it('renders truncated transaction IDs', () => {
    renderComponent();
    expect(screen.getByText('tx-abc12...')).toBeInTheDocument();
    expect(screen.getByText('tx-xyz98...')).toBeInTheDocument();
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('shows detail view when transaction clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('tx-abc12...'));
    expect(screen.getByText('Transaction Detail')).toBeInTheDocument();
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$7.56')).toBeInTheDocument();
  });

  it('calls onVoid when void button clicked on completed transaction', () => {
    const { onVoid } = renderComponent();
    fireEvent.click(screen.getByText('tx-abc12...'));
    fireEvent.click(screen.getByText('Void Transaction'));
    expect(onVoid).toHaveBeenCalledWith('tx-abc12345def');
  });

  it('filters transactions by search', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'Tea' },
    });
    expect(screen.getByText('tx-xyz98...')).toBeInTheDocument();
    expect(screen.queryByText('tx-abc12...')).not.toBeInTheDocument();
  });
});
