import { render, screen, fireEvent } from '@testing-library/react';
import { Transaction } from '@/types/pos';
import { DailySummary } from '../DailySummary';

const TODAY = new Date().toISOString().split('T')[0];

const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    items: [
      {
        item: {
          id: 'i1',
          name: 'Coffee',
          price: 5,
          category: 'Drinks',
          stock: 100,
          lowStockThreshold: 10,
        },
        quantity: 2,
        discount: 0,
      },
    ],
    subtotal: 10,
    tax: 1,
    total: 11,
    payments: [{ method: 'cash', amount: 11 }],
    status: 'completed',
    createdAt: `${TODAY}T10:00:00.000Z`,
  },
  {
    id: 'tx-2',
    items: [
      {
        item: {
          id: 'i2',
          name: 'Tea',
          price: 3,
          category: 'Drinks',
          stock: 50,
          lowStockThreshold: 10,
        },
        quantity: 1,
        discount: 0,
      },
    ],
    subtotal: 3,
    tax: 0.3,
    total: 3.3,
    payments: [{ method: 'card', amount: 3.3 }],
    status: 'completed',
    createdAt: `${TODAY}T11:00:00.000Z`,
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DailySummary>> = {}
) => {
  const defaultProps = {
    transactions: TRANSACTIONS,
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<DailySummary {...defaultProps} />), ...defaultProps };
};

describe('DailySummary', () => {
  it('renders header and today date', () => {
    renderComponent();
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
    expect(screen.getByText(TODAY)).toBeInTheDocument();
  });

  it('shows correct transaction count and totals', () => {
    renderComponent();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$14.30')).toBeInTheDocument();
    expect(screen.getByText('$1.30')).toBeInTheDocument();
  });

  it('displays payment method breakdown', () => {
    renderComponent();
    expect(screen.getByText('Cash')).toBeInTheDocument();
    expect(screen.getByText('$11.00')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('$3.30')).toBeInTheDocument();
  });

  it('shows top items', () => {
    renderComponent();
    expect(screen.getByText('Coffee × 2')).toBeInTheDocument();
    expect(screen.getByText('Tea × 1')).toBeInTheDocument();
  });

  it('shows no sales message when empty', () => {
    renderComponent({ transactions: [] });
    expect(screen.getByText('No sales today')).toBeInTheDocument();
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
