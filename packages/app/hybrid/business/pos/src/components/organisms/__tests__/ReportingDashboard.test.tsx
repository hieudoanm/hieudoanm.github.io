import { render, screen, fireEvent } from '@testing-library/react';
import { Transaction } from '@/types/pos';
import { ReportingDashboard } from '../ReportingDashboard';

const TODAY = new Date().toISOString().split('T')[0];

const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-rpt1',
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
      {
        item: {
          id: 'i2',
          name: 'Muffin',
          price: 3,
          category: 'Food',
          stock: 50,
          lowStockThreshold: 5,
        },
        quantity: 1,
        discount: 0,
      },
    ],
    subtotal: 13,
    tax: 1.04,
    total: 14.04,
    payments: [{ method: 'cash', amount: 14.04 }],
    status: 'completed',
    createdAt: `${TODAY}T10:00:00.000Z`,
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof ReportingDashboard>> = {}
) => {
  const defaultProps = {
    transactions: TRANSACTIONS,
    onBack: jest.fn(),
    ...props,
  };
  return {
    ...render(<ReportingDashboard {...defaultProps} />),
    ...defaultProps,
  };
};

describe('ReportingDashboard', () => {
  it('renders reports header', () => {
    renderComponent();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('displays period filter buttons', () => {
    renderComponent();
    expect(screen.getByText('daily')).toBeInTheDocument();
    expect(screen.getByText('weekly')).toBeInTheDocument();
    expect(screen.getByText('monthly')).toBeInTheDocument();
  });

  it('shows transaction count and totals', () => {
    renderComponent();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('$14.04').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('$1.04')).toBeInTheDocument();
  });

  it('displays payment breakdown and categories', () => {
    renderComponent();
    expect(screen.getByText('cash')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('shows top items with quantities', () => {
    renderComponent();
    expect(screen.getByText('Coffee × 2')).toBeInTheDocument();
    expect(screen.getByText('Muffin × 1')).toBeInTheDocument();
  });
});
