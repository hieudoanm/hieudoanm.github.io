import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumDetailTemplate } from '../AlbumDetailTemplate';

describe('AlbumDetailTemplate', () => {
  it('renders album details and the track summary', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Album' })).toBeInTheDocument();
    expect(screen.getByText('Horizon Line')).toBeInTheDocument();
    expect(screen.getByText('Nova Ember')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('12 tracks')).toBeInTheDocument();
    expect(screen.getByText('48 min')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
  });

  it('toggles the play album button', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getByText('Paused')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play album' }));
    expect(screen.getByText('Playing')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Pause album' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause album' }));
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('lists every track with a number and duration', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getAllByRole('row')).toHaveLength(13);
    expect(screen.getByText('Horizon Line Reprise')).toBeInTheDocument();
  });
});
