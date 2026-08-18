import { render, screen } from '@testing-library/react';
import { LoyaltyCard } from '../LoyaltyCard';

describe('LoyaltyCard', () => {
  it('renders tier, formatted points and program name', () => {
    render(<LoyaltyCard tier="Gold" points={2500} program="Miles Club" />);
    expect(screen.getByText('Miles Club')).toBeInTheDocument();
    expect(screen.getByTestId('loyalty-tier')).toHaveTextContent('Gold');
    expect(screen.getByTestId('loyalty-points')).toHaveTextContent('2,500');
  });

  it('shows progress to next tier when provided', () => {
    render(
      <LoyaltyCard
        tier="Gold"
        points={2500}
        pointsToNext={5000}
        nextTier="Platinum"
      />
    );
    expect(screen.getByText('2500 points to Platinum')).toBeInTheDocument();
    expect(screen.getByTestId('loyalty-progress')).toHaveAttribute(
      'value',
      '50'
    );
  });

  it('hides next tier info when not provided', () => {
    render(<LoyaltyCard tier="Gold" points={2500} />);
    expect(screen.queryByTestId('loyalty-progress')).not.toBeInTheDocument();
  });
});
