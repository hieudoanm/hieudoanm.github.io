import { render, screen } from '@testing-library/react';
import { SavingsGoals } from '../SavingsGoals';

describe('SavingsGoals', () => {
  it('renders goals with progress percentages', () => {
    render(
      <SavingsGoals
        goals={[
          { name: 'Emergency fund', current: 6000, target: 12000 },
          {
            name: 'Trip to Japan',
            current: 1000,
            target: 4000,
            targetDate: '2027-03',
          },
        ]}
      />
    );
    expect(screen.getByText('Emergency fund')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('by 2027-03')).toBeInTheDocument();
  });

  it('formats current amounts with the given currency', () => {
    render(
      <SavingsGoals
        goals={[{ name: 'Emergency fund', current: 6000, target: 12000 }]}
        currency="JPY"
      />
    );
    expect(screen.getByText('¥6,000')).toBeInTheDocument();
  });

  it('shows zero percent when the target is zero', () => {
    render(
      <SavingsGoals goals={[{ name: 'Legacy', current: 0, target: 0 }]} />
    );
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
