import { fireEvent, render, screen } from '@testing-library/react';
import { FavoriteTeamsTemplate } from '../FavoriteTeamsTemplate';

describe('FavoriteTeamsTemplate', () => {
  it('renders favorite teams with leagues and records', () => {
    render(<FavoriteTeamsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Favorite Teams' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 favorite teams')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getAllByText('Premier Division')).toHaveLength(2);
    expect(screen.getByText('12W 4L 2D')).toBeInTheDocument();
    expect(screen.getByText('11W 4L 3D')).toBeInTheDocument();
  });

  it('removes a team and updates the count', () => {
    render(<FavoriteTeamsTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove FC Riverside' })
    );
    expect(screen.getByText('3 favorite teams')).toBeInTheDocument();
    expect(screen.queryByText('FC Riverside')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every team', () => {
    render(<FavoriteTeamsTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 favorite teams')).toBeInTheDocument();
    expect(screen.getByText('No favorite teams')).toBeInTheDocument();
  });
});
