import { fireEvent, render, screen, within } from '@testing-library/react';
import { SeasonStandingsTemplate } from '../SeasonStandingsTemplate';

describe('SeasonStandingsTemplate', () => {
  it('renders the standings table with leader badge', () => {
    render(<SeasonStandingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Standings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 teams')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('FC Riverside')).toBeInTheDocument();
    expect(within(table).getByText('34 pts')).toBeInTheDocument();
    expect(within(table).getByText('17 pts')).toBeInTheDocument();
    expect(screen.getAllByText('Leader')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(6);
  });

  it('favorites a team and updates the badge', () => {
    render(<SeasonStandingsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Favorite' })[0]);
    expect(screen.getAllByText('Favorited')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: 'Favorited' }));
    expect(screen.queryAllByText('Favorited')).toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(6);
  });
});
