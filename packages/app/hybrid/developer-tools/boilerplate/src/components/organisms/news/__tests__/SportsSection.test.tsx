import { render, screen } from '@testing-library/react';
import { SportsSection } from '../SportsSection';

const matches = [
  {
    teamA: 'North FC',
    scoreA: 2,
    teamB: 'South Utd',
    scoreB: 1,
    status: 'Final',
  },
  {
    teamA: 'East Rovers',
    scoreA: 0,
    teamB: 'West City',
    scoreB: 3,
    status: 'Live',
  },
];

describe('SportsSection', () => {
  it('renders match rows with scores', () => {
    render(<SportsSection matches={matches} />);
    expect(screen.getByText('North FC vs South Utd')).toBeInTheDocument();
    expect(screen.getByText('2 - 1')).toBeInTheDocument();
    expect(screen.getByText('East Rovers vs West City')).toBeInTheDocument();
    expect(screen.getByText('0 - 3')).toBeInTheDocument();
  });

  it('renders match statuses', () => {
    render(<SportsSection matches={matches} />);
    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<SportsSection matches={matches} title="Scores" />);
    expect(screen.getByText('Scores')).toBeInTheDocument();
  });

  it('handles an empty matches list', () => {
    render(<SportsSection matches={[]} />);
    expect(screen.getByTestId('sports-section')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /vs/ })).not.toBeInTheDocument();
  });
});
