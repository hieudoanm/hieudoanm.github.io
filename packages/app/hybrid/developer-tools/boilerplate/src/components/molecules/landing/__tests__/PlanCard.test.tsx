import { render, screen } from '@testing-library/react';
import { PlanCard } from '../PlanCard';

const plan = {
  name: 'Enterprise',
  price: '$99',
  period: '/month',
  features: ['Unlimited seats', 'SSO'],
  cta: 'Contact sales',
  note: 'Billed annually',
};

describe('PlanCard', () => {
  it('renders plan details and call to action', () => {
    render(<PlanCard {...plan} />);
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('/month')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Contact sales' })
    ).toBeInTheDocument();
  });

  it('renders the recommended badge when flagged', () => {
    render(<PlanCard {...plan} recommended />);
    expect(screen.getByText('Recommended')).toBeInTheDocument();
    expect(screen.getByTestId('plan-card')).toHaveClass('bg-primary');
  });

  it('renders the note text', () => {
    render(<PlanCard {...plan} />);
    expect(screen.getByText('Billed annually')).toBeInTheDocument();
  });

  it('hides note and period when omitted', () => {
    render(<PlanCard {...plan} note={undefined} period={''} />);
    expect(screen.queryByText('Billed annually')).not.toBeInTheDocument();
    expect(screen.queryByText('/month')).not.toBeInTheDocument();
  });
});
