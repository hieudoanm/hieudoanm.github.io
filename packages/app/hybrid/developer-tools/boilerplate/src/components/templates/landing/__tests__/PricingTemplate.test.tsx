import { fireEvent, render, screen } from '@testing-library/react';
import { PricingTemplate } from '../PricingTemplate';

describe('PricingTemplate', () => {
  it('renders heading and all three plans with monthly pricing', () => {
    render(<PricingTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Simple, transparent pricing' })
    ).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('switches to annual pricing when the billing toggle is on', () => {
    render(<PricingTemplate />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Billing annually' }));
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
    expect(screen.getAllByText(/billed yearly/).length).toBeGreaterThan(0);
  });
});
