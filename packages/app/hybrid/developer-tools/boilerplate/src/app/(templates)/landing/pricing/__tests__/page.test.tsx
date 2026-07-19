import { fireEvent, render, screen } from '@testing-library/react';
import PricingPage from '@/app/(templates)/landing/pricing/page';

describe('PricingPage', () => {
  it('renders monthly pricing by default', () => {
    render(<PricingPage />);
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Manage plan' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose Pro' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose Enterprise' })
    ).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
  });

  it('switches to annual pricing', () => {
    render(<PricingPage />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Billing annually' }));
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
    expect(screen.getAllByText(/billed yearly/).length).toBeGreaterThan(0);
  });
});
