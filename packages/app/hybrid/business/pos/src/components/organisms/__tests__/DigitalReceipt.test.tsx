import { render, screen, fireEvent } from '@testing-library/react';
import { Transaction } from '@/types/pos';
import { DigitalReceipt } from '../DigitalReceipt';

const TRANSACTION: Transaction = {
  id: 'tx-receipt-test-123',
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
        price: 3.5,
        category: 'Food',
        stock: 50,
        lowStockThreshold: 5,
      },
      quantity: 1,
      discount: 0,
    },
  ],
  subtotal: 13.5,
  tax: 1.08,
  total: 14.58,
  payments: [{ method: 'cash', amount: 15 }],
  status: 'completed',
  createdAt: '2026-08-18T10:00:00.000Z',
};

beforeEach(() => {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DigitalReceipt>> = {}
) => {
  const defaultProps = {
    transaction: TRANSACTION,
    onNewSale: jest.fn(),
    ...props,
  };
  return { ...render(<DigitalReceipt {...defaultProps} />), ...defaultProps };
};

describe('DigitalReceipt', () => {
  it('renders payment complete heading', () => {
    renderComponent();
    expect(screen.getByText('Payment Complete')).toBeInTheDocument();
  });

  it('displays truncated transaction ID', () => {
    renderComponent();
    const idParagraph = screen.getByText(
      (_, el) => el?.tagName === 'P' && el.textContent?.includes('tx-recei')
    );
    expect(idParagraph).toBeInTheDocument();
  });

  it('renders line items with quantities', () => {
    renderComponent();
    expect(screen.getByText('Coffee × 2')).toBeInTheDocument();
    expect(screen.getByText('Muffin × 1')).toBeInTheDocument();
  });

  it('displays totals', () => {
    renderComponent();
    expect(screen.getByText('$13.50')).toBeInTheDocument();
    expect(screen.getByText('$1.08')).toBeInTheDocument();
    expect(screen.getByText('$14.58')).toBeInTheDocument();
  });

  it('calls onNewSale when new sale button clicked', () => {
    const { onNewSale } = renderComponent();
    fireEvent.click(screen.getByText('New Sale'));
    expect(onNewSale).toHaveBeenCalledTimes(1);
  });

  it('shows downloaded state after print clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Download'));
    expect(screen.getByText('Downloaded')).toBeInTheDocument();
  });
});
