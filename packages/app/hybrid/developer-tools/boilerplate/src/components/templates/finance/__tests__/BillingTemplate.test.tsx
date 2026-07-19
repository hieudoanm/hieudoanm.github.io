import { fireEvent, render, screen } from '@testing-library/react';
import { BillingTemplate } from '../BillingTemplate';

describe('BillingTemplate', () => {
  it('renders current plan, usage bars and invoices', () => {
    render(<BillingTemplate />);
    expect(screen.getByText('Current plan')).toBeInTheDocument();
    expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Emails')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('12 / 50')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Jul 01, 2026')).toBeInTheDocument();
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  it('switches between plan tiers', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Enterprise/ }));
    expect(screen.getAllByText('Enterprise').length).toBe(2);
    expect(screen.getByText('Current')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Free/ }));
    expect(screen.getAllByText('Free').length).toBe(2);
  });

  it('downloads an invoice', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(
      screen.getByRole('button', { name: 'Downloaded' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(2);
  });

  it('updates the payment method', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByLabelText('Card number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Card number'), {
      target: { value: '4242 4242 4242 1234' },
    });
    fireEvent.change(screen.getByLabelText('Expiry'), {
      target: { value: '01/30' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save card/ }));
    expect(screen.queryByLabelText('Card number')).not.toBeInTheDocument();
    expect(screen.getByText('Visa ending in 1234')).toBeInTheDocument();
  });
});
