import { render, screen } from '@testing-library/react';
import { LoyaltyProgram } from '../LoyaltyProgram';

const rewards = [
  { id: 'rw1', name: 'Free shipping', points: 500 },
  { id: 'rw2', name: 'Tote bag', points: 1500, claimed: true },
];

describe('LoyaltyProgram', () => {
  it('renders the tier and points balance', () => {
    render(
      <LoyaltyProgram
        points={1200}
        tier="Gold"
        pointsToNext={800}
        rewards={rewards}
      />
    );
    expect(screen.getByText('Gold member')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
    expect(screen.getByText(/800 points to go/)).toBeInTheDocument();
  });

  it('renders rewards with point costs', () => {
    render(
      <LoyaltyProgram
        points={1200}
        tier="Gold"
        pointsToNext={800}
        rewards={rewards}
      />
    );
    expect(screen.getByText('Free shipping')).toBeInTheDocument();
    expect(screen.getByText('500 pts')).toBeInTheDocument();
    expect(screen.getByText('Claimed')).toBeInTheDocument();
  });

  it('disables redeeming a reward that costs too many points', () => {
    render(
      <LoyaltyProgram
        points={200}
        tier="Gold"
        rewards={[{ id: 'rw3', name: 'Headphones', points: 1000 }]}
      />
    );
    expect(screen.getByRole('button', { name: 'Redeem' })).toBeDisabled();
  });
});
