import { render, screen } from '@testing-library/react';
import { ScoreBoard } from '../ScoreBoard';

const home = { name: 'Tigers', score: 3 };
const away = { name: 'Lions', score: 1 };

describe('ScoreBoard', () => {
  it('renders both team names and scores', () => {
    render(<ScoreBoard home={home} away={away} />);
    expect(screen.getByText('Tigers')).toBeInTheDocument();
    expect(screen.getByText('Lions')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders status and period when provided', () => {
    render(<ScoreBoard home={home} away={away} status="Final" period="FT" />);
    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getByText('FT')).toBeInTheDocument();
  });

  it('highlights the leading team', () => {
    render(<ScoreBoard home={home} away={away} />);
    expect(screen.getByText('Tigers')).toHaveClass('text-success');
    expect(screen.getByText('Lions')).not.toHaveClass('text-success');
  });

  it('does not highlight when showLeader is false', () => {
    render(<ScoreBoard home={home} away={away} showLeader={false} />);
    expect(screen.getByText('Tigers')).not.toHaveClass('text-success');
  });
});
