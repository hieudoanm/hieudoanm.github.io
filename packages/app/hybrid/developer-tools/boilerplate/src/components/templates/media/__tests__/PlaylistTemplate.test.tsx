import { fireEvent, render, screen } from '@testing-library/react';
import { PlaylistTemplate } from '../PlaylistTemplate';

describe('PlaylistTemplate', () => {
  it('renders songs and the count summary', () => {
    render(<PlaylistTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Playlist' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 songs')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.getByText('4:12')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shuffle' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(5);
  });

  it('toggles shuffle mode', () => {
    render(<PlaylistTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }));
    expect(
      screen.getByRole('button', { name: 'Shuffle on' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle on' }));
    expect(screen.getByRole('button', { name: 'Shuffle' })).toBeInTheDocument();
  });

  it('removes songs and shows the empty state', () => {
    render(<PlaylistTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('4 songs')).toBeInTheDocument();
    expect(screen.queryByText('Golden Hour')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('0 songs')).toBeInTheDocument();
    expect(screen.getByText('No songs')).toBeInTheDocument();
  });
});
