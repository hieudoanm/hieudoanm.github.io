import { render, screen } from '@testing-library/react';
import { AwardCard } from '../AwardCard';

const award = {
  title: 'Best Developer Tool',
  organization: 'DevAwards',
  year: '2025',
  description: 'Recognized for innovation.',
};

describe('AwardCard', () => {
  it('renders award details', () => {
    render(<AwardCard {...award} />);
    expect(screen.getByText('Best Developer Tool')).toBeInTheDocument();
    expect(screen.getByText('DevAwards')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('Recognized for innovation.')).toBeInTheDocument();
  });

  it('renders the award trophy icon', () => {
    render(<AwardCard {...award} />);
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });

  it('hides the description when omitted', () => {
    render(<AwardCard {...award} description={undefined} />);
    expect(
      screen.queryByText('Recognized for innovation.')
    ).not.toBeInTheDocument();
  });
});
