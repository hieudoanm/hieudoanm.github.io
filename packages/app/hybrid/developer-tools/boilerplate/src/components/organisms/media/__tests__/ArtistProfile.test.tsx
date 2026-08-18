import { fireEvent, render, screen } from '@testing-library/react';
import { ArtistProfile } from '../ArtistProfile';

const topTracks = [
  { id: 'p1', title: 'Horizon', plays: 2500000 },
  { id: 'p2', title: 'Pulse', plays: 1800000 },
];

describe('ArtistProfile', () => {
  it('renders artist name and genre badges', () => {
    render(
      <ArtistProfile
        name="Mono Wave"
        genres={['Synthwave', 'Electronic']}
        topTracks={topTracks}
      />
    );
    expect(screen.getByText('Mono Wave')).toBeInTheDocument();
    expect(screen.getByText('Synthwave')).toBeInTheDocument();
    expect(screen.getByText('Electronic')).toBeInTheDocument();
  });

  it('formats compact monthly listeners', () => {
    render(
      <ArtistProfile
        name="Mono Wave"
        genres={['Synthwave']}
        monthlyListeners={1200000}
        topTracks={topTracks}
      />
    );
    expect(screen.getByTestId('listeners')).toHaveTextContent('1.2M');
  });

  it('lists popular tracks with play counts', () => {
    render(
      <ArtistProfile
        name="Mono Wave"
        genres={['Synthwave']}
        topTracks={topTracks}
      />
    );
    expect(screen.getByText('Horizon')).toBeInTheDocument();
    expect(screen.getByText('2.5M plays')).toBeInTheDocument();
  });

  it('fires onFollow when the follow button is clicked', () => {
    const onFollow = jest.fn();
    render(
      <ArtistProfile
        name="Mono Wave"
        genres={['Synthwave']}
        topTracks={topTracks}
        onFollow={onFollow}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalled();
  });
});
