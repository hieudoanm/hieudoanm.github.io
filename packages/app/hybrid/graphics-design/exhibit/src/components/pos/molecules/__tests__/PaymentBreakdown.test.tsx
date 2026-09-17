import { render, screen } from '@testing-library/react';
import { PaymentBreakdown } from '@/components/pos/molecules/PaymentBreakdown';
import { PAYMENT_LABELS } from '@/components/pos/molecules/PaymentBreakdown';
import type { PaymentMethodTotals } from '@/lib/pos';

const BY_PAYMENT: PaymentMethodTotals = {
  cash: 11,
  card: 3.3,
  gift_card: 0,
};

describe('PaymentBreakdown', () => {
  it('renders an entry for every payment method', () => {
    render(<PaymentBreakdown byPayment={BY_PAYMENT} />);
    expect(screen.getByText('cash')).toBeInTheDocument();
    expect(screen.getByText('card')).toBeInTheDocument();
    expect(screen.getByText('gift card')).toBeInTheDocument();
  });

  it('renders each amount', () => {
    render(<PaymentBreakdown byPayment={BY_PAYMENT} />);
    expect(screen.getByText('$11.00')).toBeInTheDocument();
    expect(screen.getByText('$3.30')).toBeInTheDocument();
  });

  it('uses the raw key when no labels are supplied', () => {
    render(<PaymentBreakdown byPayment={BY_PAYMENT} capitalize />);
    expect(screen.getByText('cash')).toHaveClass('capitalize');
  });

  it('uses supplied labels', () => {
    render(<PaymentBreakdown byPayment={BY_PAYMENT} labels={PAYMENT_LABELS} />);
    expect(screen.getByText('Cash')).toBeInTheDocument();
    expect(screen.getByText('Gift Card')).toBeInTheDocument();
  });
});
