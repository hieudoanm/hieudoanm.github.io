import { fireEvent, render, screen } from '@testing-library/react';
import { BillingPanel } from '../BillingPanel';

describe('BillingPanel', () => {
  const usage = [{ label: 'Seats', used: 50, limit: 100 }];

  it('renders plan, price, and billing cycle', () => {
    render(
      <BillingPanel
        plan="Pro"
        price="$29"
        billingCycle="month"
        nextPayment="Aug 15"
      />
    );
    expect(screen.getByText('Pro plan')).toBeInTheDocument();
    expect(screen.getByText(/\/ month/)).toBeInTheDocument();
    expect(screen.getByText(/next payment Aug 15/)).toBeInTheDocument();
  });

  it('renders usage progress', () => {
    render(<BillingPanel plan="Pro" price="$29" usage={usage} />);
    expect(screen.getByText('Seats')).toBeInTheDocument();
    expect(screen.getByText('50 / 100')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '50');
  });

  it('fires billing callbacks', () => {
    const onManageBilling = jest.fn();
    const onUpgrade = jest.fn();
    render(
      <BillingPanel
        plan="Pro"
        price="$29"
        onManageBilling={onManageBilling}
        onUpgrade={onUpgrade}
      />
    );
    fireEvent.click(screen.getByTestId('manage-billing'));
    fireEvent.click(screen.getByTestId('upgrade-plan'));
    expect(onManageBilling).toHaveBeenCalled();
    expect(onUpgrade).toHaveBeenCalled();
  });
});
