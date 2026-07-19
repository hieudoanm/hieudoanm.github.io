import { render, screen, fireEvent } from '@testing-library/react';
import { Discount, GiftCard } from '@/types/pos';
import { PaymentPanel } from '../PaymentPanel';

describe('PaymentPanel', () => {
  const defaultProps = {
    total: 150,
    giftCards: [] as GiftCard[],
    discounts: [] as Discount[],
    onPayment: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders total due', () => {
    render(<PaymentPanel {...defaultProps} />);
    expect(screen.getByText('Total Due')).toBeInTheDocument();
    expect(screen.getAllByText('$150.00').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onBack when Back button clicked', () => {
    render(<PaymentPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  it('starts with cash payment method selected', () => {
    render(<PaymentPanel {...defaultProps} />);
    expect(screen.getByDisplayValue('Cash')).toBeInTheDocument();
  });

  it('disables complete payment when total not met', () => {
    render(<PaymentPanel {...defaultProps} />);
    expect(screen.getByText('Complete Payment')).toBeDisabled();
  });

  it('enables complete payment when enough cash entered', () => {
    render(<PaymentPanel {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '150' },
    });
    expect(screen.getByText('Complete Payment')).not.toBeDisabled();
  });

  it('applies valid discount code', () => {
    const discounts: Discount[] = [
      {
        id: 'd1',
        code: 'SAVE10',
        type: 'percentage',
        value: 10,
        usedCount: 0,
        active: true,
      },
    ];
    render(<PaymentPanel {...defaultProps} discounts={discounts} />);
    fireEvent.change(screen.getByPlaceholderText('Enter code'), {
      target: { value: 'SAVE10' },
    });
    fireEvent.click(screen.getAllByText('Apply')[0]);
    expect(screen.getByText(/SAVE10/i)).toBeInTheDocument();
    expect(screen.getAllByText('$135.00').length).toBeGreaterThanOrEqual(1);
  });

  it('applies valid gift card', () => {
    const giftCards: GiftCard[] = [
      {
        id: 'gc1',
        code: 'GC001',
        balance: 50,
        initialBalance: 50,
        createdAt: new Date().toISOString(),
        active: true,
      },
    ];
    render(<PaymentPanel {...defaultProps} giftCards={giftCards} />);
    fireEvent.change(screen.getByPlaceholderText('Gift card code'), {
      target: { value: 'GC001' },
    });
    fireEvent.click(screen.getAllByText('Apply')[1]);
    expect(screen.getAllByText('$50.00').length).toBeGreaterThanOrEqual(1);
  });
});
