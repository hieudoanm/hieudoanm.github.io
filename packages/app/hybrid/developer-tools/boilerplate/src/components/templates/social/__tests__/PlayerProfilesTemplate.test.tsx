import { fireEvent, render, screen } from '@testing-library/react';
import { PlayerProfilesTemplate } from '../PlayerProfilesTemplate';

describe('PlayerProfilesTemplate', () => {
  it('renders players with team, role, rank and hours', () => {
    render(<PlayerProfilesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Players' })
    ).toBeInTheDocument();
    expect(screen.getByText('Follow your favorites.')).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
    expect(screen.getByText('NovaBlaze')).toBeInTheDocument();
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('DPS')).toBeInTheDocument();
    expect(screen.getByText('Gold III')).toBeInTheDocument();
    expect(screen.getByText('1,240 hours')).toBeInTheDocument();
  });

  it('searches players by name', () => {
    render(<PlayerProfilesTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search players' });
    fireEvent.change(input, { target: { value: 'shadow' } });
    expect(screen.getByText('1 players')).toBeInTheDocument();
    expect(screen.getByText('ShadowFang')).toBeInTheDocument();
    expect(screen.queryByText('NovaBlaze')).not.toBeInTheDocument();
  });

  it('shows the empty state for an unmatched query', () => {
    render(<PlayerProfilesTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search players' });
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('0 players')).toBeInTheDocument();
    expect(screen.getByText('No players found')).toBeInTheDocument();
  });
});
