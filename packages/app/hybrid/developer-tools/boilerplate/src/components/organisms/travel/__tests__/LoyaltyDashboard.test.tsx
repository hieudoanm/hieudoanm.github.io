import { render, screen } from '@testing-library/react';
import { LoyaltyDashboard } from '../LoyaltyDashboard';

const benefits = [
  { id: 'b1', title: 'Free checked bag', description: 'On all flights' },
  { id: 'b2', title: 'Lounge access' },
];

describe('LoyaltyDashboard', () => {
  it('renders tier, points and miles stats', () => {
    render(
      <LoyaltyDashboard
        tier="Platinum"
        points={12500}
        miles={8200}
        benefits={benefits}
      />
    );
    expect(screen.getByText('Platinum')).toBeInTheDocument();
    expect(screen.getByText('12,500')).toBeInTheDocument();
    expect(screen.getByText('8,200')).toBeInTheDocument();
  });

  it('renders benefits with descriptions', () => {
    render(
      <LoyaltyDashboard
        tier="Platinum"
        points={12500}
        miles={8200}
        benefits={benefits}
      />
    );
    expect(screen.getByText('Free checked bag')).toBeInTheDocument();
    expect(screen.getByText('On all flights')).toBeInTheDocument();
    expect(screen.getByText('Lounge access')).toBeInTheDocument();
  });
});
