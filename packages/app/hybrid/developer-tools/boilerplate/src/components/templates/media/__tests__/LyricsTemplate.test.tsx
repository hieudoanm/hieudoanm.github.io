import { fireEvent, render, screen } from '@testing-library/react';
import { LyricsTemplate } from '../LyricsTemplate';

describe('LyricsTemplate', () => {
  it('renders the song details', () => {
    render(<LyricsTemplate />);
    expect(screen.getByRole('heading', { name: 'Lyrics' })).toBeInTheDocument();
    expect(screen.getByText('Midnight Reverie')).toBeInTheDocument();
    expect(screen.getByText('Nova Ember')).toBeInTheDocument();
    expect(screen.getByText('Horizon Line')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show lyrics' })
    ).toBeInTheDocument();
  });

  it('shows and hides lyrics', () => {
    render(<LyricsTemplate />);
    expect(
      screen.queryByText('Dreams are made of midnight')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show lyrics' }));
    expect(screen.getByText('Dreams are made of midnight')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Hide lyrics' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide lyrics' }));
    expect(
      screen.queryByText('Dreams are made of midnight')
    ).not.toBeInTheDocument();
  });
});
