import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BillItem from '../BillItem';
import type { RecurringBill } from '@/types';

const mockBill: RecurringBill = {
  id: '1',
  name: 'Netflix',
  amount: 15.99,
  currency: 'USD',
  frequency: 'monthly',
  nextDue: '2026-08-01',
  paid: false,
};

describe('BillItem', () => {
  it('renders bill name', () => {
    render(<BillItem bill={mockBill} />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
  });

  it('renders amount', () => {
    render(<BillItem bill={mockBill} />);
    expect(screen.getByText('$15.99')).toBeInTheDocument();
  });

  it('renders frequency', () => {
    render(<BillItem bill={mockBill} />);
    expect(screen.getByText(/Monthly/)).toBeInTheDocument();
  });

  it('renders Pay button when not paid', () => {
    render(<BillItem bill={mockBill} />);
    expect(screen.getByText('Pay')).toBeInTheDocument();
  });

  it('renders Paid badge when paid', () => {
    const paidBill = { ...mockBill, paid: true };
    render(<BillItem bill={paidBill} />);
    expect(screen.getByText('Paid')).toBeInTheDocument();
  });

  it('calls onPay when Pay button is clicked', async () => {
    const onPay = jest.fn();
    render(<BillItem bill={mockBill} onPay={onPay} />);
    await userEvent.click(screen.getByText('Pay'));
    expect(onPay).toHaveBeenCalledWith('1');
  });
});
