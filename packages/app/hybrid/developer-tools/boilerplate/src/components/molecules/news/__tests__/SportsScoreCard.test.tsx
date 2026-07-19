import { render, screen } from '@testing-library/react';
import { SportsScoreCard } from '../SportsScoreCard';

const home = { name: 'Hawks', score: 89 };
const away = { name: 'Falcons', score: 84 };

describe('SportsScoreCard', () => {
  it('renders sport, teams and scores', () => {
    render(<SportsScoreCard sport="Basketball" home={home} away={away} />);
    expect(screen.getByText('Basketball')).toBeInTheDocument();
    expect(screen.getByText('Hawks')).toBeInTheDocument();
    expect(screen.getByText('Falcons')).toBeInTheDocument();
    expect(screen.getByText('89')).toBeInTheDocument();
    expect(screen.getByText('84')).toBeInTheDocument();
  });

  it('marks the leading team with a Lead badge', () => {
    render(<SportsScoreCard sport="Basketball" home={home} away={away} />);
    expect(screen.getByText('Lead')).toBeInTheDocument();
  });

  it('does not mark a team when the score is tied', () => {
    render(
      <SportsScoreCard
        sport="Football"
        home={{ name: 'A', score: 2 }}
        away={{ name: 'B', score: 2 }}
      />
    );
    expect(screen.queryByText('Lead')).not.toBeInTheDocument();
    expect(screen.getByText('Tied')).toBeInTheDocument();
  });

  it('renders status and period when provided', () => {
    render(
      <SportsScoreCard
        sport="Football"
        home={home}
        away={away}
        status="Final"
        period="Q4"
      />
    );
    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getByText('Q4')).toBeInTheDocument();
  });
});
