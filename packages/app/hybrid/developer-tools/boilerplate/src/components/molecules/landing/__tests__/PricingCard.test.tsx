import { render, screen } from '@testing-library/react';
import { PricingCard } from '../PricingCard';

const pricing = {
  name: 'Pro',
  price: '$29',
  period: '/mo',
  features: ['Unlimited projects', 'Priority support'],
  cta: 'Start free trial',
};

describe('PricingCard', () => {
  it('renders plan name, price, period, and features', () => {
    render(<PricingCard {...pricing} />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('/mo')).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
  });

  it('renders the call to action', () => {
    render(<PricingCard {...pricing} />);
    expect(
      screen.getByRole('button', { name: 'Start free trial' })
    ).toBeInTheDocument();
  });

  it('applies highlighted styling when flagged', () => {
    render(<PricingCard {...pricing} highlighted />);
    expect(screen.getByTestId('pricing-card')).toHaveClass('bg-primary');
  });

  it('renders no feature list when features are empty', () => {
    render(<PricingCard {...pricing} features={[]} />);
    expect(screen.queryByText('Unlimited projects')).not.toBeInTheDocument();
  });
});
