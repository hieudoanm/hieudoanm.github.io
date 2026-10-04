import { render, screen } from '@testing-library/react';
import { AlbumTile } from '@/components/gallery/molecules/AlbumTile';
import type { Album, Photo } from '@/types/gallery';

const album: Album = {
  id: 'a-1',
  name: 'Nature',
  coverId: 'p-1',
  photoIds: ['p-1', 'p-2'],
  createdAt: 1,
  updatedAt: 1,
};

const cover: Photo = {
  id: 'p-1',
  name: 'Ocean',
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags: [],
  favorite: false,
  albumId: 'a-1',
  createdAt: 1,
  updatedAt: 1,
};

describe('AlbumTile', () => {
  it('links to the album route and shows a cover', () => {
    render(<AlbumTile album={album} cover={cover} />);
    const link = screen.getByLabelText('Nature');
    expect(link).toHaveAttribute('href', '/gallery/album?id=a-1');
    expect(screen.getByTestId('photo-thumb-p-1')).toBeInTheDocument();
    expect(screen.getByText('2 photos')).toBeInTheDocument();
  });

  it('renders a fallback when there is no cover', () => {
    render(<AlbumTile album={album} />);
    expect(screen.queryByTestId('photo-thumb-p-1')).not.toBeInTheDocument();
  });

  it('uses the singular label for a single photo', () => {
    render(<AlbumTile album={{ ...album, photoIds: ['p-1'] }} />);
    expect(screen.getByText('1 photo')).toBeInTheDocument();
  });
});
